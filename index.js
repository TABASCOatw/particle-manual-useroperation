const axios = require('axios');
const { ethers } = require('ethers');
const { createPublicClient, http } = require('viem');
const { getSenderAddress, signUserOperationHashWithECDSA } = require('permissionless');
const { privateKeyToAccount } = require('viem/accounts');
const { goerli } = require('viem/chains');

const axiosBundlerClient = axios.create({
  baseURL: `https://bundler.particle.network?chainId=5`
});

const axiosPaymasterClient = axios.create({
  baseURL: `https://paymaster.particle.network/?chainId=5&projectUuid=${process.env.PARTICLE_PROJECT_ID}&projectKey=${process.env.PARTICLE_SERVER_KEY}`
});

const getUserOperationGasPrice = async (userOperation, entryPoint) => {
  const response = await axiosBundlerClient.post('', {
    jsonrpc: "2.0",
    method: "eth_estimateUserOperationGas",
    params: [userOperation, entryPoint],
    id: 1
  });
  return response.data.result;
};

const sponsorUserOperation = async (userOperation, entryPoint) => {
  const response = await axiosPaymasterClient.post('', {
    jsonrpc: "2.0",
    method: "pm_sponsorUserOperation",
    params: [userOperation, entryPoint],
    id: 1
  });
  return response.data.result;
};

const sendUserOperation = async (userOperation, entryPoint) => {
  const response = await axiosBundlerClient.post('', {
    jsonrpc: "2.0",
    method: "eth_sendUserOperation",
    params: [userOperation, entryPoint],
    id: 1
  });
  return response.data.result;
};

const executeUserOp = async () => {
  const wallet = ethers.Wallet.createRandom();
  const publicAddress = wallet.address;

  const entryPoint = "0x5FF137D4b0FDCD49DcA30c7CF57E578a026d2789";
  const factoryAddress = "0x9406Cc6185a346906296840746125a0E44976454";
  const chain = goerli;

  const owner = privateKeyToAccount(wallet.privateKey);

  const publicClient = createPublicClient({
    transport: http("https://rpc.ankr.com/eth_goerli"),
    chain
  });

  const factoryInterface = new ethers.utils.Interface([{
    inputs: [{ name: "owner", type: "address" }, { name: "salt", type: "uint256" }],
    name: "createAccount",
    outputs: [{ name: "ret", type: "address" }],
    stateMutability: "nonpayable",
    type: "function",
  }]);

  const encodedFunctionData = factoryInterface.encodeFunctionData("createAccount", [publicAddress, 0]);
  const initCode = factoryAddress + encodedFunctionData.substring(2);
  const address = await getSenderAddress(publicClient, { initCode, entryPoint });

  console.log(address);

  const nonce = ethers.utils.hexlify(await publicClient.getTransactionCount({ address }));

  const account = new ethers.utils.Interface(["function execute(address to, uint256 value, bytes data)"]);
  const callData = account.encodeFunctionData("execute", ["0x000000000000000000000000000000000000dEaD", ethers.utils.parseUnits('0', 'ether'), "0x"]);

  let userOperation = {
    sender: address,
    nonce,
    initCode,
    callData,
    signature: "0xfffffffffffffffffffffffffffffff0000000000000000000000000000000007aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa1c"
  };

  const gasPrice = await getUserOperationGasPrice(userOperation, entryPoint);

  userOperation = { ...userOperation, ...gasPrice };

  const sponsorResult = await sponsorUserOperation(userOperation, entryPoint);

  userOperation = { ...userOperation, ...sponsorResult };

  userOperation.signature = await signUserOperationHashWithECDSA({
    account: owner,
    userOperation,
    chainId: chain.id,
    entryPoint
  });

  const userOperationHashResult = await sendUserOperation(userOperation, entryPoint);

  console.log("User operation successful. Hash:", userOperationHashResult);
};

executeUserOp().catch(console.error);
