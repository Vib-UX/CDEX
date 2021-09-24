var CDEXToken = artifacts.require("./CDEXToken.sol");
var CDEXTokenSale = artifacts.require("./CDEXSale.sol");
var Kyc = artifacts.require("./KycContract.sol");
require("dotenv").config({path: "../.env"});

module.exports = async function(deployer){
    let addr = await web3.eth.getAccounts();
    await deployer.deploy(CDEXToken,process.env.INITIAL_TOKENS);
    let instance = await CDEXToken.deployed();
    await deployer.deploy(Kyc);
    await deployer.deploy(CDEXTokenSale,1,addr[0],CDEXToken.address,Kyc.address);
    await instance.transfer(CDEXTokenSale.address,process.env.INITIAL_TOKENS);
}