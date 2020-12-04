"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.countTransactionsByLedger = exports.countTransactionsByCustomer = exports.countTransactionsByAccount = exports.getTransactionsByLedger = exports.getTransactionsByCustomer = exports.getTransactionsByAccount = exports.storeTransaction = exports.getTransactionsByReference = void 0;
const axios_1 = __importDefault(require("axios"));
const class_validator_1 = require("class-validator");
const constants_1 = require("../constants");
/**
 * For more details, see <a href="https://tatum.io/apidoc#operation/getTransactionsByReference" target="_blank">Tatum API documentation</a>
 */
exports.getTransactionsByReference = async (reference) => {
    return (await axios_1.default.get(`${process.env.TATUM_API_URL || constants_1.TATUM_API_URL}/v3/ledger/transaction/reference/${reference}`, { headers: { 'x-api-key': process.env.TATUM_API_KEY } })).data;
};
/**
 * For more details, see <a href="https://tatum.io/apidoc#operation/sendTransaction" target="_blank">Tatum API documentation</a>
 */
exports.storeTransaction = async (transaction) => {
    await class_validator_1.validateOrReject(transaction);
    return (await axios_1.default.post(`${process.env.TATUM_API_URL || constants_1.TATUM_API_URL}/v3/ledger/transaction`, transaction, { headers: { 'x-api-key': process.env.TATUM_API_KEY } })).data;
};
/**
 * For more details, see <a href="https://tatum.io/apidoc#operation/getTransactionsByAccountId" target="_blank">Tatum API documentation</a>
 */
exports.getTransactionsByAccount = async (filter, pageSize = 50, offset = 0) => {
    await class_validator_1.validateOrReject(filter);
    return (await axios_1.default.post(`${process.env.TATUM_API_URL || constants_1.TATUM_API_URL}/v3/ledger/transaction/account?pageSize=${pageSize}&offset=${offset}`, filter, { headers: { 'x-api-key': process.env.TATUM_API_KEY } })).data;
};
/**
 * For more details, see <a href="https://tatum.io/apidoc#operation/getTransactionsByCustomerId" target="_blank">Tatum API documentation</a>
 */
exports.getTransactionsByCustomer = async (filter, pageSize = 50, offset = 0) => {
    await class_validator_1.validateOrReject(filter);
    return (await axios_1.default.post(`${process.env.TATUM_API_URL || constants_1.TATUM_API_URL}/v3/ledger/transaction/customer?pageSize=${pageSize}&offset=${offset}`, filter, { headers: { 'x-api-key': process.env.TATUM_API_KEY } })).data;
};
/**
 * For more details, see <a href="https://tatum.io/apidoc#operation/getTransactions" target="_blank">Tatum API documentation</a>
 */
exports.getTransactionsByLedger = async (filter, pageSize = 50, offset = 0) => {
    await class_validator_1.validateOrReject(filter);
    return (await axios_1.default.post(`${process.env.TATUM_API_URL || constants_1.TATUM_API_URL}/v3/ledger/transaction/ledger?pageSize=${pageSize}&offset=${offset}`, filter, { headers: { 'x-api-key': process.env.TATUM_API_KEY } })).data;
};
/**
 * For more details, see <a href="https://tatum.io/apidoc#operation/getTransactionsByAccountId" target="_blank">Tatum API documentation</a>
 */
exports.countTransactionsByAccount = async (filter) => {
    await class_validator_1.validateOrReject(filter);
    return (await axios_1.default.post(`${process.env.TATUM_API_URL || constants_1.TATUM_API_URL}/v3/ledger/transaction/account?count=true`, filter, { headers: { 'x-api-key': process.env.TATUM_API_KEY } })).data;
};
/**
 * For more details, see <a href="https://tatum.io/apidoc#operation/getTransactionsByCustomerId" target="_blank">Tatum API documentation</a>
 */
exports.countTransactionsByCustomer = async (filter) => {
    await class_validator_1.validateOrReject(filter);
    return (await axios_1.default.post(`${process.env.TATUM_API_URL || constants_1.TATUM_API_URL}/v3/ledger/transaction/customer?count=true`, filter, { headers: { 'x-api-key': process.env.TATUM_API_KEY } })).data;
};
/**
 * For more details, see <a href="https://tatum.io/apidoc#operation/getTransactions" target="_blank">Tatum API documentation</a>
 */
exports.countTransactionsByLedger = async (filter) => {
    await class_validator_1.validateOrReject(filter);
    return (await axios_1.default.post(`${process.env.TATUM_API_URL || constants_1.TATUM_API_URL}/v3/ledger/transaction/ledger?count=true`, filter, { headers: { 'x-api-key': process.env.TATUM_API_KEY } })).data;
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidHJhbnNhY3Rpb24uanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvbGVkZ2VyL3RyYW5zYWN0aW9uLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7OztBQUFBLGtEQUEwQjtBQUMxQixxREFBaUQ7QUFDakQsNENBQTJDO0FBRzNDOztHQUVHO0FBQ1UsUUFBQSwwQkFBMEIsR0FBRyxLQUFLLEVBQUUsU0FBaUIsRUFBMEIsRUFBRTtJQUMxRixPQUFPLENBQUMsTUFBTSxlQUFLLENBQUMsR0FBRyxDQUFDLEdBQUcsT0FBTyxDQUFDLEdBQUcsQ0FBQyxhQUFhLElBQUkseUJBQWEsb0NBQW9DLFNBQVMsRUFBRSxFQUFFLEVBQUMsT0FBTyxFQUFFLEVBQUMsV0FBVyxFQUFFLE9BQU8sQ0FBQyxHQUFHLENBQUMsYUFBYSxFQUFDLEVBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDO0FBQ3JMLENBQUMsQ0FBQztBQUVGOztHQUVHO0FBQ1UsUUFBQSxnQkFBZ0IsR0FBRyxLQUFLLEVBQUUsV0FBOEIsRUFBa0MsRUFBRTtJQUNyRyxNQUFNLGtDQUFnQixDQUFDLFdBQVcsQ0FBQyxDQUFDO0lBQ3BDLE9BQU8sQ0FBQyxNQUFNLGVBQUssQ0FBQyxJQUFJLENBQUMsR0FBRyxPQUFPLENBQUMsR0FBRyxDQUFDLGFBQWEsSUFBSSx5QkFBYSx3QkFBd0IsRUFBRSxXQUFXLEVBQUUsRUFBQyxPQUFPLEVBQUUsRUFBQyxXQUFXLEVBQUUsT0FBTyxDQUFDLEdBQUcsQ0FBQyxhQUFhLEVBQUMsRUFBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUM7QUFDNUssQ0FBQyxDQUFDO0FBRUY7O0dBRUc7QUFDVSxRQUFBLHdCQUF3QixHQUFHLEtBQUssRUFBRSxNQUF5QixFQUFFLFdBQW1CLEVBQUUsRUFBRSxTQUFpQixDQUFDLEVBQTBCLEVBQUU7SUFDM0ksTUFBTSxrQ0FBZ0IsQ0FBQyxNQUFNLENBQUMsQ0FBQztJQUMvQixPQUFPLENBQUMsTUFBTSxl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