module.exports = {
  testPathIgnorePatterns: ['<rootDir>/.next/', '<rootDir>/node_modules/'],
  setupFilesAfterEnv: ['<rootDir>/src/test-utils/setupTests.ts'],
  testEnvironment: 'jsdom',
  moduleNameMapper: {
    '@components/(.*)': '<rootDir>/src/components/$1',
    '@hooks/(.*)': '<rootDir>/src/hooks/$1',
    '@utils/(.*)': '<rootDir>/src/utils/$1',
    '@test-utils': '<rootDir>/src/test-utils/index.ts',
    '@test-utils/(.*)': '<rootDir>/src/test-utils/$1',
  },
}
