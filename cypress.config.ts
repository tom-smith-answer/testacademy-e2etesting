import { defineConfig } from "cypress";
import { rename } from 'node:fs';

export default defineConfig({

  e2e: {
    defaultCommandTimeout: 10000, 
    setupNodeEvents(on, config) {
      // implement node event listeners here
    on('after:screenshot', (details) => {
      const newName = `${details.name}/${details.takenAt}`
      rename(details.name, newName, (err) => {
        if (err) throw err;
        console.log('Rename complete!');
      });
    })
    },
    baseUrl: 'http://localhost:5173/'
  },
    env: {
    login_email: 'test@answer.com',
    login_password: 'password'
  }
});
