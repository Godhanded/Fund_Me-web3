require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config()

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.9",
  networks:{
    polygon:{
      url: process.env.URL,
      accounts: [process.env.KEY,]
    }
  }
};
