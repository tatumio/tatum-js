const devKit  = require('@nrwl/devkit')
const childProcess = require('child_process')
const packageJson = require('../../package.json')
const replace = require('replace-in-file')
const glob =require('glob')

const graph = devKit.readCachedProjectGraph()
const onlyLibs = Object.values(graph.nodes).filter((n) => n.type === 'lib')

replaceVersionsInDistPackageJsons()

for (const lib of onlyLibs) {
  const command = `node tools/scripts/publish.mjs ${lib.name} ${packageJson.version}`

  console.log(command)
  try {
    childProcess.execSync(command)
  } catch (e) {
    break
  }
}

function replaceVersionsInDistPackageJsons() {
  const files = glob.sync( __dirname + '../../../dist/packages/**/package.json', {})

  replace.replaceInFileSync({
    files,
    from: /"0\.0\.0"/g, //from: /"@tatumio.+": ("0.0.0")/,
    to: `"${packageJson.version}"`,
  })
}
