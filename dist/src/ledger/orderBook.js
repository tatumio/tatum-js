"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteAccountTrades = exports.deleteTrade = exports.getTradeById = exports.storeTrade = exports.getActiveSellTrades = exports.getActiveBuyTrades = exports.getHistoricalTrades = void 0;
const axios_1 = __importDefault(require("axios"));
const constants_1 = require("../constants");
/**
 * For more details, see <a href="https://tatum.io/apidoc#operation/getHistoricalTrades" target="_blank">Tatum API documentation</a>
 */
exports.getHistoricalTrades = async (pageSize = 50, offset = 0) => {
    return (await axios_1.default.get(`${process.env.TATUM_API_URL || constants_1.TATUM_API_URL}/v3/trade/history?pageSize=${pageSize}&offset=${offset}`, { headers: { 'x-api-key': process.env.TATUM_API_KEY } })).data;
};
/**
 * For more details, see <a href="https://tatum.io/apidoc#operation/getBuyTrades" target="_blank">Tatum API documentation</a>
 */
exports.getActiveBuyTrades = async (id, pageSize = 50, offset = 0) => {
    return (await axios_1.default.get(`${process.env.TATUM_API_URL || constants_1.TATUM_API_URL}/v3/trade/buy?id=${id}&pageSize=${pageSize}&offset=${offset}`, { headers: { 'x-api-key': process.env.TATUM_API_KEY } })).data;
};
/**
 * For more details, see <a href="https://tatum.io/apidoc#operation/getSellTrades" target="_blank">Tatum API documentation</a>
 */
exports.getActiveSellTrades = async (id, pageSize = 50, offset = 0) => {
    return (await axios_1.default.get(`${process.env.TATUM_API_URL || constants_1.TATUM_API_URL}/v3/trade/sell?id=${id}&pageSize=${pageSize}&offset=${offset}`, { headers: { 'x-api-key': process.env.TATUM_API_KEY } })).data;
};
/**
 * For more details, see <a href="https://tatum.io/apidoc#operation/storeTrade" target="_blank">Tatum API documentation</a>
 */
exports.storeTrade = async (data) => {
    return (await axios_1.default.post(`${process.env.TATUM_API_URL || constants_1.TATUM_API_URL}/v3/trade`, data, { headers: { 'x-api-key': process.env.TATUM_API_KEY } })).data;
};
/**
 * For more details, see <a href="https://tatum.io/apidoc#operation/getTradeById" target="_blank">Tatum API documentation</a>
 */
exports.getTradeById = async (id) => {
    return (await axios_1.default.get(`${process.env.TATUM_API_URL || constants_1.TATUM_API_URL}/v3/trade/${id}`, { headers: { 'x-api-key': process.env.TATUM_API_KEY } })).data;
};
/**
 * For more details, see <a href="https://tatum.io/apidoc#operation/deleteTrade" target="_blank">Tatum API documentation</a>
 */
exports.deleteTrade = async (id) => {
    return (await axios_1.default.delete(`${process.env.TATUM_API_URL || constants_1.TATUM_API_URL}/v3/trade/${id}`, { headers: { 'x-api-key': process.env.TATUM_API_KEY } })).data;
};
/**
 * For more details, see <a href="https://tatum.io/apidoc#operation/deleteAccountTrades" target="_blank">Tatum API documentation</a>
 */
