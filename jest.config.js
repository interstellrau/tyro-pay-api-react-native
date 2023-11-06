module.exports = {
  preset: 'react-native',
  testEnvironment: 'node',
  coverageReporters: ['html', 'text'],
  collectCoverageFrom: ['src/**/*.{js,ts,tsx}'],
  coveragePathIgnorePatterns: [
    '@types/',
    './src/App.*',
    './src/checkout.*',
    './src/tests/*',
    './src/clients/mock-client.ts',
    './src/images/*',
  ],
  coverageThreshold: {
    global: {
      branches: 97,
      functions: 96,
      lines: 99,
      statements: 98,
    },
  },
  moduleNameMapper: {
    'react-native-webview': '<rootDir>/src/tests/__mocks__/WebView.tsx',
  },
  globalSetup: './src/tests/global-setup.ts',
  setupFiles: ['./src/tests/__mocks__/NativeModules.ts'],
};
