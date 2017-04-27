module.exports = {
    'Authorization with valid credentials': function test(browser) {
      const devServer = browser.globals.devServerURL;

      browser
        .url(devServer)
        .waitForElementVisible('#app', 3000)
        .setValue('input[name=email]', 'test@gmail.com')
        .setValue('input[name=password]', '123123')
        .click('button[type=submit]')
        .waitForElementVisible('section#profile', 3000)
        .assert.containsText('p#user_name', 'Test User')
        .assert.containsText('p#user_email', 'test@gmail.com')
        .end();
    },
    'Authorization with wrong credentials': function test(browser) {
      const devServer = browser.globals.devServerURL;

      browser
        .url(devServer)
        .waitForElementVisible('#app', 3000)
        .setValue('input[name=email]', 'wronguser@gmail.com')
        .setValue('input[name=password]', '123123')
        .click('button[type=submit]')
        .waitForElementVisible('p.error', 3000)
        .assert.containsText('p.error', 'Не вірний логін/пароль')
        .end();
    },
};
