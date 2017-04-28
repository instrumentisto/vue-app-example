require('babel-register')

module.exports = {
    src_folders: ['test/e2e/specs'],
    output_folder: false,
    custom_assertions_path: ['test/e2e/custom-assertions'],

    selenium: {
        start_process: true,
        server_path: require('selenium-server').path,
        host: '127.0.0.1',
        port: 4444,
        cli_args: {
            'webdriver.chrome.driver': require('chromedriver').path
        }
    },

    test_settings: {
        default: {
            selenium_port: 4444,
            selenium_host: 'localhost',
            silent: true,
            globals: {
                devServerURL: 'http://vue-app-example.dev/',
                localeData: require('../../assets/i18n/en.json'),
                localStorage: {
                    'vue-app-example-vuex': {
                        locale: 'en'
                    }
                }
            }
        },

        chrome: {
            desiredCapabilities: {
                browserName: 'chrome',
                javascriptEnabled: true,
                acceptSslCerts: true
            }
        },

        firefox: {
            desiredCapabilities: {
                browserName: 'firefox',
                javascriptEnabled: true,
                acceptSslCerts: true
            }
        }
    }
}
