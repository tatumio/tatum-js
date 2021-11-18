import * as exec from '@actions/exec'
import * as glob from '@actions/glob'
import fs from 'fs-extra'
import fetch from 'node-fetch'
import semver from 'semver'

async function run() {
  const globber = await glob.create('**/packages/tatum-*/package.json')

  const packages = { published: [], unpublished: [] }

  const sortedFilesByDeps = []

  for await (const file of globber.globGenerator()) {
    sortedFilesByDeps.push(file)
  }

  switchToIndex(sortedFilesByDeps, 'tatum-core', 0)
  switchToIndex(sortedFilesByDeps, 'tatum-ledger', 1)
  switchToIndex(sortedFilesByDeps, 'tatum-defi', 2)

  for (const file of sortedFilesByDeps) {
    await publishPackage(file, packages)
  }
}

const switchToIndex = (array, fileName, newIndex) => {
  const index = array.findIndex((file) => file && file.indexOf(fileName) !== -1)
  const tmp = array[newIndex]
  array[newIndex] = array[index]
  array[index] = tmp
  return array
}

const publishPackage = async (file, packages) => {
  try {
    console.log(`Scanning ${file}.`)
    const localPackage = fs.readJsonSync(file)
    const remotePackage = await fetchRegistry(localPackage.name)
    console.log(remotePackage)
    const directory = file.substring(0, file.lastIndexOf('/'))

    if (['tatum-core', 'tatum-ledger', 'tatum-defi'].find((coreFile) => file.indexOf(coreFile) !== -1)) {
      await yarnBuild(directory)
    }

    if (directory && localPackage && remotePackage) {
      // compare to local version
      if (semver.lt(remotePackage.version, localPackage.version)) {
        console.log(
          `Remote version ${remotePackage.version} on npm package ${localPackage.name} is older than current version ${localPackage.version}.`
        )
        await yarnBuild(directory)
        packages.published.push({ name: localPackage.name, version: localPackage.version })
      } else {
        console.log(
          `Remote version ${remotePackage.version} on npm package ${remotePackage.name} is same or newer than current version ${localPackage.version}.`
        )
        packages.unpublished.push({ name: remotePackage.name, version: remotePackage.version })
      }
    }
  } catch (e) {
    console.log(`Failed to publish ${file}.`)
  }
}

const yarnBuild = async (directory) => {
  await exec.getExecOutput(`yarn --cwd ${directory} cache clean`)
  await exec.getExecOutput(`yarn --cwd ${directory}`)
  await exec.getExecOutput(`yarn --cwd ${directory} build`)
}

const fetchRegistry = async (packageName) => {
  console.log(`Fetching package https://registry.npmjs.com/${packageName}/latest`)
  const response = await fetch(`https://registry.npmjs.com/${packageName}/latest`)
  return await response.json()
}

run()
