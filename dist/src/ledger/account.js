"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAccountBalance = exports.getAllAccounts = exports.getAccountsByCustomerId = exports.unfreezeAccount = exports.freezeAccount = exports.deactivateAccount = exports.activateAccount = exports.deleteBlockedAmountForAccount = exports.deleteBlockedAmount = exports.blockAmount = exports.getBlockedAmountsByAccountId = exports.createAccounts = exports.createAccount = exports.getAccountById = void 0;
const axios_1 = __importDefault(require("axios"));
const class_validator_1 = require("class-validator");
const constants_1 = require("../constants");
/**
 * For more details, see <a href="https://tatum.io/apidoc#operation/getAccountByAccountId" target="_blank">Tatum API documentation</a>
 */
exports.getAccountById = async (id) => {
    return (await axios_1.default.get(`${process.env.TATUM_API_URL || constants_1.TATUM_API_URL}/v3/ledger/account/${id}`, { headers: { 'x-api-key': process.env.TATUM_API_KEY } })).data;
};
/**
 * For more details, see <a href="https://tatum.io/apidoc#operation/createAccount" target="_blank">Tatum API documentation</a>
 */
exports.createAccount = async (account) => {
    await class_validator_1.validateOrReject(account);
    return (await axios_1.default.post(`${process.env.TATUM_API_URL || constants_1.TATUM_API_URL}/v3/ledger/account`, account, { headers: { 'x-api-key': process.env.TATUM_API_KEY } })).data;
};
/**
 * For more details, see <a href="https://tatum.io/apidoc#operation/createAccountBatch" target="_blank">Tatum API documentation</a>
 */
exports.createAccounts = async (accounts) => {
    await class_validator_1.validateOrReject(accounts);
    return (await axios_1.default.post(`${process.env.TATUM_API_URL || constants_1.TATUM_API_URL}/v3/ledger/account/batch`, accounts, { headers: { 'x-api-key': process.env.TATUM_API_KEY } })).data;
};
/**
 * For more details, see <a href="https://tatum.io/apidoc#operation/getBlockAmount" target="_blank">Tatum API documentation</a>
 */
exports.getBlockedAmountsByAccountId = async (id, pageSize = 50, offset = 0) => {
    return (await axios_1.default.get(`${process.env.TATUM_API_URL || constants_1.TATUM_API_URL}/v3/ledger/account/block/${id}?pageSize=${pageSize}&offset=${offset}`, { headers: { 'x-api-key': process.env.TATUM_API_KEY } })).data;
};
/**
 * For more details, see <a href="https://tatum.io/apidoc#operation/blockAmount" target="_blank">Tatum API documentation</a>
 */
exports.blockAmount = async (id, block) => {
    await class_validator_1.validateOrReject(block);
    return (await axios_1.default.post(`${process.env.TATUM_API_URL || constants_1.TATUM_API_URL}/v3/ledger/account/block/${id}`, block, { headers: { 'x-api-key': process.env.TATUM_API_KEY } })).data;
};
/**
 * For more details, see <a href="https://tatum.io/apidoc#operation/deleteBlockAmount" target="_blank">Tatum API documentation</a>
 */
exports.deleteBlockedAmount = async (id) => {
    await axios_1.default.delete(`${process.env.TATUM_API_URL || constants_1.TATUM_API_URL}/v3/ledger/account/block/${id}`, { headers: { 'x-api-key': process.env.TATUM_API_KEY } });
};
/**
 * For more details, see <a href="https://tatum.io/apidoc#operation/deleteAllBlockAmount" target="_blank">Tatum API documentation</a>
 */
exports.deleteBlockedAmountForAccount = async (id) => {
    await axios_1.default.delete(`${process.env.TATUM_API_URL || constants_1.TATUM_API_URL}/v3/ledger/account/block/account/${id}`, { headers: { 'x-api-key': process.env.TATUM_API_KEY } });
};
/**
 * For more details, see <a href="https://tatum.io/apidoc#operation/activateAccount" target="_blank">Tatum API documentation</a>
 */
exports.activateAccount = async (id) => {
    await axios_1.default.put(`${process.env.TATUM_API_URL || constants_1.TATUM_API_URL}/v3/ledger/account/${id}/activate`, undefined, { headers: { 'x-api-key': process.env.TATUM_API_KEY } });
};
/**
 * For more details, see <a href="https://tatum.io/apidoc#operation/deactivateAccount" target="_blank">Tatum API documentation</a>
 */
exports.deactivateAccount = async (id) => {
    await axios_1.default.put(`${process.env.TATUM_API_URL || constants_1.TATUM_API_URL}/v3/ledger/account/${id}/deactivate`, undefined, { headers: { 'x-api-key': process.env.TATUM_API_KEY } });
};
/**
 * For more details, see <a href="https://tatum.io/apidoc#operation/freezeAccount" target="_blank">Tatum API documentation</a>
 */
