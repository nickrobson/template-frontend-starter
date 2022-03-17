export default {
  clearMocks: true,
  errorOnDeprecated: true,
  moduleFileExtensions: ['js', 'jsx', 'ts', 'tsx', 'json', 'node'],
  notify: true,
  notifyMode: 'failure-change',
  resetMocks: true,
  resetModules: false,
  restoreMocks: true,
  roots: ['./'],
  slowTestThreshold: 5,
  testLocationInResults: true,
  timers: 'fake',
  watchman: true,

  collectCoverage: true,
  collectCoverageFrom: [
    '<rootDir>/src/**/*.{js,jsx,ts,tsx}',
    '!**/node_modules/**',
  ],
  coverageDirectory: 'coverage',
  coveragePathIgnorePatterns: ['/node_modules/'],
  coverageProvider: 'v8',

  projects: [
    {
      displayName: 'unit',
      setupFilesAfterEnv: ['<rootDir>/jest-setup.ts'],
      testEnvironment: 'jsdom',
      testMatch: [
        '<rootDir>/src/**/__tests__/**/*.{js,jsx,ts,tsx}',
        '<rootDir>/src/**/?(*.)+(spec|test).{js,jsx,ts,tsx}',
      ],

      transform: {
        '\\.(ts|tsx)$': '<rootDir>/jest-transformer.js',
      },
    },
    {
      displayName: 'lint',
      runner: 'eslint',
      testMatch: ['<rootDir>/src/**/*.{js,jsx,ts,tsx}'],
    },
  ],
};
