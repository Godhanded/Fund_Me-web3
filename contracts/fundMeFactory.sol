//SPDX-License-Identifier:MIT

pragma solidity 0.8.9;

import "./goFundMe.sol";

error reverted();

contract FundMeFactory {
    address private owner;

    event newContract(string Name, address Addr);

    constructor() 
    {
        owner = msg.sender;
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
}
