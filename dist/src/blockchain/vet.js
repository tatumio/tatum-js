"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.vetGetTransactionReceipt = exports.vetGetTransaction = exports.vetGetAccountEnergy = exports.vetGetAccountBalance = exports.vetGetBlock = exports.vetGetCurrentBlock = exports.vetEstimateGas = exports.vetBroadcast = void 0;
const axios_1 = __importDefault(require("axios"));
const class_validator_1 = require("class-validator");
const constants_1 = require("../constants");
/**
 * For more details, see <a href="https://tatum.io/apidoc#operation/VetBroadcast" target="_blank">Tatum API documentation</a>
 */
exports.vetBroadcast = async (txData, signatureId) => {
    return (await axios_1.default.post(`${process.env.TATUM_API_URL || constants_1.TATUM_API_URL}/v3/vet/broadcast`, { txData, signatureId }, { headers: { 'x-api-key': process.env.TATUM_API_KEY } })).data;
};
/**
 * For more details, see <a href="https://tatum.io/apidoc#operation/VetEstimateGas" target="_blank">Tatum API documentation</a>
 */
exports.vetEstimateGas = async (body) => {
    await class_validator_1.validateOrReject(body);
    return (await axios_1.default.post(`${process.env.TATUM_API_URL || constants_1.TATUM_API_URL}/v3/vet/broadcast/transaction/gas`, body, { headers: { 'x-api-key': process.env.TATUM_API_KEY } })).data;
};
/**
 * For more details, see <a href="https://tatum.io/apidoc#operation/VetGetCurrentBlock" target="_blank">Tatum API documentation</a>
 */
exports.vetGetCurrentBlock = async () => {
    return (await axios_1.default.get(`${process.env.TATUM_API_URL || constants_1.TATUM_API_URL}/v3/vet/current`, { headers: { 'x-api-key': process.env.TATUM_API_KEY } })).data;
};
/**
 * For more details, see <a href="https://tatum.io/apidoc#operation/VetGetBlock" target="_blank">Tatum API documentation</a>
 */
exports.vetGetBlock = async (hash) => {
    return (await axios_1.default.get(`${process.env.TATUM_API_URL || constants_1.TATUM_API_URL}/v3/vet/block/${hash}`, { headers: { 'x-api-key': process.env.TATUM_API_KEY } })).data;
};
/**
 * For more details, see <a href="https://tatum.io/apidoc#operation/VetGetBalance" target="_blank">Tatum API documentation</a>
 */
exports.vetGetAccountBalance = async (address) => {
    return (await axios_1.default.get(`${process.env.TATUM_API_URL || constants_1.TATUM_API_URL}/v3/vet/account/balance/${address}`, { headers: { 'x-api-key': process.env.TATUM_API_KEY } })).data;
};
/**
 * For more details, see <a href="https://tatum.io/apidoc#operation/VetGetEnergy" target="_blank">Tatum API documentation</a>
 */
exports.vetGetAccountEnergy = async (address) => {
    return (await axios_1.default.get(`${process.env.TATUM_API_URL || constants_1.TATUM_API_URL}/v3/vet/account/energy/${address}`, { headers: { 'x-api-key': process.env.TATUM_API_KEY } })).data;
};
/**
 * For more details, see <a href="https://tatum.io/apidoc#operation/VetGetTransaction" target="_blank">Tatum API documentation</a>
 */
exports.vetGetTransaction = async (hash) => {
    return (await axios_1.default.get(`${process.env.TATUM_API_URL || constants_1.TATUM_API_URL}/v3/vet/transaction/${hash}`, { headers: { 'x-api-key': process.env.TATUM_API_KEY } })).data;
};
/**
 * For more details, see <a href="https://tatum.io/apidoc#operation/VetGetTransactionReceipt" target="_blank">Tatum API documentation</a>
 */
