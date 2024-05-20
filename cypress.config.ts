import { defineConfig } from "cypress";

export default defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here

    },
    baseUrl: 'http://localhost:5173/'
  },
  env: {
    login_email: 'test@answer.com',
    login_password: 'password'
  }
});
