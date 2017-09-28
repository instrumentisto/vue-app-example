require('babel-register');

module.exports = {
    src_folders: ['test/e2e/_build/specs'],
    output_folder: false,
    page_objects_path: 'test/e2e/_build/pages',
    detailed_output: false,
    selenium: {
        start_process: true,
        server_path: require('selenium-server').path,
        port: 4444,
        cli_args: {
            'webdriver.chrome.driver': require('chromedriver').path,
            'webdriver.gecko.driver': require('geckodriver').path,
        },
    },
    test_settings: {
        default: {
            launch_url: 'http://vue-app-example.dev',
            selenium_port: 4444,
            selenium_host: 'localhost',
            silent: true,
            globals: {
                localeData: require('../../assets/i18n/en.json'),
                localStorage: {
                    'vuex': {
                        locale: 'en',
                    },
                },
            },
            desiredCapabilities: {
                browserName: 'chrome',
            },
        },
        chrome: {},
        firefox: {
            // If Selenium server is not started by Nightwatch, then we assume
            // that Firefox Selenium is listening on another port.
            selenium_port: process.env.NOT_START_SELENIUM ? 4445 : 4444,
            desiredCapabilities: {
                browserName: 'firefox',
            },
            silent: false,
        },
    },
};

if (process.env.NOT_START_SELENIUM) {
    delete module.exports.selenium;
}
