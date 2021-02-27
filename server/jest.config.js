module.exports = {
  testEnvironment: "node",
  roots: ["<rootDir>"],
  testRegex: "(/__tests__/.*|(\\.|/)(test|spec))\\.ts?$",
  transform: {
    "^.+\\.jsx?$": "babel-jest",
    "^.+\\.tsx?$": "ts-jest",
  },
  setupFilesAfterEnv: ["./jest.setup.ts"],
  testPathIgnorePatterns: ["testServer.ts"],
};
