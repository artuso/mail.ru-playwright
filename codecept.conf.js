function getBrowser() {
  if (process.env.BROWSER != undefined) return (process.env.BROWSER).trim();
  else return "chromium"
};

exports.config = {
  output: './output/allure-results',
  helpers: {
    Playwright: {
      url: '',
      show: false,
      restart: true,
      waitForTimeout: 10000,
      windowSize: "1200x880",
      browser: getBrowser()
    }
  },
  include: {
    I: './steps_file.js',
    adsBoxLayer: './pages/adsBoxLayer.js',
    startPage: './pages/startPage.js',
    adsPage: './pages/adsPage.js',
  },
  mocha: {},
  bootstrap: null,
  teardown: null,
  hooks: [],
  gherkin: {},
  plugins: {
    screenshotOnFail: {
      enabled: true
    },
    allure: {
      enabled: true
    },
    retryFailedStep: {
      enabled: false
    }
  },
  tests: './tests/*_test.js',
  name: 'mail.ru-playwright'
};