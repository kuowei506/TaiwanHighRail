const { defineConfig } = require("cypress");
const setupNodeEvents = require("./cypress/plugins/index.js");

module.exports = defineConfig({
  e2e: {
    trashAssetsBeforeRuns: false,
    specPattern: '**/*.feature',
    reporter: "cypress-mochawesome-reporter",
    reporterOptions: {
      reportDir: "cypress/report",
      reportPageTitle: "Cypress Test Report",
      charts: true,
      embeddedScreenshots: true,
      inlineAssets: true,
      saveAllAttempts: false,
    },
    setupNodeEvents,
  },
    viewportWidth: 1200, // 设置宽度
    viewportHeight: 932, // 设置高度
});

// module.exports = {
//   viewportWidth: 1280, // 设置宽度
//   viewportHeight: 720, // 设置高度
// };

// const { defineConfig } = require("cypress");

// module.exports = defineConfig({
//   e2e: {
//     baseUrl: 'https://seat.tpml.edu.tw',
//     defaultCommandTimeout: 10000,
//     responseTimeout: 30000,
//     requestTimeout: 30000,
//     setupNodeEvents(on, config) {
//       return require('./cypress/plugins/index.js')(on, config)
//     },
//   },
//   env: {
//     apiUrl: 'https://seat.tpml.edu.tw'
//   },
//   retries: {
//     runMode: 2,
//     openMode: 0
//   }
// });