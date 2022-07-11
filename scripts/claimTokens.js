const { ThirdwebSDK } = require("@thirdweb-dev/sdk");
const { claim } = require("./txOlympusHelper.js");
const { ethers } = require("ethers");
require("dotenv").config();

const txContract = "0xBa9e3CCECeB85a1c3e70c66Bd9C4cD822364951E";
const recipient = "0x83a7b2377e525ef362927f7518e1ceab7ee9f108";

const setOLYtoken = async () => {
  // load your private key in a secure way (env variable, never commited to git)
  const privateKey = process.env.PRIVATE_KEY;
  // instantiate the SDK based on your private key, with the desired chain to connect to
  const sdk = ThirdwebSDK.fromPrivateKey(privateKey, "mumbai");
  const contract = await sdk.getContract(txContract);
  await claim(contract, recipient, ethers.utils.parseEther("10000"));
  console.log("tx successful");
};

setOLYtoken().catch((error) => {
  console.error(error);
});
