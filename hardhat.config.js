require("@openzeppelin/hardhat-upgrades");

const fs = require("fs");

const argv = require("minimist")(process.argv.slice(2));
const env = require("./env.json")[argv.network];

const secret = JSON.parse(fs.readFileSync(".secret"));
secret.testnet = Array.isArray(secret.testnet) ? secret.testnet : [secret.testnet];
secret.mainnet = Array.isArray(secret.mainnet) ? secret.mainnet : [secret.mainnet];

/**
 * Contract deployment task
 */
task("deployNFT", "Deploy NFT Contract").setAction(async () => {
  const [deployer] = await ethers.getSigners();

  console.log("Deploying contracts with the account:", deployer.address);
  console.log("Account balance:", (await deployer.getBalance()).toString());

  const contractFileName = "TestNFT";

  console.log(`Deploying ${contractFileName}...`);

  const Contract = await ethers.getContractFactory(contractFileName);
  const nft = await Contract.deploy("2048", "2048", "https://devault-metadata.s3.ap-northeast-1.amazonaws.com/2048/");
  await nft.deployed();
  console.log("NFT deployed to:", nft.address);

  fs.writeFileSync(`test/deployed-nft-${argv.network}.json`, JSON.stringify({ address: nft.address }));
});

/**
 * Deploy ERC20 token
 */
task('deployToken', 'Deploy ERC20 token')
  .setAction(async () => {
    const [deployer] = await ethers.getSigners();

    console.log('Deploying contracts with the account:', deployer.address);
    console.log('Account balance:', (await deployer.getBalance()).toString());

    const Contract = await ethers.getContractFactory('TestToken');
    
    const token = await Contract.deploy("De-vault Money", "DVLT");
    await token.deployed();
    console.log(`Contract address:`, token.address);

    fs.writeFileSync(`test/deployed-erc20-${argv.network}.json`, JSON.stringify({ address: token.address }));
  });

/**
 * @type import('hardhat/config').HardhatUserConfig
 */
module.exports = {
  networks: {
    dev: {
      url: "http://localhost:8545",
      accounts: [
        "0x4f3edf983ac636a65a842ce7c78d9aa706d3b113bce9c46f30d7d21715b23b1d",
        "0x6cbed15c793ce57650b9877cf6fa156fbef513c4e6134f022a85b1ffdd59b2a1",
        "0x6370fd033278c143179d81c5526140625662b8daa446c22ee2d73db3707e620c",
        "0x646f1ce2fdad0e6deeeb5c7e8e5543bdde65e86029e2fd9fc169899c440a7913",
        "0xadd53f9a7e588d003326d1cbf9e4a43c061aadd9bc938c843a79e7b4fd2ad743",
        "0x395df67f0c2d2d9fe1ad08d1bc8b6627011959b79c53d7dd6a3536a33ab8a4fd",
        "0xe485d098507f54e7733a205420dfddbe58db035fa577fc294ebd14db90767a52",
        "0xa453611d9419d0e56f499079478fd72c37b251a94bfde4d19872c44cf65386e3",
        "0x829e924fdf021ba3dbbc4225edfece9aca04b929d6e75613329ca6f1d31c0bb4",
        "0xb0057716d5917badaf911b193b12b910811c1497b5bada8d7711f758981c3773",
      ]
    },
    testnet: {
      url: "https://matic-mumbai.chainstacklabs.com",
      accounts: secret.testnet,
      chainId: 80001
    },
    mainnet: {
      url: "https://bsc-dataseed1.binance.org",
      accounts: secret.mainnet,
      chainId: 56
    },

    // Reserved
    bscTest: {
      url: "https://data-seed-prebsc-1-s1.binance.org:8545",
      accounts: secret.testnet,
      chainId: 97
    },

    rinkeby: {
      url: "https://rinkeby.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161",
      accounts: secret.testnet,
      chainId: 4
    },

    ropsten: {
      url: "https://ropsten.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161",
      accounts: secret.testnet,
      chainId: 3
    },
    
    mumbai: {
      url: "https://rpc-mumbai.matic.today",
      accounts: secret.testnet,
      chainId: 80001
    }
  },
  mocha: {
    timeout: 1000000
  },
  solidity: {
    version: "0.8.9",
    settings: {
      optimizer: {
        enabled: true,
        runs: 200
      }
    }
  }
};
