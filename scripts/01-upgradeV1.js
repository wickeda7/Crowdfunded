const { network, deployments, deployer, upgrades, ether } = require("hardhat")
const { verify } = require("../utils/verify")
const developmentChains = ["hardhat", "localhost"]
const { tokenAddress } = require("../frontend/constants/tokenAddress.js")
const { utils } = require("ethers")
require("dotenv").config()

async function main() {
    const transparentProxy = await ethers.getContract("CrowdFunded_Proxy")
    const proxyV1 = await ethers.getContractAt("CrowdFunded", transparentProxy.address)
    console.log("Proxy of CrowdFunded deployed to:", proxyV1.address)
    /// Get token owner for creater
    const accounts = await ethers.getSigners()
    // console.log(accounts.length)
    // console.log(accounts)
    /* enddate = new Date().getTime() / 1000  
    (goal, enddate, tokenAddress, creator) 
    
    */
    await proxyV1.store(18, 1672193320, tokenAddress)
    console.log("----------------------------------------------------")
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error)
        process.exit(1)
    })
