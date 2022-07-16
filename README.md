# Setup
Copy `.secret.template` to `.secret` and fill in private keys of wallets required for deployment. NEVER share these keys unless you truly understand the risks.

# Compile
Run `yarn flatten` first to merge Solidity sources.
Run `yarn compile` to compile the contracts.

# Testing
Run `yarn dev` to start ganache dev blockchain
Run `yarn test` to do the tests

# Deploy
Run `yarn deploy:<network name>`

# Deposit additional MEI Token
Run `npx hardhat deposit --network testnet --address "7770A8f14eFd19749128B36Baba2307faF1D2829" --amount "100000"`

# Faucet
BSC Testnet: https://testnet.binance.org/faucet-smart
