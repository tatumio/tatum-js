"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.obtainReportForSubscription = exports.cancelExistingSubscription = exports.listActiveSubscriptions = exports.createNewSubscription = void 0;
const axios_1 = __importDefault(require("axios"));
const constants_1 = require("../constants");
/**
 * For more details, see <a href="https://tatum.io/apidoc#operation/createSubscription" target="_blank">Tatum API documentation</a>
 */
exports.createNewSubscription = async (data) => {
    return (await axios_1.default.post(`${process.env.TATUM_API_URL || constants_1.TATUM_API_URL}/v3/subscription`, data, { headers: { 'x-api-key': process.env.TATUM_API_KEY } })).data;
};
/**
 * For more details, see <a href="https://tatum.io/apidoc#operation/getSubscriptions" target="_blank">Tatum API documentation</a>
 */
exports.listActiveSubscriptions = async (pageSize = 50, offset = 0) => {
    return (await axios_1.default.get(`${process.env.TATUM_API_URL || constants_1.TATUM_API_URL}/v3/subscription?pageSize=${pageSize}&offset=${offset}`, { headers: { 'x-api-key': process.env.TATUM_API_KEY } })).data;
};
/**
 * For more details, see <a href="https://tatum.io/apidoc#operation/deleteSubscription" target="_blank">Tatum API documentation</a>
 */
exports.cancelExistingSubscription = async (id) => {
    await axios_1.default.delete(`${process.env.TATUM_API_URL || constants_1.TATUM_API_URL}/v3/subscription/${id}`, { headers: { 'x-api-key': process.env.TATUM_API_KEY } });
};
/**
 * For more details, see <a href="https://tatum.io/apidoc#operation/getSubscriptionReport" target="_blank">Tatum API documentation</a>
 */
exports.obtainReportForSubscription = async (id) => {
    return (await axios_1.default.get(`${process.env.TATUM_API_URL || constants_1.TATUM_API_URL}/v3/subscription/report/${id}`, { headers: { 'x-api-key': process.env.TATUM_API_KEY } })).data;
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3Vic2NyaXB0aW9uLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL2xlZGdlci9zdWJzY3JpcHRpb24udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQUEsa0RBQTBCO0FBQzFCLDRDQUEyQztBQUkzQzs7R0FFRztBQUNVLFFBQUEscUJBQXFCLEdBQUcsS0FBSyxFQUFFLElBQXdCLEVBQTJCLEVBQUU7SUFDN0YsT0FBTyxDQUFDLE1BQU0sZUFBSyxDQUFDLElBQUksQ0FBQyxHQUFHLE9BQU8sQ0FBQyxHQUFHLENBQUMsYUFBYSxJQUFJLHlCQUFhLGtCQUFrQixFQUFFLElBQUksRUFBRSxFQUFDLE9BQU8sRUFBRSxFQUFDLFdBQVcsRUFBRSxPQUFPLENBQUMsR0FBRyxDQUFDLGFBQWEsRUFBQyxFQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQztBQUMvSixDQUFDLENBQUM7QUFFRjs7R0FFRztBQUNVLFFBQUEsdUJBQXVCLEdBQUcsS0FBSyxFQUFFLFdBQW1CLEVBQUUsRUFBRSxTQUFpQixDQUFDLEVBQTJCLEVBQUU7SUFDaEgsT0FBTyxDQUFDLE1BQU0sZUFBSyxDQUFDLEdBQUcsQ0FBQyxHQUFHLE9BQU8sQ0FBQyxHQUFHLENBQUMsYUFBYSxJQUFJLHlCQUFhLDZCQUE2QixRQUFRLFdBQVcsTUFBTSxFQUFFLEVBQUUsRUFBRSxPQUFPLEVBQUUsRUFBRSxXQUFXLEVBQUUsT0FBTyxDQUFDLEdBQUcsQ0FBQyxhQUFhLEVBQUUsRUFBRSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUE7QUFDak0sQ0FBQyxDQUFBO0FBRUQ7O0dBRUc7QUFDVSxRQUFBLDBCQUEwQixHQUFHLEtBQUssRUFBRSxFQUFVLEVBQWlCLEVBQUU7SUFDMUUsTUFBTSxlQUFLLENBQUMsTUFBTSxDQUFDLEdBQUcsT0FBTyxDQUFDLEdBQUcsQ0FBQyxhQUFhLElBQUkseUJBQWEsb0JBQW9CLEVBQUUsRUFBRSxFQUFFLEVBQUMsT0FBTyxFQUFFLEVBQUMsV0FBVyxFQUFFLE9BQU8sQ0FBQyxHQUFHLENBQUMsYUFBYSxFQUFDLEVBQUMsQ0FBQyxDQUFDO0FBQ25KLENBQUMsQ0FBQztBQUVGOztHQUVHO0FBQ1UsUUFBQSwyQkFBMkIsR0FBRyxLQUFLLEVBQUUsRUFBVSxFQUFzQyxFQUFFO0lBQ2hHLE9BQU8sQ0FBQyxNQUFNLGVBQUssQ0FBQyxHQUFHLENBQUMsR0FBRyxPQUFPLENBQUMsR0FBRyxDQUFDLGFBQWEsSUFBSSx5QkFBYSwyQkFBMkIsRUFBRSxFQUFFLEVBQUUsRUFBQyxPQUFPLEVBQUUsRUFBQyxXQUFXLEVBQUUsT0FBTyxDQUFDLEdBQUcsQ0FBQyxhQUFhLEVBQUMsRUFBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUE7QUFDcEssQ0FBQyxDQUFDIn0=