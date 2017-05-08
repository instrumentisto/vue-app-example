require('babel-register');

const config = {
    src_folders: ['.tests/e2e/specs'],
    output_folder: false,
    page_objects_path: '.tests/e2e/pages',
    selenium: {
        start_process: true,
        server_path: require('selenium-server').path,
        port: 4444,
        cli_args: {
            'webdriver.chrome.driver': require('chromedriver').path
        }
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
                    'vue-app-example-vuex': {
                        locale: 'en'
                    }
                }
            },
            desiredCapabilities: {
                browserName: 'chrome',
                javascriptEnabled: true,
                acceptSslCerts: true
            }
        }
    }
};

if (process.env.CI) {
    delete config.selenium;
}

module.exports = config;
