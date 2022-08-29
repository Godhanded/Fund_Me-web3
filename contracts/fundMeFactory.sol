//SPDX-License-Identifier:MIT

pragma solidity ^0.8.9;

import "./goFundMe.sol";
import "./IFundMe.sol";

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
        (bool sent, )=payable(owner).call{value: _amount}("");
        if(!sent) revert reverted();
    }

    function callBalance(address addr)external view returns(uint256){
        IFundMe child= IFundMe(addr);
        return child.getBalance();
    }
}
