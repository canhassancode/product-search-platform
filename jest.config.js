module.exports = {
  testEnvironment: "node",
  transform: {
    "^.+\\.(t|j)sx?$": "@swc/jest",
  },
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/$1",
  },
  extensionsToTreatAsEsm: [".ts"],
  maxWorkers: "50%",
  cache: true,
  cacheDirectory: ".jest-cache",
  testMatch: ["**/__tests__/**/*.ts", "**/?(*.)+(spec|test).ts"],
  testPathIgnorePatterns: ["/node_modules/", "/dist/"],
  testTimeout: 30000,
};
