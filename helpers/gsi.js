const { OAuth2Client } = require("google-auth-library");

const { GOOGLE_CLIENT_ID } = process.env;

if (!GOOGLE_CLIENT_ID) {
  console.log(
    `'GOOGLE_CLIENT_ID' (google client id) is required in envoirment`
  );
  process.exit(1);
}

const client = new OAuth2Client(GOOGLE_CLIENT_ID);

const verifyGoogle = async (token) => {
  const ticket = await client.verifyIdToken({
    idToken: token,
    audience: GOOGLE_CLIENT_ID,
  });

  const payload = ticket.getPayload();

  return payload;
};

module.exports = { client, verifyGoogle };
