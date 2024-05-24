import { defineConfig } from "cypress";
import { defaults } from "marked";

export default defineConfig({

  e2e: {
    defaultCommandTimeout: 10000, 
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
