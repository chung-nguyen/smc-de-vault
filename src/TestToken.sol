// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

/**
 * ERC20 testing token
 */
contract TestToken is ERC20 {
    constructor(string memory name, string memory symbol) ERC20(name, symbol) {
        _mint(msg.sender, 1000000000000 * 10 ** uint(decimals()));
    }

    /**
     * Mint new tokens for more tests
     */
    function mint(uint256 amount) external {        
        _mint(msg.sender, amount);
    }
}
