import * as exec from '@actions/exec'
import * as glob from '@actions/glob'
import * as core from '@actions/core'

async function run() {
  const globber = await glob.create('**/packages/tatum-*/package.json')

  const sortedFilesByDeps = []

  for await (const file of globber.globGenerator()) {
    sortedFilesByDeps.push(file)
  }

  switchToIndex(sortedFilesByDeps, 'tatum-core', 0)
  switchToIndex(sortedFilesByDeps, 'tatum-ledger', 1)
  switchToIndex(sortedFilesByDeps, 'tatum-defi', 2)

  const buildPackages = []
  const failedPackages = []

  for (const file of sortedFilesByDeps) {
    try {
      await buildPackage(file)
      buildPackages.push(file)
    } catch (e) {
      console.error(`Build of package ${file} failed!`)
      console.log(e)
      failedPackages.push(file)
    }
  }
  console.log('Build packages:')
  console.log(buildPackages)

  console.log('Failed packages:')
  console.log(failedPackages)

  if (failedPackages.length > 0) {
    core.setFailed(`${failedPackages.length} packages failed to build!`)
  }
}

const switchToIndex = (array, fileName, newIndex) => {
  const index = array.findIndex((file) => file && file.indexOf(fileName) !== -1)
  const tmp = array[newIndex]
  array[newIndex] = array[index]
  array[index] = tmp
  return array
}

const buildPackage = async (file) => {
  console.log(`Building ${file}.`)
  const directory = file.substring(0, file.lastIndexOf('/'))

  await yarnBuild(directory)
}

const yarnBuild = async (directory) => {
  await exec.getExecOutput(`yarn --cwd ${directory} cache clean`)
  await exec.getExecOutput(`yarn --cwd ${directory}`)
  await exec.getExecOutput(`yarn --cwd ${directory} build`)
}

run()
