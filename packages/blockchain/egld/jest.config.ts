/* eslint-disable */
export default {
  displayName: 'blockchain-egld',
  preset: '../../../jest.preset.js',
  globals: {
    'ts-jest': {
      tsconfig: '<rootDir>/tsconfig.spec.json',
    },
  },
  testEnvironment: 'node',
  transform: {
    'node_modules/bitbox-sdk/.+\\.(j|t)s?$': 'ts-jest',
    '^.+\\.[tj]s$': 'ts-jest',
  },
  transformIgnorePatterns: ['node_modules/(?!@toolz/allow)/'],
  moduleNameMapper: {
    '@ledgerhq/hw-transport-node-hid': 'placeholder', // placeholder (usb module is crashing unit tests) https://github.com/node-usb/node-usb/issues/412
  },
  moduleFileExtensions: ['ts', 'js', 'html', 'json'],
  coverageDirectory: '../../../coverage/packages/blockchain/egld',
}
