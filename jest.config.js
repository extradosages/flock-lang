/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  moduleFileExtensions: ['ts', 'pegjs', 'js'],
  preset: 'ts-jest',
  roots: ['<rootDir>/src'],
  testEnvironment: 'node',
};