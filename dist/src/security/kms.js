"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getPendingTransactionsKMSByChain = exports.completePendingTransactionKMS = exports.deleteTransactionKMS = exports.getTransactionKMS = void 0;
const axios_1 = __importDefault(require("axios"));
const constants_1 = require("../constants");
/**
 * For more details, see <a href="https://tatum.io/apidoc#operation/GetPendingTransactionToSign" target="_blank">Tatum API documentation</a>
 */
exports.getTransactionKMS = async (id) => {
    return (await axios_1.default.get(`${process.env.TATUM_API_URL || constants_1.TATUM_API_URL}/v3/kms/${id}`, { headers: { 'x-api-key': process.env.TATUM_API_KEY } })).data;
};
/**
 * For more details, see <a href="https://tatum.io/apidoc#operation/DeletePendingTransactionToSign" target="_blank">Tatum API documentation</a>
 */
exports.deleteTransactionKMS = async (id, revert = true) => {
    await axios_1.default.delete(`${process.env.TATUM_API_URL || constants_1.TATUM_API_URL}/v3/kms/${id}/${revert}`, { headers: { 'x-api-key': process.env.TATUM_API_KEY } });
};
/**
 * For more details, see <a href="https://tatum.io/apidoc#operation/CompletePendingSignature" target="_blank">Tatum API documentation</a>
 */
exports.completePendingTransactionKMS = async (id, txId) => {
    await axios_1.default.put(`${process.env.TATUM_API_URL || constants_1.TATUM_API_URL}/v3/kms/${id}/${txId}`, undefined, { headers: { 'x-api-key': process.env.TATUM_API_KEY } });
};
/**
 * For more details, see <a href="https://tatum.io/apidoc#operation/GetPendingTransactionsToSign" target="_blank">Tatum API documentation</a>
 */
exports.getPendingTransactionsKMSByChain = async (chain) => {
    return (await axios_1.default.get(`${process.env.TATUM_API_URL || constants_1.TATUM_API_URL}/v3/kms/pending/${chain}`, { headers: { 'x-api-key': process.env.TATUM_API_KEY } })).data;
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoia21zLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL3NlY3VyaXR5L2ttcy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7QUFBQSxrREFBMEI7QUFDMUIsNENBQTJDO0FBSTNDOztHQUVHO0FBQ1UsUUFBQSxpQkFBaUIsR0FBRyxLQUFLLEVBQUUsRUFBVSxFQUEyQixFQUFFO0lBQzNFLE9BQU8sQ0FBQyxNQUFNLGVBQUssQ0FBQyxHQUFHLENBQUMsR0FBRyxPQUFPLENBQUMsR0FBRyxDQUFDLGFBQWEsSUFBSSx5QkFBYSxXQUFXLEVBQUUsRUFBRSxFQUFFLEVBQUMsT0FBTyxFQUFFLEVBQUMsV0FBVyxFQUFFLE9BQU8sQ0FBQyxHQUFHLENBQUMsYUFBYSxFQUFDLEVBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDO0FBQ3JKLENBQUMsQ0FBQztBQUVGOztHQUVHO0FBQ1UsUUFBQSxvQkFBb0IsR0FBRyxLQUFLLEVBQUUsRUFBVSxFQUFFLE1BQU0sR0FBRyxJQUFJLEVBQWlCLEVBQUU7SUFDbkYsTUFBTSxlQUFLLENBQUMsTUFBTSxDQUFDLEdBQUcsT0FBTyxDQUFDLEdBQUcsQ0FBQyxhQUFhLElBQUkseUJBQWEsV0FBVyxFQUFFLElBQUksTUFBTSxFQUFFLEVBQUUsRUFBQyxPQUFPLEVBQUUsRUFBQyxXQUFXLEVBQUUsT0FBTyxDQUFDLEdBQUcsQ0FBQyxhQUFhLEVBQUMsRUFBQyxDQUFDLENBQUM7QUFDcEosQ0FBQyxDQUFDO0FBRUY7O0dBRUc7QUFDVSxRQUFBLDZCQUE2QixHQUFHLEtBQUssRUFBRSxFQUFVLEVBQUUsSUFBWSxFQUFpQixFQUFFO0lBQzNGLE1BQU0sZUFBSyxDQUFDLEdBQUcsQ0FBQyxHQUFHLE9BQU8sQ0FBQyxHQUFHLENBQUMsYUFBYSxJQUFJLHlCQUFhLFdBQVcsRUFBRSxJQUFJLElBQUksRUFBRSxFQUFFLFNBQVMsRUFBRSxFQUFDLE9BQU8sRUFBRSxFQUFDLFdBQVcsRUFBRSxPQUFPLENBQUMsR0FBRyxDQUFDLGFBQWEsRUFBQyxFQUFDLENBQUMsQ0FBQztBQUMxSixDQUFDLENBQUM7QUFFRjs7R0FFRztBQUNVLFFBQUEsZ0NBQWdDLEdBQUcsS0FBSyxFQUFFLEtBQWUsRUFBNkIsRUFBRTtJQUNqRyxPQUFPLENBQUMsTUFBTSxlQUFLLENBQUMsR0FBRyxDQUFDLEdBQUcsT0FBTyxDQUFDLEdBQUcsQ0FBQyxhQUFhLElBQUkseUJBQWEsbUJBQW1CLEtBQUssRUFBRSxFQUFFLEVBQUMsT0FBTyxFQUFFLEVBQUMsV0FBVyxFQUFFLE9BQU8sQ0FBQyxHQUFHLENBQUMsYUFBYSxFQUFDLEVBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDO0FBQ2hLLENBQUMsQ0FBQyJ9