exports.freezeAccount = async (id) => {
    await axios_1.default.put(`${process.env.TATUM_API_URL || constants_1.TATUM_API_URL}/v3/ledger/account/${id}/freeze`, undefined, { headers: { 'x-api-key': process.env.TATUM_API_KEY } });
};
/**
 * For more details, see <a href="https://tatum.io/apidoc#operation/unfreezeAccount" target="_blank">Tatum API documentation</a>
 */
exports.unfreezeAccount = async (id) => {
    await axios_1.default.put(`${process.env.TATUM_API_URL || constants_1.TATUM_API_URL}/v3/ledger/account/${id}/unfreeze`, undefined, { headers: { 'x-api-key': process.env.TATUM_API_KEY } });
};
/**
 * For more details, see <a href="https://tatum.io/apidoc#operation/getAccountsByCustomerId" target="_blank">Tatum API documentation</a>
 */
exports.getAccountsByCustomerId = async (id, pageSize = 50, offset = 0) => {
    return (await axios_1.default.get(`${process.env.TATUM_API_URL || constants_1.TATUM_API_URL}/v3/ledger/account/customer/${id}?pageSize=${pageSize}&offset=${offset}`, { headers: { 'x-api-key': process.env.TATUM_API_KEY } })).data;
};
/**
 * For more details, see <a href="https://tatum.io/apidoc#operation/getAllAccounts" target="_blank">Tatum API documentation</a>
 */
exports.getAllAccounts = async (pageSize = 50, offset = 0) => {
    return (await axios_1.default.get(`${process.env.TATUM_API_URL || constants_1.TATUM_API_URL}/v3/ledger/account?pageSize=${pageSize}&offset=${offset}`, { headers: { 'x-api-key': process.env.TATUM_API_KEY } })).data;
};
/**
 * For more details, see <a href="https://tatum.io/apidoc#operation/getAccountBalance" target="_blank">Tatum API documentation</a>
 */
exports.getAccountBalance = async (id) => {
    return (await axios_1.default.get(`${process.env.TATUM_API_URL || constants_1.TATUM_API_URL}/v3/ledger/account/${id}/balance`, { headers: { 'x-api-key': process.env.TATUM_API_KEY } })).data;
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWNjb3VudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9sZWRnZXIvYWNjb3VudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7QUFBQSxrREFBMEI7QUFDMUIscURBQWlEO0FBQ2pELDRDQUEyQztBQUkzQzs7R0FFRztBQUNVLFFBQUEsY0FBYyxHQUFHLEtBQUssRUFBRSxFQUFVLEVBQW9CLEVBQUU7SUFDakUsT0FBTyxDQUFDLE1BQU0sZUFBSyxDQUFDLEdBQUcsQ0FBQyxHQUFHLE9BQU8sQ0FBQyxHQUFHLENBQUMsYUFBYSxJQUFJLHlCQUFhLHNCQUFzQixFQUFFLEVBQUUsRUFBRSxFQUFDLE9BQU8sRUFBRSxFQUFDLFdBQVcsRUFBRSxPQUFPLENBQUMsR0FBRyxDQUFDLGFBQWEsRUFBQyxFQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQztBQUNoSyxDQUFDLENBQUM7QUFFRjs7R0FFRztBQUNVLFFBQUEsYUFBYSxHQUFHLEtBQUssRUFBRSxPQUFzQixFQUFvQixFQUFFO0lBQzVFLE1BQU0sa0NBQWdCLENBQUMsT0FBTyxDQUFDLENBQUM7SUFDaEMsT0FBTyxDQUFDLE1BQU0sZUFBSyxDQUFDLElBQUksQ0FBQyxHQUFHLE9BQU8sQ0FBQyxHQUFHLENBQUMsYUFBYSxJQUFJLHlCQUFhLG9CQUFvQixFQUFFLE9BQU8sRUFBRSxFQUFDLE9BQU8sRUFBRSxFQUFDLFdBQVcsRUFBRSxPQUFPLENBQUMsR0FBRyxDQUFDLGFBQWEsRUFBQyxFQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQztBQUNwSyxDQUFDLENBQUM7QUFFRjs7R0FFRztBQUNVLFFBQUEsY0FBYyxHQUFHLEtBQUssRUFBRSxRQUE2QixFQUFzQixFQUFFO0lBQ3RGLE1BQU0sa0NBQWdCLENBQUMsUUFBUSxDQUFDLENBQUM7SUFDakMsT0FBTyxDQUFDLE1BQU0sZUFBSyxDQUFDLElBQUksQ0FBQyxHQUFHLE9BQU8sQ0FBQyxHQUFHLENBQUMsYUFB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