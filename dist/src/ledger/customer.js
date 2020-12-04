"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.disableCustomer = exports.enableCustomer = exports.deactivateCustomer = exports.activateCustomer = exports.updateCustomer = exports.getAllCustomers = exports.getCustomer = void 0;
const axios_1 = __importDefault(require("axios"));
const class_validator_1 = require("class-validator");
const constants_1 = require("../constants");
/**
 * For more details, see <a href="https://tatum.io/apidoc#operation/getCustomerByExternalId" target="_blank">Tatum API documentation</a>
 */
exports.getCustomer = async (id) => {
    return (await axios_1.default.get(`${process.env.TATUM_API_URL || constants_1.TATUM_API_URL}/v3/ledger/customer/${id}`, { headers: { 'x-api-key': process.env.TATUM_API_KEY } })).data;
};
/**
 * For more details, see <a href="https://tatum.io/apidoc#operation/findAllCustomers" target="_blank">Tatum API documentation</a>
 */
exports.getAllCustomers = async (pageSize = 50, offset = 0) => {
    return (await axios_1.default.get(`${process.env.TATUM_API_URL || constants_1.TATUM_API_URL}/v3/ledger/customer?pageSize=${pageSize}&offset=${offset}`, { headers: { 'x-api-key': process.env.TATUM_API_KEY } })).data;
};
/**
 * For more details, see <a href="https://tatum.io/apidoc#operation/updateCustomer" target="_blank">Tatum API documentation</a>
 */
exports.updateCustomer = async (id, data) => {
    await class_validator_1.validateOrReject(data);
    return (await axios_1.default.put(`${process.env.TATUM_API_URL || constants_1.TATUM_API_URL}/v3/ledger/customer/${id}`, data, { headers: { 'x-api-key': process.env.TATUM_API_KEY } })).data;
};
/**
 * For more details, see <a href="https://tatum.io/apidoc#operation/activateAccount" target="_blank">Tatum API documentation</a>
 */
exports.activateCustomer = async (id) => {
    await axios_1.default.put(`${process.env.TATUM_API_URL || constants_1.TATUM_API_URL}/v3/ledger/customer/${id}/activate`, undefined, { headers: { 'x-api-key': process.env.TATUM_API_KEY } });
};
/**
 * For more details, see <a href="https://tatum.io/apidoc#operation/deactivateCustomer" target="_blank">Tatum API documentation</a>
 */
exports.deactivateCustomer = async (id) => {
    await axios_1.default.put(`${process.env.TATUM_API_URL || constants_1.TATUM_API_URL}/v3/ledger/customer/${id}/deactivate`, undefined, { headers: { 'x-api-key': process.env.TATUM_API_KEY } });
};
/**
 * For more details, see <a href="https://tatum.io/apidoc#operation/enableCustomer" target="_blank">Tatum API documentation</a>
 */
exports.enableCustomer = async (id) => {
    await axios_1.default.put(`${process.env.TATUM_API_URL || constants_1.TATUM_API_URL}/v3/ledger/customer/${id}/enable`, undefined, { headers: { 'x-api-key': process.env.TATUM_API_KEY } });
};
/**
 * For more details, see <a href="https://tatum.io/apidoc#operation/disableCustomer" target="_blank">Tatum API documentation</a>
 */
