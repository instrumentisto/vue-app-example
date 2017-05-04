import Helper from '../Helper';

const tests = {
    beforeEach: (browser, done) => {
        Helper.beforeEach(browser, done);
    },
    'Authorization with valid credentials': (client) => {
        const loginPage = client.page.login();
        const profilePage = client.page.profile();

        loginPage.navigate()
            .waitForElementVisible('#app', 3000)
            .setValue('@emailInput', 'test@gmail.com')
            .setValue('@passwordInput', '123123')
            .submitForm('@form')
            .waitForElementVisible(profilePage.section.main.selector, 3000)
            .assert.containsText(
                profilePage.section.main.elements.userName.selector,
                'Test User'
            )
            .assert.containsText(
                profilePage.section.main.elements.userEmail.selector,
                'test@gmail.com'
            );

        client.end();
    },
    'Authorization with wrong credentials': (client) => {
        const loginPage = client.page.login();

        loginPage.navigate()
            .waitForElementVisible('#app', 3000)
            .setValue('@emailInput', 'wronguser@gmail.com')
            .setValue('@passwordInput', '123123')
            .submitForm('@form')
            .waitForElementVisible('@error', 3000)
            .assert.containsText(
                '@error', client.globals.localeData.errors.access_denied
            );

        client.end();
    },
};

export default tests;