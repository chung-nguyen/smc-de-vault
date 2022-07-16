// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "./lib/ERC721Tradable.sol";

/**
 * @title TestNFT
 * TestNFT - a contract for testing.
 */
contract TestNFT is ERC721Tradable {
  constructor(string memory name, string memory ticker) ERC721Tradable(name, ticker) {  }

  function baseTokenURI() override public pure returns (string memory) {
    return "https://devault-metadata.s3.ap-northeast-1.amazonaws.com/2048/";
  }
}
