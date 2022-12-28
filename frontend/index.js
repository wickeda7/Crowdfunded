import { ethers } from "./ethers-5.6.esm.min.js"
import { abi } from "./constants/abi.js"
import { contractAddress } from "./constants/address.js"

import tokenAbi from "./constants/tokenAbi.json" assert { type: "json" }
import { tokenAddress } from "./constants/tokenAddress2.js"

const connectButton = document.getElementById("connectButton")
connectButton.onclick = connect
const endData = document.getElementById("enddate")
const alreadyEnded = document.getElementById("enddate2")
const goalData = document.getElementById("goal")
const pledgeButton = document.getElementById("pledgeButton")
pledgeButton.onclick = pledge
const pledgeamount = document.getElementById("pledgeamount")
const divpledge = document.getElementById("divpledge")
// const divtoken = document.getElementById("divtoken")
// const addButton = document.getElementById("addButton")
// addButton.onclick = addToken
const divWithdraw = document.getElementById("divWithdraw")
const withdrawButton = document.getElementById("withdrawButton")
withdrawButton.onclick = withdraw
const divRefund = document.getElementById("divRefund")
const refundButton = document.getElementById("refundButton")
refundButton.onclick = getRefund
const divV2 = document.getElementById("divV2")
const topamount = document.getElementById("topamount")
const address = document.getElementById("address")

let goalAmount = 0
let pledgeAmount = 0
let refundAmount = 0
let campaignEnded = false

window.ethereum.on("accountsChanged", function (accounts) {
    location.reload()
})
async function connect() {
    if (typeof window.ethereum !== "undefined") {
        try {
            await ethereum.request({ method: "eth_requestAccounts" })
        } catch (error) {
            console.log(error)
        }
        connectButton.innerHTML = "Connected"
        const accounts = await ethereum.request({ method: "eth_accounts" })
    } else {
        connectButton.innerHTML = "Please install MetaMask"
    }
}

async function withdraw() {
    if (typeof window.ethereum !== "undefined") {
        const provider = new ethers.providers.Web3Provider(window.ethereum)
        const signer = provider.getSigner()
        const contract = new ethers.Contract(contractAddress, abi, signer)
        try {
            const transactionResponse = await contract.withdraw(
                ethers.utils.parseEther(pledgeAmount.toString())
            )
            await listenForTransactionMine(transactionResponse, provider)
            location.reload()
        } catch (error) {
            console.log(error)
        }
    }
}
async function getRefund() {
    if (typeof window.ethereum !== "undefined") {
        const provider = new ethers.providers.Web3Provider(window.ethereum)
        const signer = provider.getSigner()
        const contract = new ethers.Contract(contractAddress, abi, signer)
        try {
            const transactionResponse = await contract.refund(refundAmount.toString())
            await listenForTransactionMine(transactionResponse, provider)
            location.reload()
        } catch (error) {
            console.log(error)
        }
    }
}
function listenForTransactionMine(transactionResponse, provider) {
    return new Promise((resolve, reject) => {
        try {
            provider.once(transactionResponse.hash, (transactionReceipt) => {
                //console.log(transactionResponse.hash)
                resolve()
            })
        } catch (error) {
            reject(error)
        }
    })
}
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
async function getEndDate() {
    if (typeof window.ethereum !== "undefined") {
        const provider = new ethers.providers.Web3Provider(window.ethereum)
        const signer = provider.getSigner()
        const contract = new ethers.Contract(contractAddress, abi, signer)
        try {
            let eDate = await contract.getEDate()
            let date = new Date(Number(eDate) * 1000)
            endData.innerHTML = date.toLocaleString()
            const now = new Date().getTime() / 1000
            if (now >= eDate) {
                updateEndCampaign()
            }
        } catch (error) {
            console.log(error)
        }
    }
}
//divWithdraw.style.display = "block"
async function updateEndCampaign() {
    campaignEnded = true
    // divtoken.style.display = "none"
    divpledge.style.display = "none"
    alreadyEnded.innerHTML = "Campaign Already Ended"
    const provider = new ethers.providers.Web3Provider(window.ethereum)
    const signer = provider.getSigner()
    const account = await signer.getAddress()
    if (goalAmount <= pledgeAmount) {
        if (owner == account) {
            divWithdraw.style.display = "block"
        }
    } else {
        const amount = await getRefundAmount()
        if (amount > 0) {
            refundAmount = amount
            divRefund.style.display = "block"
        }
    }
}
async function getGoal() {
    if (typeof window.ethereum !== "undefined") {
        const provider = new ethers.providers.Web3Provider(window.ethereum)
        const signer = provider.getSigner()
        const contract = new ethers.Contract(contractAddress, abi, signer)
        try {
            let data = await contract.getGoal()
            goalData.innerHTML = data.toString()
            goalAmount = parseInt(data.toString())
        } catch (error) {
            console.log(error)
        }
    }
}
async function pledge() {
    const amount = document.getElementById("amount").value
    if (typeof window.ethereum !== "undefined") {
        const provider = new ethers.providers.Web3Provider(window.ethereum)
        const signer = provider.getSigner()
        const contract = new ethers.Contract(contractAddress, abi, signer)
        const ftoken = new ethers.Contract(tokenAddress, tokenAbi, signer)

        try {
            console.log(pledgeButton.innerHTML)
            if (pledgeButton.innerHTML == "Approve") {
                const approveTx = await ftoken.approve(
                    contractAddress,
                    ethers.utils.parseEther(amount.toString())
                )
                await approveTx.wait()
                await listenForTransactionMine(approveTx, provider)
                pledgeButton.innerHTML = "Pledge"
            }
            if (pledgeButton.innerHTML == "Pledge") {
                console.log(pledgeButton.innerHTML)
                const bal = await getContractAllowance()
                if (bal > 0) {
                    console.log(bal)
                    const transactionResponse = await contract.pledge(
                        ethers.utils.parseEther(amount.toString())
                    )
                    await listenForTransactionMine(transactionResponse, provider)
                    location.reload()
                }
            }
        } catch (error) {
            console.log(error)
        }
    }
}

