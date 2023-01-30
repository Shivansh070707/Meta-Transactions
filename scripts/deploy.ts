import {
  DefenderRelayProvider,
  DefenderRelaySigner,
} from 'defender-relay-client/lib/ethers';
import { ethers } from 'hardhat';
import { writeFileSync } from 'fs';

async function main() {
  require('dotenv').config();
  const credentials = {
    apiKey: process.env.RELAYER_API_KEY,
    apiSecret: process.env.RELAYER_SECRET_KEY,
  };
  const provider = new DefenderRelayProvider(credentials);
  const relaySigner = new DefenderRelaySigner(credentials, provider, {
    speed: 'fast',
  });

  const Forwarder = await ethers.getContractFactory('MinimalForwarder');
  const forwarder = await Forwarder.connect(relaySigner)
    .deploy()
    .then((f) => f.deployed());

  const Registry = await ethers.getContractFactory('Registry');
  const registry = await Registry.connect(relaySigner)
    .deploy(forwarder.address)
    .then((f) => f.deployed());

  writeFileSync(
    'deploy.json',
    JSON.stringify(
      {
        MinimalForwarder: forwarder.address,
        Registry: registry.address,
      },
      null,
      2
    )
  );

  console.log(
    `MinimalForwarder: ${forwarder.address}\nRegistry: ${registry.address}`
  );
}

if (require.main === module) {
  main()
    .then(() => process.exit(0))
    .catch((error) => {
      console.error(error);
      process.exit(1);
    });
}
