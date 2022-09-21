# THIRD FUND(Fund me web3)

> ## Table of Contents
- [Project Details](#project-description)
- [Problem Statement](#problem-statement)
- [Solution](#solution)
- [Technologies Used](#technologies-used)
    - [IPFS](#ipfs)
    - [Moralis](#moralis)
    - [Chainlink](#chainlink)
    - [Smart Contract](#solidity-smart-contracts)
    - [Polygon](#polygon-mumbai-testnet)
- [Important Live Links](#importantlive-hosted-project-links)
- [Team Members](#contributors)
- [Project Features](#project-features)
- [Future Project Plans](#future-project-plans)


#
> ## Project Description

<p>Thirdfund is a decentralised fund raiser platform built using IPFS and Moralis the on polygon network.
Effortlessly raise funds with crypto zero gas transactions (thirdfund is deployed on matic) 
Say a bye to card integration issues and funding transaction limits,let’s go all crypto! No sneaky policies our platform is 100% decentralised and easy to use . 
Create a fund raiser contract in seconds and raise funds for your event’s,projects,pre-seed … and more,get your funds deposited into your wallet immediately you end fund raiser at your will </p>

#
## Important/Live Hosted Project Links
- **Hosted URL** > https://fundmeweb3.on.fleek.co

- **Github** > https://github.com/Godhanded/Fund_Me-web3

- **Contract** > [0x9A45928dfD2c612137F0EC5E2164A9284534113d](https://mumbai.polygonscan.com/address/0x9A45928dfD2c612137F0EC5E2164A9284534113d#code)

#
> ## Problem Statement

A lot of fund raiser platforms on web2 are hooked with debit card and bank models for fundraising or donations . This usually creates the struggle of debit card rejection,bank network error,transaction limits,country fintech restrictions,strict rules&policies of use,high transaction charges,unnecessary quest for confidential user data etc . After all these struggles at times you might still face banking network congestions while trying to withdraw demanding you wait for days for rectification before you get Acess to your funds, also their overall ledger of transactions is usually private 
[see solution here](#solution)

#
> ## Contributors

- Godhanded(Block-End Dev)
    - [Twitter, @Godand](https://twitter.com/Godand_)
    - [Github, @Godhanded](https://github.com/Godhanded) <br>
- Miraclemenikelechi(Front-End dev)
    - [Twitter, @trinityandtruth](https://twitter.com/trinityandtruth?s=20&t=ZIj6s8ImLoDYIqEpV-qfKw)
    - [Github, @miraclemenikelechi](https://github.com/miraclemenikelechi)<br>
- Nuelvations(Product Manager)
    - [Twitter, @defiprince_](https://twitter.com/defiprince_)
    - [Github, @nuelvations](https://github.com/nuelvations) <br>

#
> ## Technologies Used

 | <b><u>Stack</u></b> | <b><u>UsageSummary</u></b> |
 | :------------------ | :------------------------- |
 | **`Solidity`**      | Smart contract             |
 | **`Vanilla JS`**    | Frontend                   |
 | **`IPFS`**          | Hosting&Funding Metadata   |
 | **`Moralis`**       | contract calls&DB          |
 | **`Chainlink`**     | Matic/USD Datafeeds        |
 | **`Polygon Mumbai`**| Deployed on Polygon Testnet|

- ### **Solidity smart contracts**
    Third fund makes use of three smart contracts see [3 contracts](https://github.com/Godhanded/Fund_Me-web3/tree/main/contracts)
    - **FundFactory** each fund raiser is a new dedicated contract for said fund raiser the Fund Factory handles this by generating a new contract based on the information provided by the user when they create a new fundraiser , it also receives the commission from all child contracts when the users decide to withdraw their funds that have been raised. see [contract here](https://github.com/Godhanded/Fund_Me-web3/blob/main/contracts/fundMeFactory.sol)
    - **GoFundmechild** this is the new contract that is generated for each user when ever they create a fundraiser , it handles tracking of who donated, the amount donated, total money in the contract , withdrawal and owner of the contract. see [contract here](https://github.com/Godhanded/Fund_Me-web3/blob/main/contracts/goFundMe.sol)

- ### **IPFS**
  We used IPFS in **Third FUND** for a number of things,
  - **Firstly** the Frontend for This project is hosted on IPFS **through Fleek** https://fundmeweb3.on.fleek.co .

  - **Secondly** IPFS came into play again after a user creates a fund raising contract through our platform, The Meta data such as; *see* [Upload Metadata Function](https://github.com/Godhanded/Fund_Me-web3/blob/main/public/main.js#L212),  [Upload image Function](https://github.com/Godhanded/Fund_Me-web3/blob/main/public/main.js#L204)

    ```json
                                {
                                    "project Name": "Name",
                                    "Project Image":"Avatar IPFS url",
                                    "Owner Name":"Owner name",
                                    "Funding Amount":"Amount needed",
                                    "Project details":".....",
                                    "Contract Address":"0xb1...",
                                    "Owners Address":"0x12...",
                                }
    ```
                                
      The projects image/avatar is uploaded to IPFS through Moralis' gateway, the url is retrived and added to the Metadata which is also uploaded to IPFS. This to make it easy for fund raisers to share details about their funding, project, Cause ect.
   

   - **Lastly** IPFS is also used to retrive and View the Metadata of any fund raiser generated on our Platform, this is done by searching for the  projects name in the search bar, it looks for the IPFS url mapped to the name and retrieves the Metadata from IPFS through Moralis' gateway on our IFrame src. see [Retrieve Ipfs Metadata to Iframe](https://github.com/Godhanded/Fund_Me-web3/blob/main/public/main.js#L238)

- ### **Moralis**
    - The Moralis vanilla js SDK was used in this project for all smart contract calls, see [one of the functions](https://github.com/Godhanded/Fund_Me-web3/blob/main/public/main.js#L169) 

    - Moralis DB ws used to store and retrieve the project names and IPFS urls as they are created in the contract generation function and the search bar see [generate contract function](https://github.com/Godhanded/Fund_Me-web3/blob/main/public/main.js#L92) , [find funding function](https://github.com/Godhanded/Fund_Me-web3/blob/main/public/main.js#L242)

    - Moralis was also used to connect and communicate with A web3 provider like Metamask. see [connect function](https://github.com/Godhanded/Fund_Me-web3/blob/main/public/main.js#L14)

- ### **Chainlink**
    - Chain link was very important we needed a way for users to type the amount the want to rais in USD for an easier user experience, but the contract works with wei or e^18. so we usd chainlink data feeds to always convert the entered amount in USD to its equivalent value in Matic Wei see [contract code](https://github.com/Godhanded/Fund_Me-web3/blob/main/contracts/fundMeFactory.sol#L57) , [front end call](https://github.com/Godhanded/Fund_Me-web3/blob/main/public/main.js#L34)

- ### **Polygon Mumbai Testnet**
    - The three smart contracts where deployed and verified on the Polygon Mumbai Testnet
    see [Contract here](https://mumbai.polygonscan.com/address/0x9A45928dfD2c612137F0EC5E2164A9284534113d#code)




#
## Solution
<p>Thirdfund is decentralised (you don’t need to link your bank details or debit card) 
Effortlessly connect your crypto wallet,create fund raiser,provide your wallet address (polygon matic)and automatically get a funding contract in less than 1 minute, use your funding contract as a deposit slip to receive funding and donations round the world with zero gas transactions and no third party, end the fundraiser at your quest and get your funds deposited to your wallet address automatically no time lapse .
Our platform has swift ux, and all transactions are recorded on our public ledger which users can acess via search,thirdfund is safe,fast,free and transparent that is why we chose the blockchain technology. </p>

#
## Project features
- Generate Fundraisers
- Find Fundraisers
- Donate to Fundraisers
- uses IPFS, Chainlink, Polygon,Moralis


#
## Future Project Plans
We plan to push this project further after the hackathon, and integrate some stacks we weren’t able to complete due to time lapse . 
- Firstly we propose to make withdrawals cross-chain after your fund raiser has ended so to enable users withdrawal their  funds to any blockchain of their choice,this is to improve 
compatibility of thirdfund to all networks.
-Support; we are working towards integrating a live chat support for users who wish to make inquiries or give feedback, we plan using Xmtp for this . 

- Improved algorithm and analytics that provides you with details like wallet addresses of your funders,time and location . 
- Backup wallet; incase you happen to loose your device or so,your backup wallet helps you get acess to your fundraiser page without you loosing a coin .