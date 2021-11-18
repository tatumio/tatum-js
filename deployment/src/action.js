import * as exec from '@actions/exec'
import * as glob from '@actions/glob'
import fs from 'fs-extra'
import fetch from 'node-fetch'
import semver from 'semver'

async function run() {
  const globber = await glob.create('**/packages/tatum-*/package.json')

  const sortedFilesByDeps = []

  for await (const file of globber.globGenerator()) {
    sortedFilesByDeps.push(file)
  }

  switchToIndex(sortedFilesByDeps, 'tatum-core', 0)
  switchToIndex(sortedFilesByDeps, 'tatum-ledger', 1)
  switchToIndex(sortedFilesByDeps, 'tatum-defi', 2)

  for (const file of sortedFilesByDeps) {
    await publishPackage(file)
  }
}

const switchToIndex = (array, fileName, newIndex) => {
  const index = array.findIndex((file) => file && file.indexOf(fileName) !== -1)
  const tmp = array[newIndex]
  array[newIndex] = array[index]
  array[index] = tmp
  return array
}

const publishPackage = async (file) => {
  try {
    console.log(`Scanning ${file}.`)
    const directory = file.substring(0, file.lastIndexOf('/'))

    if (['tatum-core', 'tatum-ledger', 'tatum-defi'].find((coreFile) => file.indexOf(coreFile) !== -1)) {
      await yarnBuild(directory)
    }

    await yarnBuild(directory)
  } catch (e) {
    console.log(`Failed to publish ${file}.`)
  }
}

const yarnBuild = async (directory) => {
  await exec.getExecOutput(`yarn --cwd ${directory} cache clean`)
  await exec.getExecOutput(`yarn --cwd ${directory}`)
  await exec.getExecOutput(`yarn --cwd ${directory} build`)
}

run()
