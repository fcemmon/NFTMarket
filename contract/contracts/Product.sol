// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

import "./ERC721Tradable.sol";

/**
 * @title Creature
 * Creature - a contract for my non-fungible creatures.
 */
contract Product is ERC721Tradable {
	
	event MintToken(uint256 token_id, uint256 product_id);
    
    constructor(address _proxyRegistryAddress)
        ERC721Tradable("Product", "PROD", _proxyRegistryAddress)
    {}

    function baseTokenURI() override public pure returns (string memory) {
        return "http://localhost:8080/api/erc721/";
    }

    function contractURI() public pure returns (string memory) {
        return "https://creatures-api.opensea.io/contract/opensea-creatures";
    }

    function mintTo(address _to, uint256 token_id, uint256 product_id) public onlyOwner {
    	mintTo(_to, token_id);
    	emit MintToken(token_id, product_id);
    }
}
