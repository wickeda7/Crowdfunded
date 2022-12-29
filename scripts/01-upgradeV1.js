const { network, deployments, deployer, upgrades, ether } = require("hardhat")
const { verify } = require("../utils/verify")
const developmentChains = ["hardhat", "localhost"]
const { tokenAddress } = require("../frontend/constants/tokenAddress.js")
const { utils } = require("ethers")
require("dotenv").config()

const GOAL = process.env.GOAL || "20"
const END_DATE = process.env.END_DATE || "1672193320"
async function main() {
    const transparentProxy = await ethers.getContract("FundContract_Proxy")
    const proxyV1 = await ethers.getContractAt("FundContract", transparentProxy.address)
    console.log("Proxy of CrowdFunded deployed to:", proxyV1.address)
    const accounts = await ethers.getSigners()
    /* enddate = new Date().getTime() / 1000  
    (goal, enddate, tokenAddress) 
    
    */
    await proxyV1.store(GOAL, END_DATE, tokenAddress)
    console.log("----------------------------------------------------")
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error)
        process.exit(1)
    })
