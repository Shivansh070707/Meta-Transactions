import { HardhatUserConfig } from 'hardhat/config';
import '@nomicfoundation/hardhat-toolbox';
import 'solidity-coverage';

import 'hardhat-contract-sizer';
import * as dotenv from 'dotenv';
dotenv.config();
const { ALCHEMY_API_KEY, POLYGON_API_KEY, TESTNET } = process.env;

/** @type import('hardhat/config').HardhatUserConfig */
const config: HardhatUserConfig = {
  solidity: {
    compilers: [
      {
        version: '0.8.17',
        settings: {
          optimizer: {
            enabled: true,
            runs: 1000,
          },
        },
      },
    ],
  },
  mocha: {
    timeout: 100000000,
  },
  networks: {
    hardhat: {
      forking: {
        url: `https://polygon-mainnet.g.alchemy.com/v2/${ALCHEMY_API_KEY}`,
        blockNumber: 16139820,
      },
    },
    Mumbai: {
      url: `https://polygon-mumbai.g.alchemy.com/v2/${TESTNET}`,

      chainId: 80001,
    },
    'truffle-dashboard': {
      url: 'http://localhost:24012/rpc',
    },
  },
  etherscan: {
    apiKey: {
      polygonMumbai: POLYGON_API_KEY,
    },
  },

  contractSizer: {
    alphaSort: true,
    disambiguatePaths: false,
    runOnCompile: false,
    strict: true,
    only: [],
  },
};
export default config;
