const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    env: {
      //NewPlatform
      firstName: "Ivan",
      lastName: "Inanov",
      middleName: "Ivanovich",
      StoKoneyApiUrl: 'https://main.stokoney.ipst-dev.com/api',
      StoKoneyUrl: 'https://main.stokoney.ipst-dev.com',
  
    }
  },
});
