/* tslint:disable:object-literal-sort-keys */
import { NightWatchBrowser, NightWatchClient, NightWatchPage } from '../../../types/nightwatch';
import Helper from '../Helper';

/**
 * Contains all e2e test specs of the "/login" page.
 */
const tests = {
    /**
     * Executes before each spec and does required things of initiating
     * local storage etc.
     *
     * @param browser   NightWatch browser instance, that future tests
     *                  would work with.
     * @param done      Callback, that must be called after all required
     *                  actions were completed.
     */
    'beforeEach': (browser: NightWatchBrowser, done: () => void) => {
        Helper.beforeEach(browser, done);
    },
    /**
     * Tests user authorization form for correct sign in behaviour.
     * It fills the form with correct user credentials, submits it,
     * and checks for profile page to be displayed with correct user info.
     *
     * @param client    NightWatch client instance to execute tests.
     */
    'Authorization with valid credentials': (client: NightWatchClient) => {
        const loginPage: NightWatchPage = client.page.login();
        const profilePage: NightWatchPage = client.page.profile();

        loginPage.navigate()
            .waitForElementVisible('#app', 3000)
            .setValue('@emailInput', 'test@gmail.com')
            .setValue('@passwordInput', '123123')
            .submitForm('@form')
            .waitForElementVisible(profilePage.section.main.selector, 3000)
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
    /**
     * Tests user authorization form for correct behaviour when user enters
     * wrong credentials.
     *
     * @param client    NightWatch client instance to execute tests.
     */
    'Authorization with wrong credentials': (client: NightWatchClient) => {
        const loginPage: NightWatchPage = client.page.login();

        loginPage.navigate()
            .waitForElementVisible('#app', 3000)
            .setValue('@emailInput', 'wronguser@gmail.com')
            .setValue('@passwordInput', '123123')
            .submitForm('@form')
            .waitForElementVisible('@error', 3000)
            .assert.containsText(
                '@error', client.globals.localeData.errors.access_denied,
            );

        client.end();
    },
};

export default tests;
