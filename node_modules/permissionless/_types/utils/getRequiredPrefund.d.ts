import type { UserOperation } from "../types";
export type GetRequiredPrefundReturnType = {
    userOperation: UserOperation;
};
/**
 *
 * Returns the minimum required funds in the senders's smart account to execute the user operation.
 *
 * @param arags: {userOperation} as {@link UserOperation}
 * @returns requiredPrefund as {@link bigint}
 *
 * @example
 * import { getRequiredPrefund } from "permissionless/utils"
 *
 * const requiredPrefund = getRequiredPrefund({
 *     userOperation
 * })
 */
export declare const getRequiredPrefund: ({ userOperation }: GetRequiredPrefundReturnType) => bigint;
//# sourceMappingURL=getRequiredPrefund.d.ts.map