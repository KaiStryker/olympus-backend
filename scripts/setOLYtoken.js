const { ThirdwebSDK } = require("@thirdweb-dev/sdk");
const { setOLYToken } = require("./txOlympusHelper.js");
require("dotenv").config();

const txContract = "0xBa9e3CCECeB85a1c3e70c66Bd9C4cD822364951E";
const OLYtoken = "0xfA157F6608010650fF3B563eaf1F15F8dea726D7";

const setOLYtoken = async () => {
  // load your private key in a secure way (env variable, never commited to git)
  const privateKey = process.env.PRIVATE_KEY;
  // instantiate the SDK based on your private key, with the desired chain to connect to
  const sdk = ThirdwebSDK.fromPrivateKey(privateKey, "mumbai");

  const contract = await sdk.getContract(txContract);

  await setOLYToken(contract, OLYtoken);
  console.log("tx successful");
};

setOLYtoken().catch((error) => {
  console.error(error);
});
