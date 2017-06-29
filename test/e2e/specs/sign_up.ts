/* tslint:disable:object-literal-sort-keys */
import { NightWatchBrowser, NightWatchClient, NightWatchPage } from '../../../types/nightwatch'; // tslint:disable-line
import Helper from '../Helper';


/**
 * Contains all e2e test specs of the "/sign_up" page.
 */
const tests = {


    'beforeEach': (browser: NightWatchBrowser, done: () => void): void => {
        Helper.beforeEach(browser, done);
    },


    'Registration with already taken email': (
        client: NightWatchClient,
    ): void => {
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
