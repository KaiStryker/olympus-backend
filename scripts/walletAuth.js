const { ThirdwebSDK } = require("@thirdweb-dev/sdk");

const sdk = new ThirdwebSDK("mumbai");

const walletAuth = () => {
  // We specify the domain of the application to authenticate to
  const domain = "thirdweb.com";

  // On the client side, we can generate a payload for the connected wallet to login
  const loginPayload = sdk.auth.login(domain);

  // Then on the server side, we can securely verify the connected client-side address
  const address = sdk.auth.verify(domain, loginPayload);

  // And we can also generate an authentication token to send to the client
  const token = sdk.auth.generate(domain, loginPayload);

  return [domain, address, token];
};

const checkAuth = (domain, token) => {
  // the token can be send from the client to the server to make authenticated requests
  // And the server can use the following function to authenticate a token and verify the associated address
  const address = sdk.auth.authenticate(domain, token);

  return address;
};

module.exports = { walletAuth, checkAuth}
