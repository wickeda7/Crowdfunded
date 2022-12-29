require("dotenv").config()
const fs = require("fs")
const { network } = require("hardhat")
const frontEndLocation = "frontend/constants/"

module.exports = async () => {
    if (process.env.UPDATE_FRONT_END) {
        console.log("Writing to front end...")
        await updateAbi()
        await updateContractAddresses()
        console.log("Front end written!")
    }
}

async function updateAbi() {
    const fToken = await ethers.getContract("FundedToken")
    fs.writeFileSync(
        `${frontEndLocation}tokenAbi.json`,
        fToken.interface.format(ethers.utils.FormatTypes.json)
    )

    const crowdFunded = await ethers.getContract("FundContract")
    fs.writeFileSync(
        `${frontEndLocation}abi.js`,
        `export const abi = ${crowdFunded.interface.format(ethers.utils.FormatTypes.json)}`
    )
}

async function updateContractAddresses() {
    const fToken = await ethers.getContract("FundedToken")
    fs.writeFileSync(
        `${frontEndLocation}tokenAddress.js`,
        `module.exports = { tokenAddress:  ${JSON.stringify(fToken.address)}}`
    )
    fs.writeFileSync(
        `${frontEndLocation}tokenAddress2.js`,
        `export const tokenAddress = ${JSON.stringify(fToken.address)}`
    )
    const crowdFunded = await ethers.getContract("FundContract_Proxy")
    fs.writeFileSync(
        `${frontEndLocation}address.js`,
        `export const contractAddress = ${JSON.stringify(crowdFunded.address)}`
    )
}
module.exports.tags = ["frontend"]
