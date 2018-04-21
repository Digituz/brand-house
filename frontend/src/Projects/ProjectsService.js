import * as Auth0 from 'auth0-web';
import axios from 'axios';

let apiClient;
const baseURL = 'https://brand-house-backend.digituz.com.br/projects';

Auth0.subscribe((authenticated) => {
  if (authenticated) {
    apiClient = axios.create({
      baseURL,
      timeout: 5000,
      headers: {
        'Authorization': `Bearer ${Auth0.getAccessToken()}`
      },
    });
  } else {
    apiClient = axios.create({
      baseURL,
      timeout: 5000,
    });
  }
});

const remove = (id) => {
  return apiClient.delete(`/${id}`);
};

const get = (id) => {
  return new Promise((resolve, reject) => {
    apiClient.get(`/${id || ''}`).then((response) => {
      let data = response.data;
      if (Array.isArray(response.data)) {
        data = data.map(jsonToObject);
      } else {
        data = jsonToObject(data);
      }
      resolve(data);
    }).catch(reject);
  });
};

const update = (id, project) => {
  return apiClient.put(`/${id}`, project);
};

const insert = (project) => {
  return apiClient.post('/', project);
};

// converting only date objects for now
const jsonToObject = (json) => {
  const properties = Object.getOwnPropertyNames(json);
  const object = {};
  properties.forEach((property) => {
    let value = json[property];
    if (value.length >= 24) {
      value = new Date(value);
    }
    object[property] = isNaN(value) ? json[property] : value;
  });
  return object;
};

export {
  get, insert, remove, update,
}
