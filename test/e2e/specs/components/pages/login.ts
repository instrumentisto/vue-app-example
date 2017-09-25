/* tslint:disable:object-literal-sort-keys */
import { NightWatchBrowser, NightWatchClient, NightWatchPage } from '../../../../../types/nightwatch'; // tslint:disable-line
import Helper from '../../../Helper';


export = {


    '@tags': ['pages'],

    'beforeEach': (browser: NightWatchBrowser, done: () => void) => {
        Helper.beforeEach(browser, done);
    },


    'Authorization with valid credentials': (client: NightWatchClient) => {
        const loginPage: NightWatchPage = client.page.login();
        const profilePage: NightWatchPage = client.page.profile();

        loginPage.navigate()
            .waitForElementVisible('#app', Helper.maxLoadingTime)
            .setValue('@emailInput', 'test@gmail.com')
            .setValue('@passwordInput', '123123')
            .submitForm('@form')
            .waitForElementVisible(
                profilePage.section.main.selector,
                Helper.maxLoadingTime,
            )
            .assert.containsText(
                profilePage.section.main.elements.userName.selector,
                'Test User',
            )
            .assert.containsText(
                profilePage.section.main.elements.userEmail.selector,
                'test@gmail.com',
            );

        client.end();
    },


    'Authorization with wrong credentials': (client: NightWatchClient) => {
        const loginPage: NightWatchPage = client.page.login();

        loginPage.navigate()
            .waitForElementVisible('#app', Helper.maxLoadingTime)
            .setValue('@emailInput', 'wronguser@gmail.com')
            .setValue('@passwordInput', '123123')
            .submitForm('@form')
            .waitForElementVisible('@error', Helper.maxLoadingTime)
            .assert.containsText(
                '@error', client.globals.localeData.errors.access_denied,
            );

        client.end();
    },


};
