const fs = require('fs')
const { execSync } = require('child_process')
const _ = require('lodash')

/**
 * Fix for https://github.com/nrwl/nx/issues/10765
 * in the final d.ts files we get
 *
 * import("../../../../../dist/packages/shared/blockchain/abstract/src").ChainTransferNative
 * instead of
 * import("@tatumio/shared-blockchain-abstract").ChainTransferNative
 *
 * So this script basically finds all the d.ts files and replaces the import paths
 */
function fixDtsImportIssue() {
  let grepResult

  try {
    grepResult = execSync(`grep -rl 'import("\\(../\\)*dist/packages' dist/packages`, {
      encoding: 'utf-8',
    }).toString()
  } catch (e) {
    if (e.stderr.toString() === '') {
      console.debug(`No files with import issue found.`)
      return
    }
    throw e
  }

  const files = grepResult.split('\n').filter((l) => l)
  for (const filePath of files) {
    console.debug(`Replacing broken d.ts import in: "${filePath}"`)
    const file = fs.readFileSync(filePath)

    const uniqueImports = _.uniq(
      file.toString().match(new RegExp(`(import\\("(..\\/)+dist\\/packages.*?\\))`, 'g')),
    )

    const normalizedImportPath = uniqueImports.map((singleImport) => {
      const packageName = singleImport.match(/dist\/packages\/(.*)?\/src/)[1]
      return `import("@tatumio/${packageName.replaceAll('/', '-')}")`
    })

    let finalFile = file.toString()
    uniqueImports.forEach((singleImport, index) => {
      finalFile = finalFile.replaceAll(singleImport, normalizedImportPath[index])
    })

    fs.writeFileSync(filePath, finalFile)
  }
}

fixDtsImportIssue()
