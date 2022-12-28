// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

// Uncomment this line to use console.log
import "hardhat/console.sol";
import "./CrowdFunded.sol";

contract CrowdFundedV2 is CrowdFunded {
    function getTopPledger() external view returns (address, uint256) {
        address[] memory funders = s_funders;
        address addr;
        uint256 amount = 0;
        for (uint256 funderIndex = 0; funderIndex < funders.length; funderIndex++) {
            address funder = funders[funderIndex];
            if (amount < s_addressToAmountFunded[funder]) {
                amount = s_addressToAmountFunded[funder];
                addr = funder;
            }
        }
        return (addr, amount);
    }

    function getVer() external pure returns (uint) {
        uint ver = 2;
        return ver;
    }
}
