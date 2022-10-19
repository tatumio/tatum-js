import { readCachedProjectGraph } from '@nrwl/devkit'
import { execSync } from 'child_process'
import packageJson from '../../package.json' assert { type: 'json' }

const graph = readCachedProjectGraph()
const onlyLibs = Object.values(graph.nodes).filter(n => n.type === 'lib')

for(const lib of onlyLibs ) {
  const command = `node tools/scripts/publish.mjs ${lib.name} ${packageJson.version}`
  console.log(command)
  try {
    execSync(command)
  } catch (e) {
    break
  }
}
