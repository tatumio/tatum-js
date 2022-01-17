const nxPreset = require('@nrwl/jest/preset')
const esModules = ['cross-blob', 'fetch-blob', '@types/jest', 'swarm-js'].join('|')

module.exports = {
  ...nxPreset,
  transformIgnorePatterns: [`/node_modules/(?!${esModules})`],
}
