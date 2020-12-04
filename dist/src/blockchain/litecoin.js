"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ltcGetTransaction = exports.ltcGetTxForAccount = exports.ltcGetUTXO = exports.ltcGetBlockHash = exports.ltcGetBlock = exports.ltcGetCurrentBlock = exports.ltcBroadcast = void 0;
const axios_1 = __importDefault(require("axios"));
const constants_1 = require("../constants");
/**
 * For more details, see <a href="https://tatum.io/apidoc#operation/LtcBroadcast" target="_blank">Tatum API documentation</a>
 */
exports.ltcBroadcast = async (txData, signatureId) => {
    return (await axios_1.default.post(`${process.env.TATUM_API_URL || constants_1.TATUM_API_URL}/v3/litecoin/broadcast`, { txData, signatureId }, { headers: { 'x-api-key': process.env.TATUM_API_KEY } })).data;
};
/**
 * For more details, see <a href="https://tatum.io/apidoc#operation/LtcGetBlockChainInfo" target="_blank">Tatum API documentation</a>
 */
exports.ltcGetCurrentBlock = async () => {
    return (await axios_1.default.get(`${process.env.TATUM_API_URL || constants_1.TATUM_API_URL}/v3/litecoin/info`, { headers: { 'x-api-key': process.env.TATUM_API_KEY } })).data;
};
/**
 * For more details, see <a href="https://tatum.io/apidoc#operation/LtcGetBlock" target="_blank">Tatum API documentation</a>
 */
exports.ltcGetBlock = async (hash) => {
    return (await axios_1.default.get(`${process.env.TATUM_API_URL || constants_1.TATUM_API_URL}/v3/litecoin/block/${hash}`, { headers: { 'x-api-key': process.env.TATUM_API_KEY } })).data;
};
/**
 * For more details, see <a href="https://tatum.io/apidoc#operation/LtcGetBlockHash" target="_blank">Tatum API documentation</a>
 */
exports.ltcGetBlockHash = async (i) => {
    return (await axios_1.default.get(`${process.env.TATUM_API_URL || constants_1.TATUM_API_URL}/v3/litecoin/block/hash/${i}`, { headers: { 'x-api-key': process.env.TATUM_API_KEY } })).data;
};
/**
 * For more details, see <a href="https://tatum.io/apidoc#operation/LtcGetUTXO" target="_blank">Tatum API documentation</a>
 */
exports.ltcGetUTXO = async (hash, i) => {
    return (await axios_1.default.get(`${process.env.TATUM_API_URL || constants_1.TATUM_API_URL}/v3/litecoin/utxo/${hash}/${i}`, { headers: { 'x-api-key': process.env.TATUM_API_KEY } })).data;
};
/**
 * For more details, see <a href="https://tatum.io/apidoc#operation/LtcGetTxByAddress" target="_blank">Tatum API documentation</a>
 */
exports.ltcGetTxForAccount = async (address, pageSize = 50, offset = 0) => {
    return (await axios_1.default.get(`${process.env.TATUM_API_URL || constants_1.TATUM_API_URL}/v3/litecoin/transaction/address/${address}?pageSize=${pageSize}&offset=${offset}`, { headers: { 'x-api-key': process.env.TATUM_API_KEY } })).data;
};
/**
 * For more details, see <a href="https://tatum.io/apidoc#operation/LtcGetRawTransaction" target="_blank">Tatum API documentation</a>
 */
