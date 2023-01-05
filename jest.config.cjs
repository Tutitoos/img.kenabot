/** @type {import('ts-jest').JestConfigWithTsJest} */

module.exports = {
  preset: "ts-jest",
  testEnvironment: "node",
  testMatch: ["**/src/**/*.test.ts"],
  collectCoverageFrom: [
    "src/**/*.ts",
    "!src/loadEnvironments.ts",
    "!src/index.ts",
    "!src/server/index.ts",
    "!src/storage/index.ts",
    "!*.config",
  ],
  resolver: "jest-ts-webcompat-resolver",
};
