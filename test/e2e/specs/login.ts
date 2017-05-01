import Helper from '../Helper';

const tests = {
  beforeEach: (browser, done) => {
    Helper.beforeEach(browser, done);
  },
  'Authorization with valid credentials': (client) => {
    const login = client.page.login();

    login.navigate()
      .waitForElementVisible('#app', 3000)
      .setValue('input[name=email]', 'test@gmail.com')
      .setValue('input[name=password]', '123123')
      .submitForm('#signInForm')
      .waitForElementVisible('section#profile', 3000)
      .assert.containsText('p#user_name', 'Test User')
      .assert.containsText('p#user_email', 'test@gmail.com');

    client.end();
  },
  'Authorization with wrong credentials': (client) => {
    const login = client.page.login();

    login.navigate()
      .waitForElementVisible('#app', 3000)
      .setValue('input[name=email]', 'wronguser@gmail.com')
      .setValue('input[name=password]', '123123')
      .submitForm('#signInForm')
      .waitForElementVisible('p.error', 3000)
      .assert.containsText('p.error', client.globals.localeData.errors.access_denied);

    client.end();
  },
};

export default tests;
