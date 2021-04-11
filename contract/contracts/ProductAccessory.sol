// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

import "./ERC1155Tradable.sol";

/**
 * @title CreatureAccessory
 * CreatureAccessory - a contract for Creature Accessory semi-fungible tokens.
 */
contract ProductAccessory is ERC1155Tradable {

    struct ProductAccessoryInfo {
        string name;
        string description;
        string exturnal_url;
        string image;
    }

    event MintToken(uint256 token_id, uint256 product_id);

    mapping (uint256 => uint256) quantities;
    mapping (uint256 => ProductAccessoryInfo) productAccessories;

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
        uint256 product_id,
        string memory name, 
        string memory description, 
        string memory image,
        string memory exturnal_url
    ) public onlyOwner {
        mint(_to, newTokenId, _quantity, "");
        productAccessories[newTokenId] = ProductAccessoryInfo({name:name, description:description, image:image, exturnal_url:exturnal_url});
        quantities[newTokenId] = _quantity;
        emit MintToken(newTokenId, product_id);
    }

    function getInfo(uint256 token_id) public view returns (string memory, string memory, string memory, string memory, uint256)  {
        ProductAccessoryInfo memory product = productAccessories[token_id];
        return (product.name, product.description, product.exturnal_url, product.image, quantities[token_id]);
    }
}
