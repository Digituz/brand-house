const request = require('request-promise');

class Auth0Service {
  constructor(auth0Domain, auth0ClientId, auth0ClientSecret) {
    this.auth0Domain = auth0Domain;
    this.auth0ClientId = auth0ClientId;
    this.auth0ClientSecret = auth0ClientSecret;

    this.hasCredentials = false;

    this.refreshCredentials();
  }

  async getUsers() {
    if (! this.hasCredentials) await this.refreshCredentials();

    const usersReq = {
      method: 'GET',
      url: `https://${this.auth0Domain}/api/v2/users`,
      qs: { fields: 'name', search_engine: 'v3' },
      headers: {
        authorization: `Bearer ${this.accessToken}`,
        'content-type': 'application/json'
      },
      json: true
    };

    return await request(usersReq);
  }

  async refreshCredentials() {
    const credentialsReq = {
      method: 'POST',
      url: `https://${this.auth0Domain}/oauth/token`,
      headers: {
        'content-type': 'application/json'
      },
      body: {
        grant_type: 'client_credentials',
        client_id: this.auth0ClientId,
        client_secret: this.auth0ClientSecret,
        audience: `https://${this.auth0Domain}/api/v2/`
      },
      json: true,
    };

    const credentials = await request(credentialsReq);
    this.accessToken = credentials.access_token;
    this.hasCredentials = true;
  }
}

module.exports = Auth0Service;
