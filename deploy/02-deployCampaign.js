const { network } = require("hardhat")
const { verify } = require("../utils/verify")
const developmentChains = ["hardhat", "localhost"]
const VERIFICATION_BLOCK_CONFIRMATIONS = 6
module.exports = async ({ getNamedAccounts, deployments }) => {
    const { deploy, log } = deployments
    const { deployer } = await getNamedAccounts()
    console.log("Deploy CrowdFunded")
    const waitBlockConfirmations = developmentChains.includes(network.name)
        ? 1
        : VERIFICATION_BLOCK_CONFIRMATIONS

    console.log("----------------------------------------------------")
    const fundToken = await deployments.get("FundedToken")
    if (fundToken.address) {
        const crowdFunded = await deploy("FundContract", {
            from: deployer,
            args: [],
            log: true,
            waitConfirmations: waitBlockConfirmations,
            proxy: {
                proxyContract: "OpenZeppelinTransparentProxy",
                viaAdminContract: {
                    name: "CrowdFundedProxyAdmin",
                    artifact: "CrowdFundedProxyAdmin",
                    artifact: "CrowdFundedProxyAdmin",
                },
            },
        })
    }

    // Be sure to check out the hardhat-deploy examples to use UUPS proxies!
    // https://github.com/wighawag/template-ethereum-contracts

    // Verify the deployment
    if (!developmentChains.includes(network.name) && process.env.ETHERSCAN_API_KEY) {
        console.log("Verifying...")
        const address = (await ethers.getContract("FundContract_Implementation")).address
        await verify(address, [])
    }
    console.log("----------------------------------------------------")
}

module.exports.tags = ["all", "crowdFunded"]
//module.exports.dependencies = ["fundToken"]