exports.vetGetTransactionReceipt = async (hash) => {
    return (await axios_1.default.get(`${process.env.TATUM_API_URL || constants_1.TATUM_API_URL}/v3/vet/transaction/${hash}/receipt`, { headers: { 'x-api-key': process.env.TATUM_API_KEY } })).data;
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidmV0LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL2Jsb2NrY2hhaW4vdmV0LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7OztBQUFBLGtEQUEwQjtBQUMxQixxREFBaUQ7QUFDakQsNENBQTJDO0FBRzNDOztHQUVHO0FBQ1UsUUFBQSxZQUFZLEdBQUcsS0FBSyxFQUFFLE1BQWMsRUFBRSxXQUFvQixFQUE0QixFQUFFO0lBQ2pHLE9BQU8sQ0FBQyxNQUFNLGVBQUssQ0FBQyxJQUFJLENBQUMsR0FBRyxPQUFPLENBQUMsR0FBRyxDQUFDLGFBQWEsSUFBSSx5QkFBYSxtQkFBbUIsRUFDckYsRUFBQyxNQUFNLEVBQUUsV0FBVyxFQUFDLEVBQ3JCLEVBQUMsT0FBTyxFQUFFLEVBQUMsV0FBVyxFQUFFLE9BQU8sQ0FBQyxHQUFHLENBQUMsYUFBYSxFQUFDLEVBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDO0FBQ25FLENBQUMsQ0FBQztBQUVGOztHQUVHO0FBQ1UsUUFBQSxjQUFjLEdBQUcsS0FBSyxFQUFFLElBQW9CLEVBQTJCLEVBQUU7SUFDbEYsTUFBTSxrQ0FBZ0IsQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUM3QixPQUFPLENBQUMsTUFBTSxlQUFLLENBQUMsSUFBSSxDQUFDLEdBQUcsT0FBTyxDQUFDLEdBQUcsQ0FBQyxhQUFhLElBQUkseUJBQWEsbUNBQW1DLEVBQ3JHLElBQUksRUFDSixFQUFDLE9BQU8sRUFBRSxFQUFDLFdBQVcsRUFBRSxPQUFPLENBQUMsR0FBRyxDQUFDLGFBQWEsRUFBQyxFQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQztBQUNuRSxDQUFDLENBQUM7QUFFRjs7R0FFRztBQUNVLFFBQUEsa0JBQWtCLEdBQUcsS0FBSyxJQUFxQixFQUFFO0lBQzFELE9BQU8sQ0FBQyxNQUFNLGVBQUssQ0FBQyxHQUFHLENBQUMsR0FBRyxPQUFPLENBQUMsR0FBRyxDQUFDLGFBQWEsSUFBSSx5QkFBYSxpQkFBaUIsRUFBRSxFQUFDLE9BQU8sRUFBRSxFQUFDLFdBQVcsRUFBRSxPQUFPLENBQUMsR0FBRyxDQUFDLGFBQWEsRUFBQyxFQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQztBQUN2SixDQUFDLENBQUM7QUFFRjs7R0FFRztBQUNVLFFBQUEsV0FBVyxHQUFHLEtBQUssRUFBRSxJQUFZLEVBQXFCLEVBQUU7SUFDakUsT0FBTyxDQUFDLE1BQU0sZUFBSyxDQUFDLEdBQUcsQ0FBQyxHQUFHLE9BQU8sQ0FBQyxHQUFHLENBQUMsYUFBYSxJQUFJLHlCQUFhLGlCQUFpQixJQUFJLEVBQUUsRUFBRSxFQUFDLE9BQU8sRUFBRSxFQUFDLFdBQVcsRUFBRSxPQUFPLENBQUMsR0FBRyxDQUFDLGFBQWEsRUFBQyxFQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQztBQUM3SixDQUFDLENBQUM7QUFFRjs7R0FFRztBQUNVLFFBQUEsb0JBQW9CLEdBQUcsS0FBSyxFQUFFLE9BQWUsRUFBbUIsRUFBRTtJQUMzRSxPQUFPLENBQUMsTUFBTSxlQUFLLENBQUMsR0FBRyxDQUFDLEdBQUcsT0FBTyxDQUFDLEdBQUcsQ0FBQyxhQUFhLElBQUkseUJBQWEsMkJBQTJCLE9BQU8sRUFBRSxFQUFFLEVBQUMsT0FBTyxFQUFFLEVBQUMsV0FBVyxFQUFFLE9BQU8sQ0FBQyxHQUFHLENBQUMsYUFBYSxFQUFDLEVBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDO0FBQzFLLENBQUMsQ0FBQztBQUVGOztHQUVHO0FBQ1UsUUFBQSxtQkFBbUIsR0FBRyxLQUFLLEVBQUUsT0FBZSxFQUFtQixFQUFFO0lBQzFFLE9BQU8sQ0FBQyxNQUFNLGVBQUssQ0FBQyxHQUFHLENBQUMsR0FBRyxPQUFPLENBQUMsR0FBRyxDQUFDLGFBQWEsSUFBSSx5QkFBYSwwQkFBMEIsT0FBTyxFQUFFLEVBQUUsRUFBQyxPQUFPLEVBQUUsRUFBQyxXQUFXLEVBQUUsT0FBTyxDQUFDLEdBQUcsQ0FBQyxhQUFhLEVBQUMsRUFBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUM7QUFDekssQ0FBQyxDQUFDO0FBRUY7O0dBRUc7QUFDVSxRQUFBLGlCQUFpQixHQUFHLEtBQUssRUFBRSxJQUFZLEVBQWtCLEVBQUU7SUFDcEUsT0FBTyxDQUFDLE1BQU0sZUFBSyxDQUFDLEdBQUcsQ0FBQyxHQUFHLE9BQU8sQ0FBQyxHQUFHLENBQUMsYUFBYSxJQUFJLHlCQUFhLHVCQUF1QixJQUFJLEVBQUUsRUFBRSxFQUFDLE9BQU8sRUFBRSxFQUFDLFdBQVcsRUFBRSxPQUFPLENBQUMsR0FBRyxDQUFDLGFBQWEsRUFBQyxFQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQztBQUNuSyxDQUFDLENBQUM7QUFFRjs7R0FFRztBQUNVLFFBQUEsd0JBQXdCLEdBQUcsS0FBSyxFQUFFLElBQVksRUFBeUIsRUFBRTtJQUNsRixPQUFPLENBQUMsTUFBTSxlQUFLLENBQUMsR0FBRyxDQUFDLEdBQUcsT0FBTyxDQUFDLEdBQUcsQ0FBQyxhQUFhLElBQUkseUJBQWEsdUJBQXVCLElBQUksVUFBVSxFQUFFLEVBQUMsT0FBTyxFQUFFLEVBQUMsV0FBVyxFQUFFLE9BQU8sQ0FBQyxHQUFHLENBQUMsYUFBYSxFQUFDLEVBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDO0FBQzNLLENBQUMsQ0FBQyJ9