const helper = require("./txOlympusHelper");
const { ThirdwebSDK } = require("@thirdweb-dev/sdk");
const sdk = new ThirdwebSDK("mumbai");
const OLYtoken = "0xfA157F6608010650fF3B563eaf1F15F8dea726D7";
const txContract = "0xBa9e3CCECeB85a1c3e70c66Bd9C4cD822364951E";

// Upgrade function
const upgrade = async () => {
  // Address of the wallet to check token allowance. Call from frontend
  const spenderAddress = "0x...";
  const userAddress = "0x...";

  const contract = await sdk.getContract(OLYtoken); // address for erc20 tokenizers

  const balance = await contract.token.balance(userAddress);
  const allowance = await contract.token.allowance(spenderAddress);
  // compare allowance balance with upgrade fee

  const instance = await sdk.getContract(txContract);
  const upgradeFee = helper.upgradeFee(instance);

  if ((balance && allowance) >= upgradeFee()) {
    helper.upgrade(await sdk.getContract(instance));
    // event listener back from contract
  } else Error(`Balance and allowance most be at least ${upgradeFee}`);
};

// Vandalize
const vandalize = async () => {
  // Address of the wallet to check token allowance. Call from frontend
  const spenderAddress = "0x...";
  const userAddress = "0x...";

  const contract = await sdk.getContract(OLYtoken);

  const balance = await contract.token.balance(userAddress);
  const allowance = await contract.token.allowance(spenderAddress);
  // compare allowance balance with upgrade fee

  const instance = await sdk.getContract(txContract);
  const vandalizeFee = helper.vandalizeFee(instance);
  if ((balance && allowance) >= vandalizeFee()) {
    helper.vandalize(instance);
    // event listener back from contract
  } else Error(`Balance and allowance most be at least ${vandalizeFee}`);
};

module.exports = {
  upgrade,
  vandalize,
};
