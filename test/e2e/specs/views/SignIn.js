"use strict";
exports.__esModule = true;
var Helper_1 = require("../../Helper");
var tests = {
    beforeEach: function (browser, done) {
        Helper_1["default"].beforeEach(browser, done, '/login');
    },
    'Authorization with valid credentials': function (browser) {
        browser
            .url(browser.globals.devServerURL)
            .waitForElementVisible('#app', 3000)
            .setValue('input[name=email]', 'test@gmail.com')
            .setValue('input[name=password]', '123123')
            .submitForm('#signInForm')
            .waitForElementVisible('section#profile', 3000)
            .assert.containsText('p#user_name', 'Test User')
            .assert.containsText('p#user_email', 'test@gmail.com')
            .end();
    },
    'Authorization with wrong credentials': function (browser) {
        browser
            .url(browser.globals.devServerURL)
            .waitForElementVisible('#app', 3000)
            .setValue('input[name=email]', 'wronguser@gmail.com')
            .setValue('input[name=password]', '123123')
            .submitForm('#signInForm')
            .waitForElementVisible('p.error', 3000)
            .assert.containsText('p.error', browser.globals.localeData.errors.access_denied)
            .end();
    }
};
exports["default"] = tests;
