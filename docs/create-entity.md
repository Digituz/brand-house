## Adding new Entities

This documentation will describe the steps needed to create a new entity in this project.

### Create an Auth0 API

First, you will need to create a new [Auth0 API](https://auth0.com/docs/api/info) through [the Management console on Auth0](https://manage.auth0.com/#/apis). In the API section of the management dashboard, click on the _Create API_ button and fill the form as follows:

- **Name:** Project Stages API
- **Identifier:** https://project-stages.digituz.com.br
- **Signing Algorithm:** RS256

Then, on the new screen shown by Auth0, choose the _Scopes_ tab and add the following scopes:

- **Name:** `get:project-stages`; **Description:** Read your project stages.
- **Name:** `post:project-stages`; **Description:** Insert new project stages.
- **Name:** `put:project-stages`; **Description:** Update existing project stages.
- **Name:** `delete:project-stages`; **Description:** Remove your project stages.

### Start RestFlex

After creating a representation for you API on Auth0, you will need to run a RestFlex microservice. To do this, use a command like:

```bash
docker run --name project-stages-api \
  -e "DOMAIN=project-stages" \
  -e "MONGODB_URL=projects-db:27017/project-stages" \
  -e "AUTH0_DOMAIN=digituz-corp.auth0.com" \
  -e "AUTH0_AUDIENCE=https://project-stages.digituz.com.br" \
  --network digituz \
  -p 3003:80 \
  -d digituz/rest-flex
```

### Create a JSON Schema

Lastly, you will need to define a [JSON schema](http://json-schema.org/) to represent the new entity. The framework creates forms that allow users to create, update, and delete 