exports.deleteAccountTrades = async (id) => {
    return (await axios_1.default.delete(`${process.env.TATUM_API_URL || constants_1.TATUM_API_URL}/v3/trade/account/${id}`, { headers: { 'x-api-key': process.env.TATUM_API_KEY } })).data;
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoib3JkZXJCb29rLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL2xlZGdlci9vcmRlckJvb2sudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQUEsa0RBQXlCO0FBQ3pCLDRDQUEwQztBQUkxQzs7R0FFRztBQUNVLFFBQUEsbUJBQW1CLEdBQUcsS0FBSyxFQUFFLFdBQW1CLEVBQUUsRUFBRSxTQUFpQixDQUFDLEVBQWdDLEVBQUU7SUFDakgsT0FBTyxDQUFDLE1BQU0sZUFBSyxDQUFDLEdBQUcsQ0FDbkIsR0FBRyxPQUFPLENBQUMsR0FBRyxDQUFDLGFBQWEsSUFBSSx5QkFBYSw4QkFBOEIsUUFBUSxXQUFXLE1BQU0sRUFBRSxFQUN0RyxFQUFDLE9BQU8sRUFBRSxFQUFDLFdBQVcsRUFBRSxPQUFPLENBQUMsR0FBRyxDQUFDLGFBQWEsRUFBQyxFQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQTtBQUNsRSxDQUFDLENBQUE7QUFFRDs7R0FFRztBQUNVLFFBQUEsa0JBQWtCLEdBQUcsS0FBSyxFQUFFLEVBQVUsRUFBRSxXQUFtQixFQUFFLEVBQUUsU0FBaUIsQ0FBQyxFQUFnQyxFQUFFO0lBQzVILE9BQU8sQ0FBQyxNQUFNLGVBQUssQ0FBQyxHQUFHLENBQ25CLEdBQUcsT0FBTyxDQUFDLEdBQUcsQ0FBQyxhQUFhLElBQUkseUJBQWEsb0JBQW9CLEVBQUUsYUFBYSxRQUFRLFdBQVcsTUFBTSxFQUFFLEVBQzNHLEVBQUMsT0FBTyxFQUFFLEVBQUMsV0FBVyxFQUFFLE9BQU8sQ0FBQyxHQUFHLENBQUMsYUFBYSxFQUFDLEVBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFBO0FBQ2xFLENBQUMsQ0FBQTtBQUVEOztHQUVHO0FBQ1UsUUFBQSxtQkFBbUIsR0FBRyxLQUFLLEVBQUUsRUFBVSxFQUFFLFdBQW1CLEVBQUUsRUFBRSxTQUFpQixDQUFDLEVBQWdDLEVBQUU7SUFDN0gsT0FBTyxDQUFDLE1BQU0sZUFBSyxDQUFDLEdBQUcsQ0FDbkIsR0FBRyxPQUFPLENBQUMsR0FBRyxDQUFDLGFBQWEsSUFBSSx5QkFBYSxxQkFBcUIsRUFBRSxhQUFhLFFBQVEsV0FBVyxNQUFNLEVBQUUsRUFDNUcsRUFBQyxPQUFPLEVBQUUsRUFBQyxXQUFXLEVBQUUsT0FBTyxDQUFDLEdBQUcsQ0FBQyxhQUFhLEVBQUMsRUFBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUE7QUFDbEUsQ0FBQyxDQUFBO0FBRUQ7O0dBRUc7QUFDVSxRQUFBLFVBQVUsR0FBRyxLQUFLLEVBQUUsSUFBc0IsRUFBMkIsRUFBRTtJQUNoRixPQUFPLENBQUMsTUFBTSxlQUFLLENBQUMsSUFBSSxDQUNwQixHQUFHLE9BQU8sQ0FBQyxHQUFHLENBQUMsYUFBYSxJQUFJLHlCQUFhLFdBQVcsRUFDeEQsSUFBSSxFQUNKLEVBQUMsT0FBTyxFQUFFLEVBQUMsV0FBVyxFQUFFLE9BQU8sQ0FBQyxHQUFHLENBQUMsYUFBYSxFQUFDLEVBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFBO0FBQ2xFLENBQUMsQ0FBQTtBQUVEOztHQUVHO0FBQ1UsUUFBQSxZQUFZLEdBQUcsS0FBSyxFQUFFLEVBQVUsRUFBOEIsRUFBRTtJQUN6RSxPQUFPLENBQUMsTUFBTSxlQUFLLENBQUMsR0FBRyxDQUNuQixHQUFHLE9BQU8sQ0FBQyxHQUFHLENBQUMsYUFBYSxJQUFJLHlCQUFhLGFBQWEsRUFBRSxFQUFFLEVBQzlELEVBQUMsT0FBTyxFQUFFLEVBQUMsV0FBVyxFQUFFLE9BQU8sQ0FBQyxHQUFHLENBQUMsYUFBYSxFQUFDLEVBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFBO0FBQ2xFLENBQUMsQ0FBQTtBQUVEOztHQUVHO0FBQ1UsUUFBQSxXQUFXLEdBQUcsS0FBSyxFQUFFLEVBQVUsRUFBaUIsRUFBRTtJQUMzRCxPQUFPLENBQUMsTUFBTSxlQUFLLENBQUMsTUFBTSxDQUN0QixHQUFHLE9BQU8sQ0FBQyxHQUFHLENBQUMsYUFBYSxJQUFJLHlCQUFhLGFBQWEsRUFBRSxFQUFFLEVBQzlELEVBQUMsT0FBTyxFQUFFLEVBQUMsV0FBVyxFQUFFLE9BQU8sQ0FBQyxHQUFHLENBQUMsYUFBYSxFQUFDLEVBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFBO0FBQ2xFLENBQUMsQ0FBQTtBQUVEOztHQUVHO0FBQ1UsUUFBQSxtQkFBbUIsR0FBRyxLQUFLLEVBQUUsRUFBVSxFQUFpQixFQUFFO0lBQ25FLE9BQU8sQ0FBQyxNQUFNLGVBQUssQ0FBQyxNQUFNLENBQ3RCLEdBQUcsT0FBTyxDQUFDLEdBQUcsQ0FBQyxhQUFhLElBQUkseUJBQWEscUJBQXFCLEVBQUUsRUFBRSxFQUN0RSxFQUFDLE9BQU8sRUFBRSxFQUFDLFdBQVcsRUFBRSxPQUFPLENBQUMsR0FBRyxDQUFDLGFBQWEsRUFBQyxFQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQTtBQUNsRSxDQUFDLENBQUEifQ==