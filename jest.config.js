module.exports = {
  testEnvironment: "jest-environment-jsdom",
  transform: {
    "^.+\\.js$": "babel-jest", // Transforms JS files using Babel
  },
  setupFilesAfterEnv: ["@testing-library/jest-dom"],

  moduleNameMapper: {
    "^webix$": "<rootDir>/__mocks__/webix.js",
  },
};
