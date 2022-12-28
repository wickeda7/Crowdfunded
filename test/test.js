const { network, deployments, ethers } = require("hardhat")
const { assert, expect } = require("chai")

describe("CrowdFunded", function () {
    let deployer, account, erc20, crowdFunded, transparentProxy, proxy, proxyAdmin
    let now = new Date().getTime() / 1000
    let endDate = now + 500 /// around 10 mins
    //let endDate = now - 10
    const amount = ethers.utils.parseEther("7")

    let pledgedAmount = 0
    let addressToAmountFunded = []
    let funders = []
    const goal = 22
    beforeEach(async () => {
        const [acc, acc1, acc2, acc3] = await ethers.getSigners()
        deployer = acc
        account = acc1
        erc20 = await ethers.getContract("FundToken", deployer)
        await deployments.fixture(["all"])

        crowdFunded = await ethers.getContract("CrowdFunded")
        transparentProxy = await ethers.getContract("CrowdFunded_Proxy")
        proxy = await ethers.getContractAt("CrowdFunded", transparentProxy.address)
        await deployments.fixture(["all"])
        // proxyAdmin = await ethers.getContract("CrowdFundedProxyAdmin")

        ////////////////
        await proxy.store(goal, parseInt(endDate), erc20.address)
        const transferTx = await erc20.transfer(account.address, amount)
        await transferTx.wait()
        const erc20WithSigner = erc20.connect(account)
        // const approve = await erc20WithSigner.approve(proxy.address, amount)
        // await approve.wait()
        const approveTx = await erc20.approve(proxy.address, amount)
        await approveTx.wait()
        await proxy.pledge(amount)
        ////////////////
    })
    describe("CrowdFunded methods", function () {
        it("check store values", async function () {
            await proxy.store(goal, parseInt(endDate), erc20.address)
            const p_goal = await proxy.getGoal()
            assert.equal(p_goal, goal)
            const p_endDate = await proxy.getEDate()
            assert.equal(p_endDate, parseInt(endDate))
        })
        it("check balance transfer token for  account", async function () {
            const bal = await erc20.balanceOf(account.address)
            assert.equal(bal.toString(), amount)
        })

        it("Withdraw pledge contract amount = 0", async function () {
            let endDate = now - 500
            await proxy.store(3, parseInt(endDate), erc20.address)
            const p_amount = await proxy.getPledgeAmount()
            await proxy.withdraw(p_amount)
            const p_amount2 = await proxy.getPledgeAmount()
            assert.equal(p_amount2.toString(), 0)
        })
    })
})
describe("Upgrading CrowdFunded", function () {
    let crowdFunded, transparentProxy, proxyCrowdFunded, crowdFundedProxyAdmin
    beforeEach(async () => {
        await deployments.fixture(["crowdFunded"])
        crowdFunded = await ethers.getContract("CrowdFunded")
        transparentProxy = await ethers.getContract("CrowdFunded_Proxy")
        proxyCrowdFunded = await ethers.getContractAt("CrowdFunded", transparentProxy.address)
        crowdFundedProxyAdmin = await ethers.getContract("CrowdFundedProxyAdmin")
    })
    it("can deploy and upgrade a contract", async function () {
        await deployments.fixture(["crowdFundedV2"])
        const crowdFundedV2 = await ethers.getContract("CrowdFundedV2")
        const upgradeTx = await crowdFundedProxyAdmin.upgrade(
            transparentProxy.address,
            crowdFundedV2.address
        )
        await upgradeTx.wait(1)
        const endingVersion = await proxyCrowdFunded.getVer()
        assert.equal(endingVersion.toString(), "2")
    })
})
