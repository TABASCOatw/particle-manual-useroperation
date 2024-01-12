import { transactionReceiptStatus } from "../../utils/deepHexlify.js";
/**
 * Returns the user operation receipt from userOpHash
 *
 * - Docs: https://docs.pimlico.io/permissionless/reference/bundler-actions/getUserOperationReceipt
 *
 * @param client {@link BundlerClient} that you created using viem's createClient and extended it with bundlerActions.
 * @param args {@link GetUserOperationReceiptParameters} UserOpHash that was returned by {@link sendUserOperation}
 * @returns user operation receipt {@link GetUserOperationReceiptReturnType} if found or null
 *
 *
 * @example
 * import { createClient } from "viem"
 * import { getUserOperationReceipt } from "permissionless/actions"
 *
 * const bundlerClient = createClient({
 *      chain: goerli,
 *      transport: http(BUNDLER_URL)
 * })
 *
 * getUserOperationReceipt(bundlerClient, {hash: userOpHash})
 *
 */
export const getUserOperationReceipt = async (client, { hash }) => {
    const params = [hash];
    const response = await client.request({
        method: "eth_getUserOperationReceipt",
        params
    });
    if (!response)
        return null;
    const userOperationReceipt = {
        userOpHash: response.userOpHash,
        sender: response.sender,
        nonce: BigInt(response.nonce),
        actualGasUsed: BigInt(response.actualGasUsed),
        actualGasCost: BigInt(response.actualGasCost),
        success: response.success,
        receipt: {
            transactionHash: response.receipt.transactionHash,
            transactionIndex: BigInt(response.receipt.transactionIndex),
            blockHash: response.receipt.blockHash,
            blockNumber: BigInt(response.receipt.blockNumber),
            from: response.receipt.from,
            to: response.receipt.to,
            cumulativeGasUsed: BigInt(response.receipt.cumulativeGasUsed),
            status: transactionReceiptStatus[response.receipt.status],
            gasUsed: BigInt(response.receipt.gasUsed),
            contractAddress: response.receipt.contractAddress,
            logsBloom: response.receipt.logsBloom,
            effectiveGasPrice: BigInt(response.receipt.effectiveGasPrice)
        },
        logs: response.logs.map((log) => ({
            data: log.data,
            blockNumber: BigInt(log.blockNumber),
            blockHash: log.blockHash,
            transactionHash: log.transactionHash,
            logIndex: BigInt(log.logIndex),
            transactionIndex: BigInt(log.transactionIndex),
            address: log.address,
            topics: log.topics
        }))
    };
    return userOperationReceipt;
};
//# sourceMappingURL=getUserOperationReceipt.js.map