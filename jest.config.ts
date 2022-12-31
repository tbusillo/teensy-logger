import type { JestConfigWithTsJest } from 'ts-jest'

const jestConfig: JestConfigWithTsJest = {
  preset: 'ts-jest/presets/js-with-ts-esm',
  testEnvironment: 'node',
  extensionsToTreatAsEsm: ['.ts'],
  moduleDirectories: ['./node_modules', 'src', './src'],
  moduleNameMapper: {
    '@teensy/uuid': '<rootDir>/node_modules/@teensy/uuid/dist/index.cjs'
  },
  resolver: 'ts-jest-resolver'
  // transform: {
  //   //   // '^.+\\.[tj]sx?$' to process js/ts with `ts-jest`
  //   '^.+\\.m?[tj]sx?$': [
  //     'ts-jest',
  //     {
  //       useESM: true
  //     }
  //   ]
  // } //to process js/ts/mjs/mts with `ts-jest`
  //   '^.+\\.tsx?$': [
  //     'ts-jest',
  //     {
  //       useESM: true
  //     }
  //   ]
  // }
}

export default jestConfig
