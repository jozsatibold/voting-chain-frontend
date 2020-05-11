module.exports = {
  globals: {
    "ts-jest": {
      tsConfig: "<rootDir>/src/tsconfig.spec.json",
      stringifyContentPathRegex: "\\.html$"
    },
    __TS_CONFIG__: {
      target: "es6",
      module: "commonjs",
      moduleResolution: "node"
    }
  },
  transform: {
    "^.+\\.(ts|js|html)$": "ts-jest"
  },
  setupTestFrameworkScriptFile: "<rootDir>/src/setup-jest.ts",
  moduleFileExtensions: ["ts", "html", "js", "json"],
  moduleNameMapper: {
    "^src/(.*)$": "<rootDir>/src/$1",
    "^app/(.*)$": "<rootDir>/src/app/$1",
    "^assets/(.*)$": "<rootDir>/src/assets/$1",
    "^environments/(.*)$": "<rootDir>/src/environments/$1",
    "^modules/(.*)$": "<rootDir>/src/modules/$1"
  },
  transformIgnorePatterns: ["node_modules/(?!@ngrx)"],
  snapshotSerializers: [
    "jest-preset-angular/AngularSnapshotSerializer.js",
    "jest-preset-angular/HTMLCommentSerializer.js"
  ]
};
