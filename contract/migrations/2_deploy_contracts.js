const Product = artifacts.require("./Product.sol");
const ProductAccessory = artifacts.require("./ProductAccessory.sol");

const setupCreatureAccessories = require("../lib/setupCreatureAccessories.js");

module.exports = async (deployer, network, addresses) => {
  // OpenSea proxy registry addresses for rinkeby and mainnet.
  let proxyRegistryAddress = "";
  if (network === 'rinkeby') {
    proxyRegistryAddress = "0xf57b2c51ded3a29e6891aba85459d600256cf317";
  } else {
    proxyRegistryAddress = "0xa5409ec958c83c3f309868babaca7c86dcb077c1";
  }

  await deployer.deploy(Product, proxyRegistryAddress, {gas: 5000000});

  await deployer.deploy(
    ProductAccessory,
    proxyRegistryAddress,
    { gas: 5000000 }
  );
  const accessories = await ProductAccessory.deployed();
  await setupCreatureAccessories.setupAccessory(
      accessories,
      addresses[0]
  );
};
