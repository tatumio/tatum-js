"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.btcGetTransaction = exports.btcGetTxForAccount = exports.btcGetUTXO = exports.btcGetBlockHash = exports.btcGetBlock = exports.btcGetCurrentBlock = exports.btcBroadcast = void 0;
const axios_1 = __importDefault(require("axios"));
const constants_1 = require("../constants");
/**
 * For more details, see <a href="https://tatum.io/apidoc#operation/BtcBroadcast" target="_blank">Tatum API documentation</a>
 */
exports.btcBroadcast = async (txData, signatureId) => {
    return (await axios_1.default.post(`${process.env.TATUM_API_URL || constants_1.TATUM_API_URL}/v3/bitcoin/broadcast`, { txData, signatureId }, { headers: { 'x-api-key': process.env.TATUM_API_KEY } })).data;
};
/**
 * For more details, see <a href="https://tatum.io/apidoc#operation/BtcGetBlockChainInfo" target="_blank">Tatum API documentation</a>
 */
exports.btcGetCurrentBlock = async () => {
    return (await axios_1.default.get(`${process.env.TATUM_API_URL || constants_1.TATUM_API_URL}/v3/bitcoin/info`, { headers: { 'x-api-key': process.env.TATUM_API_KEY } })).data;
};
/**
 * For more details, see <a href="https://tatum.io/apidoc#operation/BtcGetBlock" target="_blank">Tatum API documentation</a>
 */
exports.btcGetBlock = async (hash) => {
    return (await axios_1.default.get(`${process.env.TATUM_API_URL || constants_1.TATUM_API_URL}/v3/bitcoin/block/${hash}`, { headers: { 'x-api-key': process.env.TATUM_API_KEY } })).data;
};
/**
 * For more details, see <a href="https://tatum.io/apidoc#operation/BtcGetBlockHash" target="_blank">Tatum API documentation</a>
 */
exports.btcGetBlockHash = async (i) => {
    return (await axios_1.default.get(`${process.env.TATUM_API_URL || constants_1.TATUM_API_URL}/v3/bitcoin/block/hash/${i}`, { headers: { 'x-api-key': process.env.TATUM_API_KEY } })).data;
};
/**
 * For more details, see <a href="https://tatum.io/apidoc#operation/BtcGetUTXO" target="_blank">Tatum API documentation</a>
 */
exports.btcGetUTXO = async (hash, i) => {
    return (await axios_1.default.get(`${process.env.TATUM_API_URL || constants_1.TATUM_API_URL}/v3/bitcoin/utxo/${hash}/${i}`, { headers: { 'x-api-key': process.env.TATUM_API_KEY } })).data;
};
/**
 * For more details, see <a href="https://tatum.io/apidoc#operation/BtcGetTxByAddress" target="_blank">Tatum API documentation</a>
 */
exports.btcGetTxForAccount = async (address, pageSize = 50, offset = 0) => {
    return (await axios_1.default.get(`${process.env.TATUM_API_URL || constants_1.TATUM_API_URL}/v3/bitcoin/transaction/address/${address}?pageSize=${pageSize}&offset=${offset}`, { headers: { 'x-api-key': process.env.TATUM_API_KEY } })).data;
};
/**
 * For more details, see <a href="https://tatum.io/apidoc#operation/BtcGetRawTransaction" target="_blank">Tatum API documentation</a>
 */
