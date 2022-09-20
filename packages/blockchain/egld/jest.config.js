module.exports = {
  displayName: 'blockchain-egld',
  preset: '../../../jest.preset.js',
  globals: {
    'ts-jest': {
      tsconfig: '<rootDir>/tsconfig.spec.json',
    },
  },
  testEnvironment: 'node',
  transform: {
    '^.+\\.[tj]sx?$': 'ts-jest',
  },
  moduleNameMapper: {
    '@ledgerhq/hw-transport-node-hid': 'placeholder', // placeholder (usb module is crashing unit tests) https://github.com/node-usb/node-usb/issues/412
  },
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json'],
  coverageDirectory: '../../../coverage/packages/blockchain/egld',
}
