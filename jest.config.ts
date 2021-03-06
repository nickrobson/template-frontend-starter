export default {
  errorOnDeprecated: true,
  moduleFileExtensions: ['js', 'jsx', 'ts', 'tsx', 'json', 'node'],
  notify: true,
  notifyMode: 'failure-change',
  resetModules: false,
  roots: ['./'],
  slowTestThreshold: 5,
  testLocationInResults: true,
  timers: 'fake',
  watchman: true,

  projects: [
    {
      displayName: 'unit',
      setupFilesAfterEnv: ['<rootDir>/jest-setup.ts'],
      testEnvironment: 'jsdom',
      testMatch: [
        '<rootDir>/{entry,packages}/**/__tests__/**/*.{js,jsx,ts,tsx}',
        '<rootDir>/{entry,packages}/**/?(*.)+(spec|test).{js,jsx,ts,tsx}',
      ],

      clearMocks: true,
      resetMocks: true,
      restoreMocks: true,

      transform: {
        '\\.(ts|tsx)$': '<rootDir>/jest-transformer.js',
      },

      collectCoverage: true,
      collectCoverageFrom: [
        '<rootDir>/{entry,packages}/**/*.{js,jsx,ts,tsx}',
        '!**/node_modules/**',
      ],
      coverageDirectory: 'coverage',
      coveragePathIgnorePatterns: ['/node_modules/'],
      coverageProvider: 'v8',
    },
    {
      displayName: 'lint',
      runner: 'eslint',
      testMatch: ['<rootDir>/{entry,packages}/**/*.{js,jsx,ts,tsx}'],
    },
  ],
};
