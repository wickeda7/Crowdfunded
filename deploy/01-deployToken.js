const { network } = require("hardhat")
const { verify } = require("../utils/verify")
const developmentChains = ["hardhat", "localhost"]
const VERIFICATION_BLOCK_CONFIRMATIONS = 6
const frontEndLocation = "frontend/constants/"

module.exports = async ({ getNamedAccounts, deployments }) => {
    const { deploy, log } = deployments
    const { deployer } = await getNamedAccounts()
    const waitBlockConfirmations = developmentChains.includes(network.name)
        ? 1
        : VERIFICATION_BLOCK_CONFIRMATIONS
    console.log("Deploy FundToken")
    log("----------------------------------------------------")

    const fundToken = await deploy("FundToken", {
        from: deployer,
        args: [],
        log: true,
        waitConfirmations: waitBlockConfirmations,
    })
    if (fundToken.newlyDeployed) {
        console.log(`fundToken  deployed at ${fundToken.address}`)
    }
    // Be sure to check out the hardhat-deploy examples to use UUPS proxies!
    // https://github.com/wighawag/template-ethereum-contracts

    // Verify the deployment
    if (!developmentChains.includes(network.name) && process.env.ETHERSCAN_API_KEY) {
        log("Verifying...")
        await verify(fundToken.address, [])
    }
    log("----------------------------------------------------")
}
module.exports.tags = ["all", "fundToken"]
