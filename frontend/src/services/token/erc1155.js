const env = require("../../config")

const HDWalletProvider = require("@truffle/hdwallet-provider");
const web3 = require("web3");
const MNEMONIC = env.MNEMONIC;
const NODE_API_KEY = env.INFURA_KEY || env.ALCHEMY_KEY;
const isInfura = !!env.INFURA_KEY;
const NFT_1155_CONTRACT_ADDRESS = env.NFT_1155_CONTRACT_ADDRESS;
const NETWORK = env.NETWORK;
const OWNER_ADDRESS = env.OWNER_ADDRESS

const Product_Accessory_ABI = require("../../abi/ProductAccessory.json")

exports.getTokenInfo = (token_id) => {
	const network =
    NETWORK === "mainnet" || NETWORK === "live" ? "mainnet" : "rinkeby";
	const provider = new HDWalletProvider(
		{
			mnemonic: {
					phrase: MNEMONIC
				},
			providerOrUrl: isInfura
			      ? "https://" + network + ".INFURA_KEY.io/v3/" + NODE_API_KEY
			      : "https://eth-" + network + ".alchemyapi.io/v2/" + NODE_API_KEY
		}
	);
	
	const web3Instance = new web3(provider);

	const nftContract = new web3Instance.eth.Contract(
      Product_Accessory_ABI.abi,
      NFT_1155_CONTRACT_ADDRESS,
      { gasLimit: "1000000" }
    );

	provider.engine.stop()
    // Creatures issued directly to the owner.
    return nftContract.methods.getInfo(token_id).call({from: OWNER_ADDRESS})
}