exports.ltcGetTransaction = async (hash) => {
    return (await axios_1.default.get(`${process.env.TATUM_API_URL || constants_1.TATUM_API_URL}/v3/litecoin/transaction/${hash}`, { headers: { 'x-api-key': process.env.TATUM_API_KEY } })).data;
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibGl0ZWNvaW4uanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvYmxvY2tjaGFpbi9saXRlY29pbi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7QUFBQSxrREFBMEI7QUFDMUIsNENBQTJDO0FBRzNDOztHQUVHO0FBQ1UsUUFBQSxZQUFZLEdBQUcsS0FBSyxFQUFFLE1BQWMsRUFBRSxXQUFvQixFQUE0QixFQUFFO0lBQ2pHLE9BQU8sQ0FBQyxNQUFNLGVBQUssQ0FBQyxJQUFJLENBQUMsR0FBRyxPQUFPLENBQUMsR0FBRyxDQUFDLGFBQWEsSUFBSSx5QkFBYSx3QkFBd0IsRUFDMUYsRUFBQyxNQUFNLEVBQUUsV0FBVyxFQUFDLEVBQ3JCLEVBQUMsT0FBTyxFQUFFLEVBQUMsV0FBVyxFQUFFLE9BQU8sQ0FBQyxHQUFHLENBQUMsYUFBYSxFQUFDLEVBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDO0FBQ25FLENBQUMsQ0FBQztBQUVGOztHQUVHO0FBQ1UsUUFBQSxrQkFBa0IsR0FBRyxLQUFLLElBQXNCLEVBQUU7SUFDM0QsT0FBTyxDQUFDLE1BQU0sZUFBSyxDQUFDLEdBQUcsQ0FBQyxHQUFHLE9BQU8sQ0FBQyxHQUFHLENBQUMsYUFBYSxJQUFJLHlCQUFhLG1CQUFtQixFQUFFLEVBQUMsT0FBTyxFQUFFLEVBQUMsV0FBVyxFQUFFLE9BQU8sQ0FBQyxHQUFHLENBQUMsYUFBYSxFQUFDLEVBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDO0FBQ3pKLENBQUMsQ0FBQztBQUVGOztHQUVHO0FBQ1UsUUFBQSxXQUFXLEdBQUcsS0FBSyxFQUFFLElBQVksRUFBcUIsRUFBRTtJQUNqRSxPQUFPLENBQUMsTUFBTSxlQUFLLENBQUMsR0FBRyxDQUFDLEdBQUcsT0FBTyxDQUFDLEdBQUcsQ0FBQyxhQUFhLElBQUkseUJBQWEsc0JBQXNCLElBQUksRUFBRSxFQUFFLEVBQUMsT0FBTyxFQUFFLEVBQUMsV0FBVyxFQUFFLE9BQU8sQ0FBQyxHQUFHLENBQUMsYUFBYSxFQUFDLEVBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDO0FBQ2xLLENBQUMsQ0FBQztBQUVGOztHQUVHO0FBQ1UsUUFBQSxlQUFlLEdBQUcsS0FBSyxFQUFFLENBQVMsRUFBc0IsRUFBRTtJQUNuRSxPQUFPLENBQUMsTUFBTSxlQUFLLENBQUMsR0FBRyxDQUFDLEdBQUcsT0FBTyxDQUFDLEdBQUcsQ0FBQyxhQUFhLElBQUkseUJBQWEsMkJBQTJCLENBQUMsRUFBRSxFQUFFLEVBQUMsT0FBTyxFQUFFLEVBQUMsV0FBVyxFQUFFLE9BQU8sQ0FBQyxHQUFHLENBQUMsYUFBYSxFQUFDLEVBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDO0FBQ3BLLENBQUMsQ0FBQztBQUVGOztHQUVHO0FBQ1UsUUFBQSxVQUFVLEdBQUcsS0FBSyxFQUFFLElBQVksRUFBRSxDQUFTLEVBQW9CLEVBQUU7SUFDMUUsT0FBTyxDQUFDLE1BQU0sZUFBSyxDQUFDLEdBQUcsQ0FBQyxHQUFHLE9BQU8sQ0FBQyxHQUFHLENBQUMsYUFBYSxJQUFJLHlCQUFhLHFCQUFxQixJQUFJLElBQUksQ0FBQyxFQUFFLEVBQUUsRUFBQyxPQUFPLEVBQUUsRUFBQyxXQUFXLEVBQUUsT0FBTyxDQUFDLEdBQUcsQ0FBQyxhQUFhLEVBQUMsRUFBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUM7QUFDdEssQ0FBQyxDQUFDO0FBRUY7O0dBRUc7QUFDVSxRQUFBLGtCQUFrQixHQUFHLEtBQUssRUFBRSxPQUFlLEVBQUUsV0FBbUIsRUFBRSxFQUFFLFNBQWlCLENBQUMsRUFBb0IsRUFBRTtJQUNySCxPQUFPLENBQUMsTUFBTSxlQUFLLENBQUMsR0FBRyxDQUFDLEdBQUcsT0FBTyxDQUFDLEdBQUcsQ0FBQyxhQUFhLElBQUkseUJBQWEsb0NBQW9DLE9BQU8sYUFBYSxRQUFRLFdBQVcsTUFBTSxFQUFFLEVBQ3BKLEVBQUMsT0FBTyxFQUFFLEVBQUMsV0FBVyxFQUFFLE9BQU8sQ0FBQyxHQUFHLENBQUMsYUFBYSxFQUFDLEVBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDO0FBQ25FLENBQUMsQ0FBQztBQUVGOztHQUVHO0FBQ1UsUUFBQSxpQkFBaUIsR0FBRyxLQUFLLEVBQUUsSUFBWSxFQUFrQixFQUFFO0lBQ3BFLE9BQU8sQ0FBQyxNQUFNLGVBQUssQ0FBQyxHQUFHLENBQUMsR0FBRyxPQUFPLENBQUMsR0FBRyxDQUFDLGFBQWEsSUFBSSx5QkFBYSw0QkFBNEIsSUFBSSxFQUFFLEVBQUUsRUFBQyxPQUFPLEVBQUUsRUFBQyxXQUFXLEVBQUUsT0FBTyxDQUFDLEdBQUcsQ0FBQyxhQUFhLEVBQUMsRUFBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUM7QUFDeEssQ0FBQyxDQUFDIn0=