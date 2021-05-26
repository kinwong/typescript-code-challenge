module.exports = {
  globals: {
      "ts-jest": {
          tsconfig: "tsconfig.json"
      }
  },
  moduleFileExtensions: [
      "ts",
      "js"
  ],
  transform: {
      "^.+\\.(ts)$": "ts-jest"
  },
  testMatch: [
      "**/src/**/*.test.ts"
  ],
  testEnvironment: "node"
};