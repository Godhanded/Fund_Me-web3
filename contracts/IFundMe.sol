// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

interface IFundMe {
    function getBalance() external view returns (uint256) ;
    function initializer(address _owner, uint256 _amount,string calldata _name) external;
}