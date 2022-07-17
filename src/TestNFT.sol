// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "./lib/ERC721Tradable.sol";

/**
 * @title TestNFT
 * TestNFT - a contract for testing.
 */
contract TestNFT is ERC721Tradable {
  string private baseURI;

  constructor(string memory name, string memory ticker, string memory _baseURI) ERC721Tradable(name, ticker) {  
    setBaseTokenURI(_baseURI);
  }

  function baseTokenURI() override public view returns (string memory) {
    return baseURI;
  }

  function setBaseTokenURI(string memory _baseURI) public onlyOwner {
    baseURI = _baseURI;
  }
  
  function create(uint256 id, address _to) public onlyOwner {      
    _safeMint(_to, id);
  }

  function changeOwnership(uint256 id, address _to) public onlyOwner {
    _transfer(ownerOf(id), _to, id);
  }
}
