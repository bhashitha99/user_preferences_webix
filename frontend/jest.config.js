// jest.config.js
export default {
  testEnvironment: "jsdom",
  transform: {
    "^.+\\.js$": "babel-jest",
  },
  setupFiles: ["./jest.setup.js"],
};
