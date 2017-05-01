module.exports = {
  sections: {
    main: {
      selector: '#profile',
      elements:  {
        userName: 'p#userName',
        userEmail: 'p#userEmail'
      }
    }
  },
  url: function() {
    return this.api.launchUrl + 'profile';
  },
};
