import Helper from '../Helper';

const tests = {
    beforeEach: (browser, done) => {
        Helper.beforeEach(browser, done);
    },
    'Registration with already taken email': (client) => {
        const signUpPage = client.page.sign_up();

        signUpPage.navigate()
            .waitForElementVisible('#app', 3000)
            .setValue('@nameInput', 'Test User')
            .setValue('@emailInput', 'test@gmail.com')
            .setValue('@passwordInput', '123123')
            .setValue('@passwordConfirmInput', '123123')
            .submitForm('@form')
            .waitForElementVisible('@error', 3000)
            .assert.containsText(
                '@error', client.globals.localeData.errors.email_already_taken
            );

        client.end();
    },
    'Validation during registration': (client) => {
        const signUpPage = client.page.sign_up();
        const requiredMessage =
            client.globals.localeData.validation.messages.required;
        const emailMessage =
            client.globals.localeData.validation.messages.email;
        const minMessage = client.globals.localeData.validation.messages.min;
        const confirmedMessage =
            client.globals.localeData.validation.messages.confirmed;

        signUpPage.navigate()
            .waitForElementVisible('#app', 3000);

        signUpPage
            .setValue('@nameInput', '')
            .submitForm('@form')
            .assert.containsText(
                signUpPage.elements.nameError.selector, requiredMessage
            );

        signUpPage
            .setValue('@emailInput', 'wrong_email')
            .assert.containsText(
                signUpPage.elements.emailError.selector, emailMessage
            );

        signUpPage
            .setValue('@passwordInput', '123')
            .assert.containsText(
                signUpPage.elements.passwordError.selector,
                minMessage.replace('{value}', '6')
            );

        signUpPage
            .setValue('@passwordInput', '123456')
            .setValue('@passwordConfirmInput', '1234567')
            .assert.containsText(
                signUpPage.elements.passwordConfirmError.selector,
                confirmedMessage
            );

        client.end();
    },
};

export default tests;
