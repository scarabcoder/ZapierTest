const recipe = require('./triggers/recipe');
// We can roll up all our behaviors in an App.
const addApiKeyToHeader = (request, z, bundle) => {
  request.headers['MY-AUTH-HEADER'] = bundle.authData.apiKey;
  return request;
};

const App = {

  authentication: {
    type: 'custom',
    fields: [
      {key: 'apiKey', type: 'string'}
    ],
    test: (z, bundle) => {
      const promise = z.request('http://57b20fb546b57d1100a3c405.mockapi.io/api/me');
      return promise.then((response) => {
        if (response.status !== 200) {
          throw new Error('Invalid API Key');
        }
      });
    }
  },
  // This is just shorthand to reference the installed dependencies you have. Zapier will
  // need to know these before we can upload
  version: require('./package.json').version,
  platformVersion: require('zapier-platform-core').version,

  // beforeRequest & afterResponse are optional hooks into the provided HTTP client
  beforeRequest: [
    addApiKeyToHeader
  ],

  afterResponse: [
  ],

  // If you want to define optional resources to simplify creation of triggers, searches, creates - do that here!
  resources: {
  },

  // If you want your trigger to show up, you better include it here!
  triggers: {
    [recipe.key]: recipe
  },

  // If you want your searches to show up, you better include it here!
  searches: {
  },

  // If you want your creates to show up, you better include it here!
  creates: {
  }
};

// Finally, export the app.
module.exports = App;