exports.disableCustomer = async (id) => {
    await axios_1.default.put(`${process.env.TATUM_API_URL || constants_1.TATUM_API_URL}/v3/ledger/customer/${id}/disable`, undefined, { headers: { 'x-api-key': process.env.TATUM_API_KEY } });
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY3VzdG9tZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvbGVkZ2VyL2N1c3RvbWVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7OztBQUFBLGtEQUEwQjtBQUMxQixxREFBaUQ7QUFDakQsNENBQTJDO0FBSTNDOztHQUVHO0FBQ1UsUUFBQSxXQUFXLEdBQUcsS0FBSyxFQUFFLEVBQVUsRUFBcUIsRUFBRTtJQUMvRCxPQUFPLENBQUMsTUFBTSxlQUFLLENBQUMsR0FBRyxDQUFDLEdBQUcsT0FBTyxDQUFDLEdBQUcsQ0FBQyxhQUFhLElBQUkseUJBQWEsdUJBQXVCLEVBQUUsRUFBRSxFQUFFLEVBQUMsT0FBTyxFQUFFLEVBQUMsV0FBVyxFQUFFLE9BQU8sQ0FBQyxHQUFHLENBQUMsYUFBYSxFQUFDLEVBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDO0FBQ2pLLENBQUMsQ0FBQztBQUVGOztHQUVHO0FBQ1UsUUFBQSxlQUFlLEdBQUcsS0FBSyxFQUFFLFdBQW1CLEVBQUUsRUFBRSxNQUFNLEdBQUcsQ0FBQyxFQUF1QixFQUFFO0lBQzVGLE9BQU8sQ0FBQyxNQUFNLGVBQUssQ0FBQyxHQUFHLENBQUMsR0FBRyxPQUFPLENBQUMsR0FBRyxDQUFDLGFBQWEsSUFBSSx5QkFBYSxnQ0FBZ0MsUUFBUSxXQUFXLE1BQU0sRUFBRSxFQUFFLEVBQUMsT0FBTyxFQUFFLEVBQUMsV0FBVyxFQUFFLE9BQU8sQ0FBQyxHQUFHLENBQUMsYUFBYSxFQUFDLEVBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDO0FBQ2pNLENBQUMsQ0FBQztBQUVGOztHQUVHO0FBQ1UsUUFBQSxjQUFjLEdBQUcsS0FBSyxFQUFFLEVBQVUsRUFBRSxJQUFvQixFQUEyQixFQUFFO0lBQzlGLE1BQU0sa0NBQWdCLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDN0IsT0FBTyxDQUFDLE1BQU0sZUFBSyxDQUFDLEdBQUcsQ0FBQyxHQUFHLE9BQU8sQ0FBQyxHQUFHLENBQUMsYUFBYSxJQUFJLHlCQUFhLHVCQUF1QixFQUFFLEVBQUUsRUFBRSxJQUFJLEVBQUUsRUFBQyxPQUFPLEVBQUUsRUFBQyxXQUFXLEVBQUUsT0FBTyxDQUFDLEdBQUcsQ0FBQyxhQUFhLEVBQUMsRUFBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUM7QUFDdkssQ0FBQyxDQUFDO0FBRUY7O0dBRUc7QUFDVSxRQUFBLGdCQUFnQixHQUFHLEtBQUssRUFBRSxFQUFVLEVBQWlCLEVBQUU7SUFDaEUsTUFBTSxlQUFLLENBQUMsR0FBRyxDQUFDLEdBQUcsT0FBTyxDQUFDLEdBQUcsQ0FBQyxhQUFhLElBQUkseUJBQWEsdUJBQXVCLEVBQUUsV0FBVyxFQUFFLFNBQVMsRUFBRSxFQUFDLE9BQU8sRUFBRSxFQUFDLFdBQVcsRUFBRSxPQUFPLENBQUMsR0FBRyxDQUFDLGFBQWEsRUFBQyxFQUFDLENBQUMsQ0FBQztBQUN2SyxDQUFDLENBQUM7QUFFRjs7R0FFRztBQUNVLFFBQUEsa0JBQWtCLEdBQUcsS0FBSyxFQUFFLEVBQVUsRUFBaUIsRUFBRTtJQUNsRSxNQUFNLGVBQUssQ0FBQyxHQUFHLENBQUMsR0FBRyxPQUFPLENBQUMsR0FBRyxDQUFDLGFBQWEsSUFBSSx5QkFBYSx1QkFBdUIsRUFBRSxhQUFhLEVBQUUsU0FBUyxFQUFFLEVBQUMsT0FBTyxFQUFFLEVBQUMsV0FBVyxFQUFFLE9BQU8sQ0FBQyxHQUFHLENBQUMsYUFBYSxFQUFDLEVBQUMsQ0FBQyxDQUFDO0FBQ3pLLENBQUMsQ0FBQztBQUVGOztHQUVHO0FBQ1UsUUFBQSxjQUFjLEdBQUcsS0FBSyxFQUFFLEVBQVUsRUFBaUIsRUFBRTtJQUM5RCxNQUFNLGVBQUssQ0FBQyxHQUFHLENBQUMsR0FBRyxPQUFPLENBQUMsR0FBRyxDQUFDLGFBQWEsSUFBSSx5QkFBYSx1QkFBdUIsRUFBRSxTQUFTLEVBQUUsU0FBUyxFQUFFLEVBQUMsT0FBTyxFQUFFLEVBQUMsV0FBVyxFQUFFLE9BQU8sQ0FBQyxHQUFHLENBQUMsYUFBYSxFQUFDLEVBQUMsQ0FBQyxDQUFDO0FBQ3JLLENBQUMsQ0FBQztBQUVGOztHQUVHO0FBQ1UsUUFBQSxlQUFlLEdBQUcsS0FBSyxFQUFFLEVBQVUsRUFBaUIsRUFBRTtJQUMvRCxNQUFNLGVBQUssQ0FBQyxHQUFHLENBQUMsR0FBRyxPQUFPLENBQUMsR0FBRyxDQUFDLGFBQWEsSUFBSSx5QkFBYSx1QkFBdUIsRUFBRSxVQUFVLEVBQUUsU0FBUyxFQUFFLEVBQUMsT0FBTyxFQUFFLEVBQUMsV0FBVyxFQUFFLE9BQU8sQ0FBQyxHQUFHLENBQUMsYUFBYSxFQUFDLEVBQUMsQ0FBQyxDQUFDO0FBQ3RLLENBQUMsQ0FBQyJ9