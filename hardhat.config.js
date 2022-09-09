require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config()
require("@nomiclabs/hardhat-etherscan");

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.9",
  networks:{
    polygon:{
      url: process.env.URL,
      accounts: [process.env.KEY,]
    }
  },
  etherscan:{
    apiKey:process.env.APIKEY,
  }
};
