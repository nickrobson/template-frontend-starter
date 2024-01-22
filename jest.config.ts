export default {
  errorOnDeprecated: true,
  moduleFileExtensions: ['js', 'jsx', 'ts', 'tsx', 'json', 'node'],
  notify: true,
  notifyMode: 'failure-change',
  resetModules: false,
  roots: ['./'],
  slowTestThreshold: 5,
  testLocationInResults: true,
  fakeTimers: {
    enableGlobally: true,
  },
  watchman: true,

  collectCoverage: true,
  coverageProvider: 'v8',

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

      collectCoverageFrom: [
        '<rootDir>/{entry,packages}/**/*.{js,jsx,ts,tsx}',
        '!**/node_modules/**',
      ],
      coverageDirectory: 'coverage',
      coveragePathIgnorePatterns: ['/node_modules/'],
    },
    {
      displayName: 'lint',
      runner: 'eslint',
      testMatch: ['<rootDir>/{entry,packages}/**/*.{js,jsx,ts,tsx}'],
    },
  ],
} satisfies import('jest').Config;
