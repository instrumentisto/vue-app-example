module.exports = {
    elements: {
        form: '#signInForm',
        emailInput: 'input[name=email]',
        passwordInput: 'input[name=password]',
        error: 'p.error',
    },
    url: function() {
        console.log('login url' + this.api.launchUrl + '/login');
        return this.api.launchUrl + '/login';
    },
};
