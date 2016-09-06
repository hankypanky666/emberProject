/* jshint node: true */

module.exports = function(environment) {
  var ENV = {
    modulePrefix: 'ember-project',
    environment: environment,
    rootURL: '/',
    locationType: 'auto',

    firebase: {
      apiKey: "AIzaSyAFIvij2TID9w9jM5DJI00DZv7n_7Dg60I",
      authDomain: "myapp-62364.firebaseapp.com",
      databaseURL: "https://myapp-62364.firebaseio.com",
      storageBucket: "myapp-62364.appspot.com",
    },

    EmberENV: {
      FEATURES: {
        // Here you can enable experimental features on an ember canary build
        // e.g. 'with-controller': true
      }
    },

    APP: {
      // Here you can pass flags/options to your application instance
      // when it is created
    }
  };

  if (environment === 'development') {
    // ENV.APP.LOG_RESOLVER = true;
    // ENV.APP.LOG_ACTIVE_GENERATION = true;
    // ENV.APP.LOG_TRANSITIONS = true;
    // ENV.APP.LOG_TRANSITIONS_INTERNAL = true;
    // ENV.APP.LOG_VIEW_LOOKUPS = true;
  }

  if (environment === 'test') {
    // Testem prefers this...
    ENV.locationType = 'none';

    // keep test console output quieter
    //ENV.APP.LOG_ACTIVE_GENERATION = false;
    //ENV.APP.LOG_VIEW_LOOKUPS = false;

    ENV.APP.rootElement = '#ember-testing';
  }

  if (environment === 'production') {

  }

  return ENV;
};
