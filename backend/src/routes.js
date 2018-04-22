const express = require('express');
const MongoClient = require('mongodb').MongoClient;
const auth0 = require('auth0');
const jwt = require('express-jwt');
const jwksRsa = require('jwks-rsa');

const router = express.Router();

const checkJwt = jwt({
  secret: jwksRsa.expressJwtSecret({
    cache: true,
    rateLimit: true,
    jwksRequestsPerMinute: 5,
    jwksUri: `https://digituz-corp.auth0.com/.well-known/jwks.json`
  }),

  // Validate the audience and the issuer.
  audience: 'https://brand-house.digituz.com.br',
  issuer: `https://digituz-corp.auth0.com/`,
  algorithms: ['RS256']
});

// retrieve latest projects
router.get('/', checkJwt, async (req, res) => {
  const collection = await getProjectsCollection();
  res.send(
    await collection.find({}).toArray()
  );
});

// retrieve specific project
router.get('/:id', checkJwt, async (req, res) => {
  const collection = await getProjectsCollection();
  res.send(
    await collection.findOne({_id: req.params.id})
  );
});

// insert a new projects
router.post('/', checkJwt, async (req, res) => {
  const collection = await getProjectsCollection();
  await collection.insertOne({
    title: req.body.title,
    description: req.body.description,
    createdAt: new Date()
  });
  res.status(200).send();
});

async function getProjectsCollection() {
  const client = await MongoClient.connect('mongodb://mongo:27017/');
  return client.db('brand-house').collection('projects');
}

module.exports = router;
