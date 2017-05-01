module.exports = {
  elements: {
    form: '#signInForm',
    emailInput: 'input[name=email]',
    passwordInput: 'input[name=password]',
    error: 'p.error'
  },
  url: function() {
    return this.api.launchUrl + 'login';
  },
};
