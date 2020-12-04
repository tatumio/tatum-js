"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.offchainCompleteWithdrawal = exports.offchainCancelWithdrawal = exports.offchainStoreWithdrawal = exports.offchainBroadcast = exports.getDepositAddressesForAccount = exports.removeDepositAddress = exports.assignDepositAddress = exports.checkAddressExists = exports.generateDepositAddresses = exports.generateDepositAddress = void 0;
const axios_1 = __importDefault(require("axios"));
const constants_1 = require("../constants");
/**
 * For more details, see <a href="https://tatum.io/apidoc#operation/generateDepositAddress" target="_blank">Tatum API documentation</a>
 */
exports.generateDepositAddress = async (id, index) => {
    const url = `${process.env.TATUM_API_URL || constants_1.TATUM_API_URL}/v3/offchain/account/${id}/address`;
    return (await axios_1.default.post(index === undefined ? url : `${url}?index=${index}`, undefined, { headers: { 'x-api-key': process.env.TATUM_API_KEY } })).data;
};
/**
 * For more details, see <a href="https://tatum.io/apidoc#operation/generateDepositAddressesBatch" target="_blank">Tatum API documentation</a>
 */
exports.generateDepositAddresses = async (batch) => {
    return (await axios_1.default.post(`${process.env.TATUM_API_URL || constants_1.TATUM_API_URL}/v3/offchain/account/address/batch`, batch, { headers: { 'x-api-key': process.env.TATUM_API_KEY } })).data;
};
/**
 * For more details, see <a href="https://tatum.io/apidoc#operation/addressExists" target="_blank">Tatum API documentation</a>
 */
exports.checkAddressExists = async (address, currency, index) => {
    const url = `${process.env.TATUM_API_URL || constants_1.TATUM_API_URL}/v3/offchain/account/address/${address}/${currency}`;
    return (await axios_1.default.get(index === undefined ? url : `${url}?index=${index}`, { headers: { 'x-api-key': process.env.TATUM_API_KEY } })).data;
};
/**
 * For more details, see <a href="https://tatum.io/apidoc#operation/assignAddress" target="_blank">Tatum API documentation</a>
 */
exports.assignDepositAddress = async (id, address) => {
    return (await axios_1.default.post(`${process.env.TATUM_API_URL || constants_1.TATUM_API_URL}/v3/offchain/account/${id}/address/${address}`, undefined, { headers: { 'x-api-key': process.env.TATUM_API_KEY } })).data;
};
/**
 * For more details, see <a href="https://tatum.io/apidoc#operation/removeAddress" target="_blank">Tatum API documentation</a>
 */
exports.removeDepositAddress = async (id, address) => {
    await axios_1.default.delete(`${process.env.TATUM_API_URL || constants_1.TATUM_API_URL}/v3/offchain/account/${id}/address/${address}`, { headers: { 'x-api-key': process.env.TATUM_API_KEY } });
};
/**
 * For more details, see <a href="https://tatum.io/apidoc#operation/getAllDepositAddresses" target="_blank">Tatum API documentation</a>
 */
exports.getDepositAddressesForAccount = async (id) => {
    return (await axios_1.default.get(`${process.env.TATUM_API_URL || constants_1.TATUM_API_URL}/v3/offchain/account/${id}/address`, { headers: { 'x-api-key': process.env.TATUM_API_KEY } })).data;
};
/**
 * For more details, see <a href="https://tatum.io/apidoc#operation/broadcastBlockchainTransaction" target="_blank">Tatum API documentation</a>
 */
exports.offchainBroadcast = async (data) => {
    return (await axios_1.default.post(`${process.env.TATUM_API_URL || constants_1.TATUM_API_URL}/v3/offchain/withdrawal/broadcast`, data, { headers: { 'x-api-key': process.env.TATUM_API_KEY } })).data;
};
/**
 * For more details, see <a href="https://tatum.io/apidoc#operation/storeWithdrawal" target="_blank">Tatum API documentation</a>
 */
exports.offchainStoreWithdrawal = async (data) => {
    return (await axios_1.default.post(`${process.env.TATUM_API_URL || constants_1.TATUM_API_URL}/v3/offchain/withdrawal`, data, { headers: { 'x-api-key': process.env.TATUM_API_KEY } })).data;
};
/**
 * For more details, see <a href="https://tatum.io/apidoc#operation/cancelInProgressWithdrawal" target="_blank">Tatum API documentation</a>
 */
exports.offchainCancelWithdrawal = async (id, revert = true) => {
    await axios_1.default.delete(`${process.env.TATUM_API_URL || constants_1.TATUM_API_URL}/v3/offchain/withdrawal/${id}?revert=${revert}`, { headers: { 'x-api-key': process.env.TATUM_API_KEY } });
};
/**
 * For more details, see <a href="https://tatum.io/apidoc#operation/completeWithdrawal" target="_blank">Tatum API documentation</a>
 */
exports.offchainCompleteWithdrawal = async (id, txId) => {
    await axios_1.default.put(`${process.env.TATUM_API_URL || constants_1.TATUM_API_URL}/v3/offchain/withdrawal/${id}/${txId}`, { headers: { 'x-api-key': process.env.TATUM_API_KEY } });
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29tbW9uLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL29mZmNoYWluL2NvbW1vbi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7QUFBQSxrREFBMEI7QUFDMUIsNENBQTJDO0FBSTNDOztHQUVHO0FBQ1UsUUFBQSxzQkFBc0IsR0FBRyxLQUFLLEVBQUUsRUFBVSxFQUFFLEtBQWMsRUFBb0IsRUFBRTtJQUN6RixNQUFNLEdBQUcsR0FBRyxHQUFHLE9BQU8sQ0FBQyxHQUFHLENBQUMsYUFBYSxJQUFJLHlCQUFhLHdCQUF3QixFQUFFLFVBQVUsQ0FBQztJQUM5RixPQUFPLENBQUMsTUFBTSxlQUFLLENBQUMsSUFBSSxDQUFDLEtBQUssS0FBSyxTQUFTLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsR0FBRyxHQUFHLFVBQVUsS0FBSyxFQUFFLEVBQ3hFLFNBQVMsRUFDVCxFQUFDLE9BQU8sRUFBRSxFQUFDLFdBQVcsRUFBRSxPQUFPLENBQUMsR0FBRyxDQUFDLGFBQWEsRUFBQyxFQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQztBQUNuRSxDQUFDLENBQUM7QUFFRjs7R0FFRztBQUNVLFFBQUEsd0JBQXdCLEdBQUcsS0FBSyxFQUFFLEtBQW1CLEVBQXNCLEVBQUU7SUFDdEYsT0FBTyxDQUFDLE1BQU0sZUFBSyxDQUFDLElBQUksQ0FBQyxHQUFHLE9BQU8sQ0FBQyxHQUFHLENBQUMsYUFBYSxJQUFJLHlCQUFhLG9DQUFvQyxFQUN0RyxLQUFLLEVBQ0wsRUFBQyxPQUFPLEVBQUUsRUFBQyxXQUFXLEVBQUUsT0FBTyxDQUFDLEdBQUcsQ0FBQyxhQUFhLEVBQUMsRUFBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUM7QUFDbkUsQ0FBQyxDQUFDO0FBRUY7O0dBRUc7QUFDVSxRQUFBLGtCQUFrQixHQUFHLEtBQUssRUFBRSxPQUFlLEVBQUUsUUFBZ0IsRUFBRSxLQUFjLEVBQW9CLEVBQUU7SUFDNUcsTUFB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