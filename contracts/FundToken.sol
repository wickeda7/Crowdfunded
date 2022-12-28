//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract FundToken is ERC20 {
    address payable public owner;

    constructor() ERC20("FundToken", "FTK") {
        owner = payable(msg.sender);
        _mint(owner, 500 * 10 ** uint(decimals()));
    }

    function mint(address to, uint256 amount) public {
        _mint(to, amount);
    }
}
