const HDWalletProvider = require('@truffle/hdwallet-provider');
require('dotenv').config();

module.exports = {
  networks: {
    development: {
      host: "127.0.0.1", // Update to localhost or 127.0.0.1
      port: 7545,
      network_id: "*",
      gas: 6721975, // Update gas limit to match Ganache
      gasPrice: 20000000000, // Keep gas price as is
    },
    mumbai_testnet: {
      provider: () => new HDWalletProvider(process.env.PRIVATE_KEY, process.env.API_URL),
      network_id: 80001,
      confirmations: 2,
      timeoutBlocks: 200,
      skipDryRun: true
    },
    polygon_mainnet: {
      provider: () => new HDWalletProvider(process.env.PRIVATE_KEY_POLYGON, process.env.API_URL_POLYGON),
      network_id: 137,
      confirmations: 4,
      timeoutBlocks: 300,
      skipDryRun: true,
      gasPrice: 140000000000, // Keep gas price as is
      gas: 6721975, // Update gas limit to match Polygon mainnet
    }
  },
  compilers: {
    solc: {
      version: "0.8.18",
      settings: {
        optimizer: {
          enabled: true,
          runs: 200
        }
      }
    },
  },
  plugins: [
    'truffle-plugin-verify'
  ],
  api_keys: {
    polygonscan: process.env.POLYGONSCAN_API_KEY
  },
  contracts_build_directory: './build/contracts',
};
