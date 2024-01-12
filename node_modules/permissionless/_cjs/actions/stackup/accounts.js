"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.accounts = void 0;
const accounts = async (client, { entryPoint }) => {
    const response = await client.request({
        method: "pm_accounts",
        params: [entryPoint]
    });
    return response;
};
exports.accounts = accounts;
//# sourceMappingURL=accounts.js.map