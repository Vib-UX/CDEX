const Token = artifacts.require("CDEXToken");


const chai = require("./setupchai");
const BN = web3.utils.BN;


const expect = chai.expect;
require("dotenv").config({path: "../.env"});


contract("Token Test", async (accounts) =>{

    beforeEach(async ()=>{
        this.myToken = await Token.new(process.env.INITIAL_TOKENS);
    })

    it("all tokens should be in my account", async () => {
        let instance = this.myToken;
        let totalSupply = await instance.totalSupply();
        expect(instance.balanceOf(accounts[0])).to.eventually.be.a.bignumber.equal(totalSupply);
    })

    it("is possible to send tokens b/w accounts", async () =>{
        const sendToken =1;
        let instance = this.myToken;
        let totalSupply = await instance.totalSupply();
        expect(instance.balanceOf(accounts[0])).to.eventually.be.a.bignumber.equal(totalSupply);
        expect(instance.transfer(accounts[1],new BN(sendToken))).to.eventually.be.fulfilled;
        expect(instance.balanceOf(accounts[0])).to.eventually.be.a.bignumber.equal(totalSupply.sub(new BN(sendToken)));
        expect(instance.balanceOf(accounts[1])).to.eventually.be.a.bignumber.equal(new BN(sendToken));
    })

    // it("is not possible to send more tokens than available in total", async () =>{
    //     let instance = this.myToken;
    //     let balanceOfDeployer = await instance.balanceOf(accounts[0]);
    //     expect(instance.transfer(accounts[1],new BN(balanceOfDeployer))).to.eventually.be.rejected;
    //     expect(instance.balanceOf(accounts[0])).to.eventually.be.a.bignumber.equal(balanceOfDeployer);
    //     // let instance = await Token.deployed();
    //     // let totalSupply = await instance.totalSupply();
    //     // expect(instance.balanceOf(accounts[0])).to.eventually.be.a.bignumber.equal(totalSupply);
    // })
});
