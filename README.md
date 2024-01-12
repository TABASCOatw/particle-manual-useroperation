<div align="center">
  <a href="https://particle.network/">
    <img src="https://i.imgur.com/xmdzXU4.png" />
  </a>
  <h3>
    Particle Bundler & Paymaster Manual UserOp Construction
  </h3>
</div>

⚡️ This Node.js script constructs a manually UserOperation (without library assistance, such as is present within Particle's AA SDK), sponsors it with Particle Network's Omnichain Paymaster, and executes it with Particle Network's Bundler. Specifically, this sample UserOperation contains a 0 value transaction to `0x000000000000000000000000000000000000dEaD` alongside a deployment of the associated SimpleAccount instance.

Built using **Ethers**, **axios**, **permissionless**, **viem**.

## 🖥️ Particle Bundler
The Particle Bundler is a high-performance, stable bundler implementation (written in TypeScript) that has serviced over 2 million UserOperations across the ecosystem.

## 💰 Particle Omnichain Paymaster
The Particle Omnichain Paymaster is Particle Network's in-house paymaster capable of accepting deposits of USDT on Ethereum or BNB Chain, then automatically converting this USDT to the native token of any supported EVM chain upon sponsorship.

##

👉 Try Particle Network's Smart Wallet-as-a-Service: https://core-demo.particle.network

👉 Learn more about Particle Network: https://particle.network

## 🛠️ Quickstart

### Clone this repository
```
git clone https://github.com/TABASCOatw/particle-manual-useroperation.git
```

### Install dependencies
```
yarn install
```
OR
```
npm install
```

### Set environment variables
This project requires a number of keys from Particle Network to be defined in `.env`. The following should be defined:
- `PARTICLE_PROJECT_ID`, the ID of the corresponding project in your [Particle Network dashboard](https://dashboard.particle.network/#/applications).
- `PARTICLE_SERVER_KEY`, the server key of the corresponding project in your [Particle Network dashboard](https://dashboard.particle.network/#/applications).


### Sources

Credit to Pimlico for their work with permissionless and it's documentation (https://docs.pimlico.io/permissionless), it was a major help in producing this script.