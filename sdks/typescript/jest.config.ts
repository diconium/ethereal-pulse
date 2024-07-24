/**
 * For a detailed explanation regarding each configuration property, visit:
 * https://jestjs.io/docs/configuration
 */

import type { Config } from 'jest';

const config: Config = {
  clearMocks: true,
  collectCoverageFrom: ['**/*.(t|j)s'],
  coverageDirectory: './coverage',
  coverageProvider: 'v8',
  moduleFileExtensions: ['ts', 'js', 'json'],
  moduleNameMapper: {
    '^src/(.*)$': '<rootDir>/src/$1',
  },
  preset: 'ts-jest',
  prettierPath: null,
  roots: ['<rootDir>/src', '<rootDir>/tests'],
  testPathIgnorePatterns: ['/node_modules/', '/lib/'],
  transform: {
    '^.+\\.(t|j)s$': 'ts-jest',
  },
};

export default config;
