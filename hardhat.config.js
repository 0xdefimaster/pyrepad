// hardhat.config.js - ESKİ OLAN BU SATIRI SİLİN:
// require("@nomiclabs/hardhat-waffle");
// require("@nomiclabs/hardhat-ethers");
// require("@nomiclabs/hardhat-etherscan");

// YENİ - BUNU KULLANIN:
require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config();

module.exports = {
  solidity: {
    version: "0.8.20",
    settings: {
      optimizer: {
        enabled: true,
        runs: 200
      }
    }
  },
  networks: {
    localhost: {
      url: "http://127.0.0.1:8545"
    },
    monadTestnet: {
      url: process.env.MONAD_TESTNET_RPC || "https://testnet-rpc.monad.xyz",
      accounts: process.env.PRIVATE_KEY ? [process.env.PRIVATE_KEY] : [],
      chainId: 41454
    }
  }
};