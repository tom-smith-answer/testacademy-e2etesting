import defineConfig from '@mutoe/eslint-config'

export default defineConfig({
  typescript: {
    tsconfigPath: [
      'tsconfig.json',
      'tsconfig.node.json',
      'cypress/e2e/tsconfig.json',
    ],
  },
  vue: {
    sfcBlocks: {
      defaultLanguage: {
        script: 'ts',
      },
    },
  },
  test: {
    cypress: true,
  },
  ignores: [
    'src/services/api.ts',
    'cypress.config.ts',
    'cypress/e2e/spec.cy.ts',
    'cypress/support/commands/getByPlaceholder.ts',
    'cypress/support/e2e.ts',
  ],
})
