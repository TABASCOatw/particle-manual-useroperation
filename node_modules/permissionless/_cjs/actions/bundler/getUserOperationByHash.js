"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUserOperationByHash = void 0;
const getUserOperationByHash = async (client, { hash }) => {
    const params = [hash];
    const response = await client.request({
        method: "eth_getUserOperationByHash",
        params
    });
    if (!response)
        return null;
    const { userOperation, entryPoint, transactionHash, blockHash, blockNumber } = response;
    return {
        userOperation: {
            ...userOperation,
            nonce: BigInt(userOperation.nonce),
            callGasLimit: BigInt(userOperation.callGasLimit),
            verificationGasLimit: BigInt(userOperation.verificationGasLimit),
            preVerificationGas: BigInt(userOperation.preVerificationGas),
            maxFeePerGas: BigInt(userOperation.maxFeePerGas),
            maxPriorityFeePerGas: BigInt(userOperation.maxPriorityFeePerGas)
        },
        entryPoint: entryPoint,
        transactionHash: transactionHash,
        blockHash: blockHash,
        blockNumber: BigInt(blockNumber)
    };
};
exports.getUserOperationByHash = getUserOperationByHash;
//# sourceMappingURL=getUserOperationByHash.js.map