# JWT Validation Sample

This sample demonstrates JWT validation with JWKS caching and rate limited cache invalidation when a JWT with new a new kid is received.

# Pre-requisites

Populate the .env file with values from your tenant. Samples in .env.sample. TEST_TOKEN is the token you'd like to verify.

# Setup

`npm install`

# Run

`npm start`
OR
`node --env-file=.env index.js {TOKEN_TO_VERIFY}`
