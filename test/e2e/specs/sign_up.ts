import Helper from '../Helper';

const tests = {
  beforeEach: (browser, done) => {
    Helper.beforeEach(browser, done);
  },
  'Registration with already taken email': (client) => {
    const signUp = client.page.sign_up();

    signUp.navigate()
      .waitForElementVisible('#app', 3000)
      // .setValue('input[name=name]', 'Test E2E User')
      // .setValue('input[name=email]', 'test@gmail.com')
      // .setValue('input[name=password]', '123123')
      // .setValue('input[name=password_confirm]', '123123')
      // .submitForm('#signUpForm')
      // .waitForElementVisible('p.error', 3000)
      // .assert.containsText('p.error', browser.globals.localeData.errors.email_already_taken);

    client.end();
  },
};

export default tests;
