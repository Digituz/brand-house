## BH Licensing System

The following commands will create [NPM links](https://docs.npmjs.com/cli/link) through every dependency that is under control of Digituz:

```bash
cd ~/git/auth0/auth0-web/
npm link

cd ~/git/digituz/rest-flex/client/
npm link
npm link @digituz/auth0-web

cd ~/git/digituz/react-components
npm link
npm link @digituz/rest-flex-client

cd ~/git/digituz/brand-house/frontend
npm link @digituz/auth0-web
npm link @digituz/react-components
```