exports.btcGetTransaction = async (hash) => {
    return (await axios_1.default.get(`${process.env.TATUM_API_URL || constants_1.TATUM_API_URL}/v3/bitcoin/transaction/${hash}`, { headers: { 'x-api-key': process.env.TATUM_API_KEY } })).data;
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYml0Y29pbi5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9ibG9ja2NoYWluL2JpdGNvaW4udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQUEsa0RBQTBCO0FBQzFCLDRDQUEyQztBQUczQzs7R0FFRztBQUNVLFFBQUEsWUFBWSxHQUFHLEtBQUssRUFBRSxNQUFjLEVBQUUsV0FBb0IsRUFBNEIsRUFBRTtJQUNqRyxPQUFPLENBQUMsTUFBTSxlQUFLLENBQUMsSUFBSSxDQUFDLEdBQUcsT0FBTyxDQUFDLEdBQUcsQ0FBQyxhQUFhLElBQUkseUJBQWEsdUJBQXVCLEVBQ3pGLEVBQUMsTUFBTSxFQUFFLFdBQVcsRUFBQyxFQUNyQixFQUFDLE9BQU8sRUFBRSxFQUFDLFdBQVcsRUFBRSxPQUFPLENBQUMsR0FBRyxDQUFDLGFBQWEsRUFBQyxFQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQztBQUNuRSxDQUFDLENBQUM7QUFFRjs7R0FFRztBQUNVLFFBQUEsa0JBQWtCLEdBQUcsS0FBSyxJQUFzQixFQUFFO0lBQzNELE9BQU8sQ0FBQyxNQUFNLGVBQUssQ0FBQyxHQUFHLENBQUMsR0FBRyxPQUFPLENBQUMsR0FBRyxDQUFDLGFBQWEsSUFBSSx5QkFBYSxrQkFBa0IsRUFBRSxFQUFDLE9BQU8sRUFBRSxFQUFDLFdBQVcsRUFBRSxPQUFPLENBQUMsR0FBRyxDQUFDLGFBQWEsRUFBQyxFQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQztBQUN4SixDQUFDLENBQUM7QUFFRjs7R0FFRztBQUNVLFFBQUEsV0FBVyxHQUFHLEtBQUssRUFBRSxJQUFZLEVBQXFCLEVBQUU7SUFDakUsT0FBTyxDQUFDLE1BQU0sZUFBSyxDQUFDLEdBQUcsQ0FBQyxHQUFHLE9BQU8sQ0FBQyxHQUFHLENBQUMsYUFBYSxJQUFJLHlCQUFhLHFCQUFxQixJQUFJLEVBQUUsRUFBRSxFQUFDLE9BQU8sRUFBRSxFQUFDLFdBQVcsRUFBRSxPQUFPLENBQUMsR0FBRyxDQUFDLGFBQWEsRUFBQyxFQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQztBQUNqSyxDQUFDLENBQUM7QUFFRjs7R0FFRztBQUNVLFFBQUEsZUFBZSxHQUFHLEtBQUssRUFBRSxDQUFTLEVBQXNCLEVBQUU7SUFDbkUsT0FBTyxDQUFDLE1BQU0sZUFBSyxDQUFDLEdBQUcsQ0FBQyxHQUFHLE9BQU8sQ0FBQyxHQUFHLENBQUMsYUFBYSxJQUFJLHlCQUFhLDBCQUEwQixDQUFDLEVBQUUsRUFBRSxFQUFDLE9BQU8sRUFBRSxFQUFDLFdBQVcsRUFBRSxPQUFPLENBQUMsR0FBRyxDQUFDLGFBQWEsRUFBQyxFQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQztBQUNuSyxDQUFDLENBQUM7QUFFRjs7R0FFRztBQUNVLFFBQUEsVUFBVSxHQUFHLEtBQUssRUFBRSxJQUFZLEVBQUUsQ0FBUyxFQUFvQixFQUFFO0lBQzFFLE9BQU8sQ0FBQyxNQUFNLGVBQUssQ0FBQyxHQUFHLENBQUMsR0FBRyxPQUFPLENBQUMsR0FBRyxDQUFDLGFBQWEsSUFBSSx5QkFBYSxvQkFBb0IsSUFBSSxJQUFJLENBQUMsRUFBRSxFQUFFLEVBQUMsT0FBTyxFQUFFLEVBQUMsV0FBVyxFQUFFLE9BQU8sQ0FBQyxHQUFHLENBQUMsYUFBYSxFQUFDLEVBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDO0FBQ3JLLENBQUMsQ0FBQztBQUVGOztHQUVHO0FBQ1UsUUFBQSxrQkFBa0IsR0FBRyxLQUFLLEVBQUUsT0FBZSxFQUFFLFdBQW1CLEVBQUUsRUFBRSxTQUFpQixDQUFDLEVBQW9CLEVBQUU7SUFDckgsT0FBTyxDQUFDLE1BQU0sZUFBSyxDQUFDLEdBQUcsQ0FBQyxHQUFHLE9BQU8sQ0FBQyxHQUFHLENBQUMsYUFBYSxJQUFJLHlCQUFhLG1DQUFtQyxPQUFPLGFBQWEsUUFBUSxXQUFXLE1BQU0sRUFBRSxFQUNuSixFQUFDLE9BQU8sRUFBRSxFQUFDLFdBQVcsRUFBRSxPQUFPLENBQUMsR0FBRyxDQUFDLGFBQWEsRUFBQyxFQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQztBQUNuRSxDQUFDLENBQUM7QUFFRjs7R0FFRztBQUNVLFFBQUEsaUJBQWlCLEdBQUcsS0FBSyxFQUFFLElBQVksRUFBa0IsRUFBRTtJQUNwRSxPQUFPLENBQUMsTUFBTSxlQUFLLENBQUMsR0FBRyxDQUFDLEdBQUcsT0FBTyxDQUFDLEdBQUcsQ0FBQyxhQUFhLElBQUkseUJBQWEsMkJBQTJCLElBQUksRUFBRSxFQUFFLEVBQUMsT0FBTyxFQUFFLEVBQUMsV0FBVyxFQUFFLE9BQU8sQ0FBQyxHQUFHLENBQUMsYUFBYSxFQUFDLEVBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDO0FBQ3ZLLENBQUMsQ0FBQyJ9