import { Config } from "jest";

const config: Config = {
  preset: "ts-jest",
  testEnvironment: "node",
  testMatch: ["**/_tests/**/*.test.ts", "**/_tests/**/*.spec.ts"],
  moduleNameMapper: {
    "^~/(.*)$": "<rootDir>/_src/$1",
  },
};

export default config;
