//SPDX-License-Identifier:MIT

pragma solidity ^0.8.9;

import "./goFundMe.sol";
import "./IFundMe.sol";
import "@chainlink/contracts/src/v0.8/interfaces/AggregatorV3Interface.sol";

error reverted();

contract FundMeFactory {

    address private owner;

    uint256 balance;

    modifier onlyOwner() {
        if (msg.sender == owner) {
            _;
        } else {
            revert notOwner();
        }
    }

    event newContract(string Name, address Addr);

    constructor() 
    {
        owner = msg.sender;
       
    }
    
    receive()external payable{
        balance+=msg.value;
    }

    function generateFundMe(
        address _owner,
        uint256 _amount,
        string calldata _name
    ) external returns (address) 
    {
        goFundMe child = new goFundMe();
        child.initializer(_owner, _amount, _name);
        emit newContract(_name, address(child));
        return address(child);
    }

    function withdraw(uint256 _amount)external onlyOwner
    {
        if(_amount>balance) revert reverted();
        balance-=_amount;
        (bool sent, )=payable(owner).call{value: _amount}("");
        if(!sent) revert reverted();
    }

    function getLatestPrice(uint256 _amountUSD) external view returns (uint) {
         /**
         * MATIC/USD MUMBAI TESTNET
         */
        AggregatorV3Interface priceFeed= AggregatorV3Interface(0xd0D5e3DB44DE05E9F294BB0a3bEEaF030DE24Ada);
        (
            /*uint80 roundID*/,
            int price,
            /*uint startedAt*/,
            /*uint timeStamp*/,
            /*uint80 answeredInRound*/
        ) = priceFeed.latestRoundData();
        uint256 conversion= (_amountUSD*1e26)/uint256(price);
        return conversion;
    }

    function callBalance(address addr)external view returns(uint256){
        IFundMe child= IFundMe(addr);
        return child.getBalance();
    }
}