async function getOwner() {
    if (typeof window.ethereum !== "undefined") {
        try {
            const provider = new ethers.providers.Web3Provider(window.ethereum)
            const signer = provider.getSigner()
            const ftoken = new ethers.Contract(tokenAddress, tokenAbi, signer)
            let t_owner = await ftoken.owner()
            return t_owner.toString()
        } catch (error) {
            console.log(error)
        }
    }
}

async function getPledgeAmount() {
    if (typeof window.ethereum !== "undefined") {
        const provider = new ethers.providers.Web3Provider(window.ethereum)
        const signer = provider.getSigner()
        const contract = new ethers.Contract(contractAddress, abi, signer)

        try {
            let amount = await contract.getPledgeAmount()
            amount = ethers.utils.formatEther(amount.toString())
            pledgeamount.innerHTML = parseInt(amount)
            pledgeAmount = parseInt(amount)
        } catch (error) {
            console.log(error)
        }
    }
}
async function getBalance() {
    //const amount = document.getElementById("token").value
    let allowance = 0
    if (typeof window.ethereum !== "undefined") {
        const provider = new ethers.providers.Web3Provider(window.ethereum)
        const signer = provider.getSigner()
        const account = await signer.getAddress()
        const ftoken = new ethers.Contract(tokenAddress, tokenAbi, signer)

        try {
            const balance = await ftoken.balanceOf(account)
            console.log(campaignEnded)
            console.log(balance.toString())
            if (!campaignEnded) {
                if (balance.toString() > 0 && owner != account) {
                    divpledge.style.display = "block"
                } else {
                    divpledge.style.display = "none"
                }
            }
        } catch (error) {
            console.log(error)
        }
    }
}

async function getRefundAmount() {
    if (typeof window.ethereum !== "undefined") {
        const provider = new ethers.providers.Web3Provider(window.ethereum)
        const signer = provider.getSigner()
        const contract = new ethers.Contract(contractAddress, abi, signer)
        try {
            const amount = await contract.getRefundAmount()
            return amount
        } catch (error) {
            console.log(error)
        }
    }
}

async function getVersion() {
    if (typeof window.ethereum !== "undefined") {
        const provider = new ethers.providers.Web3Provider(window.ethereum)
        const signer = provider.getSigner()
        const contract = new ethers.Contract(contractAddress, abi, signer)
        try {
            const ver = await contract.getVer()
            if (ver.toString()) {
                const amountAr = await contract.getTopPledger()
                if (amountAr[1].toString() > 0) {
                    divV2.style.display = "block"
                    const amount = ethers.utils.formatEther(amountAr[1].toString())
                    topamount.innerHTML = parseFloat(amount).toFixed(2)
                    address.innerHTML = amountAr[0]
                }
            }
        } catch (error) {}
    }
}
async function getContractAllowance() {
    if (typeof window.ethereum !== "undefined") {
        const provider = new ethers.providers.Web3Provider(window.ethereum)
        const signer = provider.getSigner()
        const contract = new ethers.Contract(contractAddress, abi, signer)
        try {
            const balance = await contract.balanceOf()
            return balance.toString()
            //console.log(`allowance ${}`)
        } catch (error) {
            console.log(error)
        }
    }
}
const owner = await getOwner()
const allowance = await getContractAllowance()
console.log(allowance)
if (allowance > 0) {
    pledgeButton.innerHTML = "Pledge"
}
getPledgeAmount()
getBalance()
getGoal()
getEndDate()
getVersion()
