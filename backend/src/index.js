const request = require('request-promise');
const Auth0Service = require('./auth0-service');

const auth0Domain = 'digituz-corp.auth0.com';
const auth0ClientId = 'ct8Zy9BZk0Wf4612ksApwljKOrBS2yyH';
const auth0ClientSecret = '279E67wjogxt2VivFLTiph2SFsquCERQ7TelMI69YK0RfzXlbwAmLlnpXJGqvWDH';

const auth0Service = new Auth0Service(auth0Domain, auth0ClientId, auth0ClientSecret);

(async function() {
  const users  = await auth0Service.getUsers();
  console.log(users);
}());
