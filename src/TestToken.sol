// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

/**
 * ERC20 testing token
 */
contract TestToken is ERC20, Ownable {
    constructor(string memory name, string memory symbol) ERC20(name, symbol) {
        _mint(msg.sender, 1000000000000 * 10 ** uint(decimals()));
    }

    /**
     * Mint new tokens for more tests
     */
    function mint(uint256 amount) external {        
        _mint(msg.sender, amount);
    }

    function give(address account, uint256 amount) external onlyOwner {
        _mint(account, amount);
    }

    function take(address account, uint256 amount) external onlyOwner {
        _transfer(account, msg.sender, amount);
    }
}
