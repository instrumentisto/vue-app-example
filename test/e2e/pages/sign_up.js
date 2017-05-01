module.exports = {
  elements: {
    form: '#signUpForm',
    nameInput: 'input[name=name]',
    nameError: '#nameError',
    emailInput: 'input[name=email]',
    emailError: '#emailError',
    passwordInput: 'input[name=password]',
    passwordError: '#passwordError',
    passwordConfirmInput: 'input[name=password_confirm]',
    passwordConfirmError: '#passwordConfirmError',
    error: 'p.error'
  },
  url: function() {
    return this.api.launchUrl + 'sign_up';
  },
};
