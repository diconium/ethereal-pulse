/**
 * For a detailed explanation regarding each configuration property, visit:
 * https://jestjs.io/docs/configuration
 */

import type { Config } from 'jest';

const config: Config = {
  // Automatically clear mock calls, instances, contexts and results before every test
  clearMocks: true,
  // The directory where Jest should output its coverage files
  coverageDirectory: 'coverage',
  // Indicates which provider should be used to instrument code for coverage
  coverageProvider: 'v8',
  // A preset that is used as a base for Jest's configuration
  preset: 'ts-jest',
  // Sets the path to the prettier node module used to update inline snapshots.
  prettierPath: null,
  // Use this configuration option to add custom reporters to Jest
  reporters: process.env.GITHUB_ACTIONS
    ? [['github-actions', { silent: false }], 'summary']
    : ['default'],
  // A list of paths to directories that Jest should use to search for files in
  roots: ['<rootDir>/src/', '<rootDir>/tests/'],
};

export default config;
