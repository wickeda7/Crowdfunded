## Quickstart

```
git clone https://github.com/wickeda7/Crowdfunded.git
cd Crowdfunded
yarn
```
# Useage

Deploy:

```
yarn hardhat deploy
yarn hardhat run scripts/01-upgradeV1.js : this will add the  Funding goal and end date
Install Live Server to VScode to view frontend http://127.0.0.1:5500/frontend/
Copy the custom token address and import to your deployed account.
From your deployed account send the custom token to other accounts to pledge

```
Upgradeable contract:

```
yarn hardhat deploy scripts/03-deployCampaignV2.js : Added a method to view the top pledge amount
yarn hardhat run scripts/02-upgradeV2.js : this will add the new Funding goal and end date (optional) and upgrade to V2.

```

## Testing

```
yarn hardhat test
```

# Deployment to a testnet or mainnet

1. Setup environment variabltes

You'll want to set your `GOERLI_RPC_URL` and `ACCOUNT` as environment variables. You can add them to a `.env` file, similar to what you see in `.env.sample`.

- `ACCOUNT`: The private key of your account (like from [metamask](https://metamask.io/)). **NOTE:** FOR DEVELOPMENT, PLEASE USE A KEY THAT DOESN'T HAVE ANY REAL FUNDS ASSOCIATED WITH IT.
  - You can [learn how to export it here](https://metamask.zendesk.com/hc/en-us/articles/360015289632-How-to-Export-an-Account-Private-Key).
- `GOERLI_RPC_URL`: This is url of the goerli testnet node you're working with. You can get setup with one for free from [Alchemy](https://alchemy.com/?a=673c802981)
- `ETHERSCAN_API_KEY`: Verify on etherscan
- `GOAL`: Funding goal
- `END_DATE`: Funding end date in unix timestamp new Date().getTime() / 1000
