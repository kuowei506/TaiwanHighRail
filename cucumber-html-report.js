const report = require("multiple-cucumber-html-reporter");
const path = `${(new Date).getFullYear()}_${(new Date).getMonth()+1}_${(new Date).getDate()}_${(new Date).getHours()}-${(new Date).getMinutes()}-${(new Date).getSeconds()}`
report.generate({
  jsonDir: "cypress/reports/cucumber-json/",
  reportPath: `cypress/reports/cucumber-html-multi/${path}/`,
  ignoreBadJsonFile: true,
  displayReportTime: true,
  displayDuration: true,
  staticFilePath: true,
  useCDN: true,
  metadata: {
    device: "Local Test Machine",
    platform: { name: "Windows", version: "11"},
  },
  customData: {
    title: "Run info",
    data: [
      { label: "Project", value: "Custom project" },
      { label: "Release", value: "1.2.3" },
      { label: "Cycle",salue: "B11221.34321" },
      { label: "Execution Start Time", value: "Nov 19th 2017, 02:31 PM EST" },
      { label: "Execution End Time", value: "Nov 19th 2017, 02:56 PM EST" },
    ],
  },
});

