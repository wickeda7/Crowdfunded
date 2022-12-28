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
