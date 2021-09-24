const path = require("path");
const HDWalletProvider = require("@truffle/hdwallet-provider");
require("dotenv").config({path: "./.env"});
const AccountIndex =0;

module.exports = {
  contracts_build_directory: path.join(__dirname, "client/src/contracts"),
  networks: {
    development: {
      host: "127.0.0.1",
      port: 7545,
      network_id: 5777 // Match any network id
    },
    ganache_local: {
      provider: function(){
        return new HDWalletProvider(process.env.MNEMONIC,"http://127.0.0.1:7545", AccountIndex)
      },
      network_id: 5777
    }
  },
  compilers: {
    solc: {
      version: "0.6.1"
    }
  }
};
