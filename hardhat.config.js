require("@nomicfoundation/hardhat-toolbox")
require("@nomiclabs/hardhat-ethers")
require("@openzeppelin/hardhat-upgrades")
require("hardhat-gas-reporter")
require("hardhat-deploy")
require("dotenv").config()

/** @type import('hardhat/config').HardhatUserConfig */
const GOERLI_RPC_URL =
    process.env.GOERLI_RPC_URL || "https://eth-goerli.alchemyapi.io/v2/your-api-key"
const PRIVATE_KEY = process.env.ACCOUNT || "0x"
module.exports = {
    defaultNetwork: "hardhat",
    solidity: {
        compilers: [
            {
                version: "0.8.2",
            },
            {
                version: "0.8.9",
            },
            {
                version: "0.8.17",
            },
        ],
    },
    networks: {
        hardhat: {
            chainId: 31337,
        },
        localhost: {
            url: "http://127.0.0.1:8545/", //json-rpc from terminal
            chainId: 31337,
            gas: 2100000,
            gasPrice: 8000000000,
        },
        goerli: {
            url: GOERLI_RPC_URL,
            accounts: [`0x${PRIVATE_KEY}`],
            saveDeployments: true,
            chainId: 5,
            blockConfirmations: 6,
        },
    },
    etherscan: {
        apiKey: process.env.ETHERSCAN_API_KEY,
    },
    gasReporter: { enabled: true },
    namedAccounts: {
        deployer: {
            default: 0, // here this will by default take the first account as deployer
        },
    },
}
