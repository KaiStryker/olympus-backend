// const { ThirdwebSDK } = require("@thirdweb-dev/sdk");

// const sdk = new ThirdwebSDK("mumbai");
// const contract = await sdk.getContract("0xBa9e3CCECeB85a1c3e70c66Bd9C4cD822364951E");

const claim = async (contract, recipient, amount) => {
  await contract.call("claim", recipient, amount);
};

const renounceOwnership = async (contract) => {
  await contract.call("renounceOwnership");
};

const setOLYToken = async (contract, _OLYToken) => {
  await contract.call("setOLYToken", _OLYToken);
};

const transferOwnership = async (contract, newOwner) => {
  await contract.call("transferOwnership", newOwner);
};

const upgrade = async (contract) => {
  await contract.call("upgrade");
};

const vandalize = async (contract) => {
  await contract.call("vandalize");
};

const OLYToken = async (contract) => {
  await contract.call("OLYToken");
};

const owner = async (contract) => {
  await contract.call("owner");
};

const upgradeFee = async (contract) => {
  await contract.call("upgradeFee");
};

const result = async (contract) => {
  await contract.call("vandalizeFee");
};

module.exports = {
  claim,
  renounceOwnership,
  setOLYToken,
  transferOwnership,
  upgrade,
  vandalize,
  OLYToken,
  owner,
  upgradeFee,
  result,
};
