const helper = require('./txOlympusHelper');
const { ThirdwebSDK } = require("@thirdweb-dev/sdk");
const sdk = new ThirdwebSDK("mumbai");
const OLYtoken = "0xfA157F6608010650fF3B563eaf1F15F8dea726D7"
const contract = await sdk.getContract(OLYtoken); //address for erc20 tokenizers

//Upgrade function
function upgrade() {
    // Address of the wallet to check token allowance. Call from frontend
    const spenderAddress = "0x...";
    const userAddress = "0x...";
    const balance = await contract.token.balance(userAddress)
    const allowance = await contract.token.allowance(spenderAddress);
    //compare allowance balance with upgrade fee

    const upgradeFee = helper.upgradeFee()
    if((balance && allowance) >= upgradeFee()){
        const amount = helper.upgradeFee();
        helper.upgrade();
        // event listener back from contract
    }

    else new Error (`Balance and allowance most be at least ${upgradeFee}`)
}

//Vandalize
function vandalize() {
    // Address of the wallet to check token allowance. Call from frontend
    const spenderAddress = "0x...";
    const userAddress = "0x...";
    const balance = await contract.token.balance(userAddress)
    const allowance = await contract.token.allowance(spenderAddress);
    //compare allowance balance with upgrade fee

    const vandalizeFee = helper.vandalizeFee()
    if((balance && allowance) >= vandalizeFee()){
        const amount = helper.vandalizeFee();
        helper.vandalize();
        // event listener back from contract
    }

    else new Error (`Balance and allowance most be at least ${vandalizeFee}`)
}
