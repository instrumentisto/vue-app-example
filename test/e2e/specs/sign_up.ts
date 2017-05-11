/* tslint:disable:object-literal-sort-keys */
import { NightWatchBrowser, NightWatchClient, NightWatchPage } from '../../../types/nightwatch';
import Helper from '../Helper';

/**
 * Contains all e2e test specs of the "/sign_up" page.
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
    'beforeEach': (browser: NightWatchBrowser, done: () => void): void => {
        Helper.beforeEach(browser, done);
    },
    /**
     * Tests user registration with email, which is already taken.
     * It submits form with such email and waits for correct error message
     * to be displayed.
     *
     * @param client    NightWatch client instance to execute tests.
     */
    'Registration with already taken email': (client: NightWatchClient): void => {
        const signUpPage: NightWatchPage = client.page.sign_up();

        signUpPage.navigate()
            .waitForElementVisible('#app', 3000)
            .setValue('@nameInput', 'Test User')
            .setValue('@emailInput', 'test@gmail.com')
            .setValue('@passwordInput', '123123')
            .setValue('@passwordConfirmInput', '123123')
            .submitForm('@form')
            .waitForElementVisible('@error', 3000)
            .assert.containsText(
                '@error', client.globals.localeData.errors.email_already_taken,
            );

        client.end();
    },
    /**
     * Tests user registration form for correct inputs validation.
     * It fills input one by one with wrong values, submits the form, and
     * checks for right validation message to be displayed.
     *
     * @param client    NightWatch client instance to execute tests.
     */
    'Validation during registration': (client: NightWatchClient): void => {
        const signUpPage: NightWatchPage = client.page.sign_up();
        const requiredMessage: string =
            client.globals.localeData.validation.messages.required;
        const emailMessage: string =
            client.globals.localeData.validation.messages.email;
        const minMessage: string =
            client.globals.localeData.validation.messages.min;
        const confirmedMessage: string =
            client.globals.localeData.validation.messages.confirmed;

        signUpPage.navigate()
            .waitForElementVisible('#app', 3000);

        signUpPage
            .setValue('@nameInput', '')
            .submitForm('@form')
            .assert.containsText(
                signUpPage.elements.nameError.selector, requiredMessage,
            );

        signUpPage
            .setValue('@emailInput', 'wrong_email')
            .submitForm('@form')
            .assert.containsText(
                signUpPage.elements.emailError.selector, emailMessage,
            );

        signUpPage
            .setValue('@passwordInput', '123')
            .submitForm('@form')
            .assert.containsText(
                signUpPage.elements.passwordError.selector,
                minMessage.replace('{value}', '6'),
            );

        signUpPage
            .setValue('@passwordInput', '123456')
            .setValue('@passwordConfirmInput', '1234567')
            .submitForm('@form')
            .assert.containsText(
                signUpPage.elements.passwordConfirmError.selector,
                confirmedMessage,
            );

        client.end();
    },
};

export default tests;
