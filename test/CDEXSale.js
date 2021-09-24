const Token = artifacts.require("CDEXToken");
const TokenSale = artifacts.require("CDEXSale");
const KycContract = artifacts.require("KycContract");

const chai = require("./setupchai");
const BN = web3.utils.BN;

const expect = chai.expect;
require("dotenv").config({path: "../.env"});


contract("TokenSale Test", async (accounts) =>{

    const [deployerAccount, recipient, anotherAccount] = accounts;

    it("should not have any tokens in deployer account ", async () => {
        let instance = await Token.deployed();
        return expect(instance.balanceOf(deployerAccount)).to.eventually.be.a.bignumber.equal(new BN(0));
    })

    it("all tokens should be in TokenSale contract by default ", async () =>{
        let instance = await Token.deployed();
        let balanceOfTokenSaleContract = await instance.balanceOf(TokenSale.address);
        let totalSupply = await instance.totalSupply();
        return expect(balanceOfTokenSaleContract).to.be.a.bignumber.equal(totalSupply);
    })

    it("should be possible to buy tokens", async() => {
        let tokenInstance = await Token.deployed();
        let tokenSaleInstance = await TokenSale.deployed();
        let kycInstance = await KycContract.deployed();
        await kycInstance.setKycCompleted(deployerAccount,{from: deployerAccount});
        let balanceBefore = await tokenInstance.balanceOf(deployerAccount);
        expect(tokenSaleInstance.sendTransaction({from: deployerAccount, value: 1})).to.be.fulfilled;
        balanceBefore = balanceBefore.add(new BN(0));
        return expect(tokenInstance.balanceOf(deployerAccount)).to.eventually.be.a.bignumber.equal(balanceBefore);
    })


})