import Helper from '../../Helper';

const tests = {
  beforeEach: (browser, done) => {
    Helper.beforeEach(browser, done, 'sign_up');
  },
  'Registration with already taken email': (browser) => {
    browser
      .url(browser.globals.devServerURL + '/sign_up')
      .waitForElementVisible('#app', 3000)
      .setValue('input[name=name]', 'Test E2E User')
      .setValue('input[name=email]', 'test@gmail.com')
      .setValue('input[name=password]', '123123')
      .setValue('input[name=password_confirm]', '123123')
      .submitForm('#signUpForm')
      .waitForElementVisible('p.error', 3000)
      .assert.containsText('p.error', browser.globals.localeData.errors.email_already_taken)
      .end();
  },
};

export default tests;
