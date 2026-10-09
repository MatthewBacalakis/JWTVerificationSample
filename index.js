var jwt = require("jsonwebtoken");
var jwksClient = require("jwks-rsa");

let token = process.argv[2] || process.env.TEST_TOKEN;

//create JWKS fetching and caching client
var client = jwksClient({
  jwksUri: process.env.JWKS_URL,
  rateLimit: true, // prevent malicious cache invalidation
  jwksRequestsPerMinute: 10, // prevent malicious cache invalidation
  cacheMaxAge: 3600000, // cache jwks for 1 hour.
});

//create function for verify to use to fetch JWKS
function getKey(header, callback) {
  client.getSigningKey(header.kid, function (err, key) {
    var signingKey = key.publicKey || key.rsaPublicKey;
    callback(null, signingKey);
  });
}
jwt.verify(
  token,
  getKey,
  { audience: process.env.AUDIENCE, issuer: process.env.ISS },
  (decodedToken, err) => {
    if (err) return console.log(err);

    console.log(decodedToken);
  },
);
