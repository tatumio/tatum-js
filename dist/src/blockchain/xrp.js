"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.xrpGetAccountTransactions = exports.xrpGetTransaction = exports.xrpGetAccountBalance = exports.xrpGetLedger = exports.xrpGetCurrentLedger = exports.xrpBroadcast = exports.xrpGetAccountInfo = exports.xrpGetFee = void 0;
const axios_1 = __importDefault(require("axios"));
const constants_1 = require("../constants");
/**
 * For more details, see <a href="https://tatum.io/apidoc#operation/XrpGetFee" target="_blank">Tatum API documentation</a>
 */
exports.xrpGetFee = async () => {
    return (await axios_1.default.get(`${process.env.TATUM_API_URL || constants_1.TATUM_API_URL}/v3/xrp/fee`, { headers: { 'x-api-key': process.env.TATUM_API_KEY } })).data;
};
/**
 * For more details, see <a href="https://tatum.io/apidoc#operation/XrpGetAccountInfo" target="_blank">Tatum API documentation</a>
 */
exports.xrpGetAccountInfo = async (account) => {
    return (await axios_1.default.get(`${process.env.TATUM_API_URL || constants_1.TATUM_API_URL}/v3/xrp/account/${account}`, { headers: { 'x-api-key': process.env.TATUM_API_KEY } })).data;
};
/**
 * For more details, see <a href="https://tatum.io/apidoc#operation/XrpBroadcast" target="_blank">Tatum API documentation</a>
 */
exports.xrpBroadcast = async (txData, signatureId) => {
    return (await axios_1.default.post(`${process.env.TATUM_API_URL || constants_1.TATUM_API_URL}/v3/xrp/broadcast`, { txData, signatureId }, { headers: { 'x-api-key': process.env.TATUM_API_KEY } })).data;
};
/**
 * For more details, see <a href="https://tatum.io/apidoc#operation/XrpGetLastClosedLedger" target="_blank">Tatum API documentation</a>
 */
exports.xrpGetCurrentLedger = async () => {
    return (await axios_1.default.get(`${process.env.TATUM_API_URL || constants_1.TATUM_API_URL}/v3/xrp/info`, { headers: { 'x-api-key': process.env.TATUM_API_KEY } })).data;
};
/**
 * For more details, see <a href="https://tatum.io/apidoc#operation/XrpGetLedger" target="_blank">Tatum API documentation</a>
 */
exports.xrpGetLedger = async (i) => {
    return (await axios_1.default.get(`${process.env.TATUM_API_URL || constants_1.TATUM_API_URL}/v3/xrp/ledger/${i}`, { headers: { 'x-api-key': process.env.TATUM_API_KEY } })).data;
};
/**
 * For more details, see <a href="https://tatum.io/apidoc#operation/XrpGetAccountBalance" target="_blank">Tatum API documentation</a>
 */
exports.xrpGetAccountBalance = async (address) => {
    return (await axios_1.default.get(`${process.env.TATUM_API_URL || constants_1.TATUM_API_URL}/v3/xrp/account/${address}/balance`, { headers: { 'x-api-key': process.env.TATUM_API_KEY } })).data;
};
/**
 * For more details, see <a href="https://tatum.io/apidoc#operation/XrpGetTransaction" target="_blank">Tatum API documentation</a>
 */
exports.xrpGetTransaction = async (hash) => {
    return (await axios_1.default.get(`${process.env.TATUM_API_URL || constants_1.TATUM_API_URL}/v3/xrp/transaction/${hash}`, { headers: { 'x-api-key': process.env.TATUM_API_KEY } })).data;
};
/**
 * For more details, see <a href="https://tatum.io/apidoc#operation/XrpGetAccountTx" target="_blank">Tatum API documentation</a>
 */
