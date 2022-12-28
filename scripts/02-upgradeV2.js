const { network, deployments, deployer, upgrades, ether } = require("hardhat")
const { verify } = require("../utils/verify")
const developmentChains = ["hardhat", "localhost"]
const { tokenAddress } = require("../frontend/constants/tokenAddress.js")
const { utils } = require("ethers")
require("dotenv").config()
const frontEndLocation = "frontend/constants/"
const fs = require("fs")

async function main() {
    const creator = process.env.CAMPAIGN_CREATOR
    const boxProxyAdmin = await ethers.getContract("CrowdFundedProxyAdmin")
    const transparentProxy = await ethers.getContract("CrowdFunded_Proxy")
    const crowdFundedV2 = await ethers.getContract("CrowdFundedV2")
    const upgradeTx = await boxProxyAdmin.upgrade(transparentProxy.address, crowdFundedV2.address)
    await upgradeTx.wait(1)

    const proxyV2 = await ethers.getContractAt("CrowdFundedV2", transparentProxy.address)
    /* enddate = new Date().getTime() / 1000  
    (goal, enddate, tokenAddress) 1670709935
    
    */
    await proxyV2.store(19, 1672193917, tokenAddress)
    console.log("2Proxy of CrowdFundedV2 deployed to:", proxyV2.address)
    if (process.env.UPDATE_FRONT_END) {
        console.log("Writing to front end V2...")
        const crowdFunded = await ethers.getContract("CrowdFundedV2")
        fs.writeFileSync(
            `${frontEndLocation}abi.js`,
            `export const abi = ${crowdFunded.interface.format(ethers.utils.FormatTypes.json)}`
        )
        console.log("Front end V2 written!")
    }
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error)
        process.exit(1)
    })
