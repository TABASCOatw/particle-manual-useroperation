"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getRequiredPrefund = void 0;
const getRequiredPrefund = ({ userOperation }) => {
    const multiplier = userOperation.paymasterAndData.length > 2 ? 3n : 1n;
    const requiredGas = userOperation.callGasLimit +
        userOperation.verificationGasLimit * multiplier +
        userOperation.preVerificationGas;
    return BigInt(requiredGas) * BigInt(userOperation.maxFeePerGas);
};
exports.getRequiredPrefund = getRequiredPrefund;
//# sourceMappingURL=getRequiredPrefund.js.map