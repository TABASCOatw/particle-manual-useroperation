"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUserOperationGasPrice = void 0;
const getUserOperationGasPrice = async (client) => {
    const gasPrices = await client.request({
        method: "pimlico_getUserOperationGasPrice",
        params: []
    });
    return {
        slow: {
            maxFeePerGas: BigInt(gasPrices.slow.maxFeePerGas),
            maxPriorityFeePerGas: BigInt(gasPrices.slow.maxPriorityFeePerGas)
        },
        standard: {
            maxFeePerGas: BigInt(gasPrices.standard.maxFeePerGas),
            maxPriorityFeePerGas: BigInt(gasPrices.standard.maxPriorityFeePerGas)
        },
        fast: {
            maxFeePerGas: BigInt(gasPrices.fast.maxFeePerGas),
            maxPriorityFeePerGas: BigInt(gasPrices.fast.maxPriorityFeePerGas)
        }
    };
};
exports.getUserOperationGasPrice = getUserOperationGasPrice;
//# sourceMappingURL=getUserOperationGasPrice.js.map