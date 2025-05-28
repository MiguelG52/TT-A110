const { createDefaultPreset } = require("ts-jest");

const tsJestTransformCfg = createDefaultPreset().transform;

/** @type {import("jest").Config} **/
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  collectCoverage: true,
  coverageReporters: [
    'text',
    ['text-summary', {
      skipFull: true,
      fileCoverageThreshold: 80
    }]
  ],
  coverageDirectory: 'coverage',
  collectCoverageFrom: [
    'src/**/*.{ts,js}',
    '!src/**/*.d.ts',
    '!src/servers/**', // Excluir archivos de servidor si es necesario
  ],
  testMatch: ['**/**/*.test.ts'],
  verbose: true,
  forceExit: true,
};
