"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.revokeVirtualCurrency = exports.mintVirtualCurrency = exports.updateVirtualCurrency = exports.createVirtualCurrency = exports.getVirtualCurrencyByName = void 0;
const axios_1 = __importDefault(require("axios"));
const class_validator_1 = require("class-validator");
const constants_1 = require("../constants");
/**
 * For more details, see <a href="https://tatum.io/apidoc#operation/getCurrency" target="_blank">Tatum API documentation</a>
 */
exports.getVirtualCurrencyByName = async (name) => {
    return (await axios_1.default.get(`${process.env.TATUM_API_URL || constants_1.TATUM_API_URL}/v3/ledger/virtualCurrency/${name}`, { headers: { 'x-api-key': process.env.TATUM_API_KEY } })).data;
};
/**
 * For more details, see <a href="https://tatum.io/apidoc#operation/createCurrency" target="_blank">Tatum API documentation</a>
 */
exports.createVirtualCurrency = async (data) => {
    await class_validator_1.validateOrReject(data);
    return (await axios_1.default.post(`${process.env.TATUM_API_URL || constants_1.TATUM_API_URL}/v3/ledger/virtualCurrency`, data, { headers: { 'x-api-key': process.env.TATUM_API_KEY } })).data;
};
/**
 * For more details, see <a href="https://tatum.io/apidoc#operation/updateCurrency" target="_blank">Tatum API documentation</a>
 */
exports.updateVirtualCurrency = async (data) => {
    await class_validator_1.validateOrReject(data);
    await axios_1.default.put(`${process.env.TATUM_API_URL || constants_1.TATUM_API_URL}/v3/ledger/virtualCurrency/`, data, { headers: { 'x-api-key': process.env.TATUM_API_KEY } });
};
/**
 * For more details, see <a href="https://tatum.io/apidoc#operation/mintCurrency" target="_blank">Tatum API documentation</a>
 */
exports.mintVirtualCurrency = async (data) => {
    await class_validator_1.validateOrReject(data);
    return (await axios_1.default.put(`${process.env.TATUM_API_URL || constants_1.TATUM_API_URL}/v3/ledger/virtualCurrency/mint`, data, { headers: { 'x-api-key': process.env.TATUM_API_KEY } })).data;
};
/**
 * For more details, see <a href="https://tatum.io/apidoc#operation/revokeCurrency" target="_blank">Tatum API documentation</a>
 */
exports.revokeVirtualCurrency = async (data) => {
    await class_validator_1.validateOrReject(data);
    return (await axios_1.default.put(`${process.env.TATUM_API_URL || constants_1.TATUM_API_URL}/v3/ledger/virtualCurrency/revoke`, data, { headers: { 'x-api-key': process.env.TATUM_API_KEY } })).data;
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidmMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvbGVkZ2VyL3ZjLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7OztBQUFBLGtEQUEwQjtBQUMxQixxREFBaUQ7QUFDakQsNENBQTJDO0FBTzNDOztHQUVHO0FBQ1UsUUFBQSx3QkFBd0IsR0FBRyxLQUFLLEVBQUUsSUFBWSxFQUFlLEVBQUU7SUFDeEUsT0FBTyxDQUFDLE1BQU0sZUFBSyxDQUFDLEdBQUcsQ0FBQyxHQUFHLE9BQU8sQ0FBQyxHQUFHLENBQUMsYUFBYSxJQUFJLHlCQUFhLDhCQUE4QixJQUFJLEVBQUUsRUFBRSxFQUFDLE9BQU8sRUFBRSxFQUFDLFdBQVcsRUFBRSxPQUFPLENBQUMsR0FBRyxDQUFDLGFBQWEsRUFBQyxFQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQztBQUMxSyxDQUFDLENBQUM7QUFFRjs7R0FFRztBQUNVLFFBQUEscUJBQXFCLEdBQUcsS0FBSyxFQUFFLElBQW9CLEVBQW9CLEVBQUU7SUFDbEYsTUFBTSxrQ0FBZ0IsQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUM3QixPQUFPLENBQUMsTUFBTSxlQUFLLENBQUMsSUFBSSxDQUFDLEdBQUcsT0FBTyxDQUFDLEdBQUcsQ0FBQyxhQUFhLElBQUkseUJBQWEsNEJBQTRCLEVBQUUsSUFBSSxFQUFDLEVBQUMsT0FBTyxFQUFFLEVBQUMsV0FBVyxFQUFFLE9BQU8sQ0FBQyxHQUFHLENBQUMsYUFBYSxFQUFDLEVBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDO0FBQ3hLLENBQUMsQ0FBQztBQUVGOztHQUVHO0FBQ1UsUUFBQSxxQkFBcUIsR0FBRyxLQUFLLEVBQUUsSUFBb0IsRUFBaUIsRUFBRTtJQUMvRSxNQUFNLGtDQUFnQixDQUFDLElBQUksQ0FBQyxDQUFDO0lBQzdCLE1BQU0sZUFBSyxDQUFDLEdBQUcsQ0FBQyxHQUFHLE9BQU8sQ0FBQyxHQUFHLENBQUMsYUFBYSxJQUFJLHlCQUFhLDZCQUE2QixFQUFFLElBQUksRUFBRSxFQUFDLE9BQU8sRUFBRSxFQUFDLFdBQVcsRUFBRSxPQUFPLENBQUMsR0FBRyxDQUFDLGFBQWEsRUFBQyxFQUFDLENBQUMsQ0FBQztBQUMzSixDQUFDLENBQUM7QUFFRjs7R0FFRztBQUNVLFFBQUEsbUJBQW1CLEdBQUcsS0FBSyxFQUFFLElBQXVCLEVBQWtDLEVBQUU7SUFDakcsTUFBTSxrQ0FBZ0IsQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUM3QixPQUFPLENBQUMsTUFBTSxlQUFLLENBQUMsR0FBRyxDQUFDLEdBQUcsT0FBTyxDQUFDLEdBQUcsQ0FBQyxhQUFhLElBQUkseUJBQWEsaUNBQWlDLEVBQUUsSUFBSSxFQUFFLEVBQUMsT0FBTyxFQUFFLEVBQUMsV0FBVyxFQUFFLE9BQU8sQ0FBQyxHQUFHLENBQUMsYUFBYSxFQUFDLEVBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDO0FBQzdLLENBQUMsQ0FBQztBQUVGOztHQUVHO0FBQ1UsUUFBQSxxQkFBcUIsR0FBRyxLQUFLLEVBQUUsSUFBdUIsRUFBa0MsRUFBRTtJQUNuRyxNQUFNLGtDQUFnQixDQUFDLElBQUksQ0FBQyxDQUFDO0lBQzdCLE9BQU8sQ0FBQyxNQUFNLGVBQUssQ0FBQyxHQUFHLENBQUMsR0FBRyxPQUFPLENBQUMsR0FBRyxDQUFDLGFBQWEsSUFBSSx5QkFBYSxtQ0FBbUMsRUFBRSxJQUFJLEVBQUUsRUFBQyxPQUFPLEVBQUUsRUFBQyxXQUFXLEVBQUUsT0FBTyxDQUFDLEdBQUcsQ0FBQyxhQUFhLEVBQUMsRUFBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUM7QUFDL0ssQ0FBQyxDQUFDIn0=