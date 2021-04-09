// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

import "./ERC1155Tradable.sol";

/**
 * @title CreatureAccessory
 * CreatureAccessory - a contract for Creature Accessory semi-fungible tokens.
 */
contract ProductAccessory is ERC1155Tradable {

    event MintToken(uint256 token_id, uint256 product_id);

    constructor(address _proxyRegistryAddress)
        ERC1155Tradable(
            "OpenSea Product Accessory",
            "OPA",  
            "http://localhost:8080/api/erc1155/{id}",
            _proxyRegistryAddress
        ) {}

    function contractURI() public pure returns (string memory) {
        return "https://creatures-api.opensea.io/contract/opensea-erc1155";
    }

    function mintTo(
        address _to,
        uint256 newTokenId,
        uint256 _quantity,
        bytes memory _data,
        uint256 product_id
    ) public onlyOwner {
        mint(_to, newTokenId, _quantity, _data);
        emit MintToken(newTokenId, product_id);
    }
}