exports.xrpGetAccountTransactions = async (address, min, marker) => {
    return (await axios_1.default.get(`${process.env.TATUM_API_URL || constants_1.TATUM_API_URL}/v3/xrp/account/tx/${address}?min=${min}&marker=${marker}`, { headers: { 'x-api-key': process.env.TATUM_API_KEY } })).data;
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoieHJwLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL2Jsb2NrY2hhaW4veHJwLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7OztBQUFBLGtEQUEwQjtBQUMxQiw0Q0FBMkM7QUFHM0M7O0dBRUc7QUFDVSxRQUFBLFNBQVMsR0FBRyxLQUFLLElBQThDLEVBQUU7SUFDMUUsT0FBTyxDQUFDLE1BQU0sZUFBSyxDQUFDLEdBQUcsQ0FBQyxHQUFHLE9BQU8sQ0FBQyxHQUFHLENBQUMsYUFBYSxJQUFJLHlCQUFhLGFBQWEsRUFBRSxFQUFDLE9BQU8sRUFBRSxFQUFDLFdBQVcsRUFBRSxPQUFPLENBQUMsR0FBRyxDQUFDLGFBQWEsRUFBQyxFQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQztBQUNuSixDQUFDLENBQUM7QUFFRjs7R0FFRztBQUNVLFFBQUEsaUJBQWlCLEdBQUcsS0FBSyxFQUFFLE9BQWUsRUFBaUYsRUFBRTtJQUN0SSxPQUFPLENBQUMsTUFBTSxlQUFLLENBQUMsR0FBRyxDQUFDLEdBQUcsT0FBTyxDQUFDLEdBQUcsQ0FBQyxhQUFhLElBQUkseUJBQWEsbUJBQW1CLE9BQU8sRUFBRSxFQUFFLEVBQUMsT0FBTyxFQUFFLEVBQUMsV0FBVyxFQUFFLE9BQU8sQ0FBQyxHQUFHLENBQUMsYUFBYSxFQUFDLEVBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDO0FBQ2xLLENBQUMsQ0FBQztBQUVGOztHQUVHO0FBQ1UsUUFBQSxZQUFZLEdBQUcsS0FBSyxFQUFFLE1BQWMsRUFBRSxXQUFvQixFQUE0QixFQUFFO0lBQ2pHLE9BQU8sQ0FBQyxNQUFNLGVBQUssQ0FBQyxJQUFJLENBQUMsR0FBRyxPQUFPLENBQUMsR0FBRyxDQUFDLGFBQWEsSUFBSSx5QkFBYSxtQkFBbUIsRUFDckYsRUFBQyxNQUFNLEVBQUUsV0FBVyxFQUFDLEVBQ3JCLEVBQUMsT0FBTyxFQUFFLEVBQUMsV0FBVyxFQUFFLE9BQU8sQ0FBQyxHQUFHLENBQUMsYUFBYSxFQUFDLEVBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDO0FBQ25FLENBQUMsQ0FBQztBQUdGOztHQUVHO0FBQ1UsUUFBQSxtQkFBbUIsR0FBRyxLQUFLLElBQXFCLEVBQUU7SUFDM0QsT0FBTyxDQUFDLE1BQU0sZUFBSyxDQUFDLEdBQUcsQ0FBQyxHQUFHLE9BQU8sQ0FBQyxHQUFHLENBQUMsYUFBYSxJQUFJLHlCQUFhLGNBQWMsRUFBRSxFQUFDLE9BQU8sRUFBRSxFQUFDLFdBQVcsRUFBRSxPQUFPLENBQUMsR0FBRyxDQUFDLGFBQWEsRUFBQyxFQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQztBQUNwSixDQUFDLENBQUM7QUFFRjs7R0FFRztBQUNVLFFBQUEsWUFBWSxHQUFHLEtBQUssRUFBRSxDQUFTLEVBQUUsRUFBRTtJQUM1QyxPQUFPLENBQUMsTUFBTSxlQUFLLENBQUMsR0FBRyxDQUFDLEdBQUcsT0FBTyxDQUFDLEdBQUcsQ0FBQyxhQUFhLElBQUkseUJBQWEsa0JBQWtCLENBQUMsRUFBRSxFQUFFLEVBQUMsT0FBTyxFQUFFLEVBQUMsV0FBVyxFQUFFLE9BQU8sQ0FBQyxHQUFHLENBQUMsYUFBYSxFQUFDLEVBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDO0FBQzNKLENBQUMsQ0FBQztBQUVGOztHQUVHO0FBQ1UsUUFBQSxvQkFBb0IsR0FBRyxLQUFLLEVBQUUsT0FBZSxFQUFFLEVBQUU7SUFDMUQsT0FBTyxDQUFDLE1BQU0sZUFBSyxDQUFDLEdBQUcsQ0FBQyxHQUFHLE9BQU8sQ0FBQyxHQUFHLENBQUMsYUFBYSxJQUFJLHlCQUFhLG1CQUFtQixPQUFPLFVBQVUsRUFBRSxFQUFDLE9BQU8sRUFBRSxFQUFDLFdBQVcsRUFBRSxPQUFPLENBQUMsR0FBRyxDQUFDLGFBQWEsRUFBQyxFQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQztBQUMxSyxDQUFDLENBQUM7QUFFRjs7R0FFRztBQUNVLFFBQUEsaUJBQWlCLEdBQUcsS0FBSyxFQUFFLElBQVksRUFBRSxFQUFFO0lBQ3BELE9BQU8sQ0FBQyxNQUFNLGVBQUssQ0FBQyxHQUFHLENBQUMsR0FBRyxPQUFPLENBQUMsR0FBRyxDQUFDLGFBQWEsSUFBSSx5QkFBYSx1QkFBdUIsSUFBSSxFQUFFLEVBQUUsRUFBQyxPQUFPLEVBQUUsRUFBQyxXQUFXLEVBQUUsT0FBTyxDQUFDLEdBQUcsQ0FBQyxhQUFhLEVBQUMsRUFBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUM7QUFDbkssQ0FBQyxDQUFDO0FBRUY7O0dBRUc7QUFDVSxRQUFBLHlCQUF5QixHQUFHLEtBQUssRUFBRSxPQUFlLEVBQUUsR0FBWSxFQUFFLE1BQWUsRUFBRSxFQUFFO0lBQzlGLE9BQU8sQ0FBQyxNQUFNLGVBQUssQ0FBQyxHQUFHLENBQUMsR0FBRyxPQUFPLENBQUMsR0FBRyxDQUFDLGFBQWEsSUFBSSx5QkFBYSxzQkFBc0IsT0FBTyxRQUFRLEdBQUcsV0FBVyxNQUFNLEVBQUUsRUFDNUgsRUFBQyxPQUFPLEVBQUUsRUFBQyxXQUFXLEVBQUUsT0FBTyxDQUFDLEdBQUcsQ0FBQyxhQUFhLEVBQUMsRUFBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUM7QUFDbkUsQ0FBQyxDQUFDIn0=