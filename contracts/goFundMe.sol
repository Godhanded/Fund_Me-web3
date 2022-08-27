//SPDX-License-Identifier: MIT
pragma solidity 0.8.9;

error invalidState();
error notFactory();
error notOwner();

contract goFundMe {
    
    address public factory;
    address public owner;

    uint256 public balance;

    struct funders {
        address funder;
        uint amount;
    }

    enum State {
        StandBy,
        Funding,
        Completed
    }

    State public state;

    funders[] private fundersList; 

    modifier onlyFactory {
        if (msg.sender == factory)
        {
            _;
        }else {
            revert notFactory();
        }
    }

    modifier onlyOwner {
        if (msg.sender == owner)
        {
            _;
        }else {
            revert notOwner();
        }
    }

    modifier inState(State state_) {
        if (state == state_)
        {
            _;
        }else {
            revert invalidState();
        }
    }
}