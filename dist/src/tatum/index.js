"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getExchangeRate = void 0;
const axios_1 = __importDefault(require("axios"));
const constants_1 = require("../constants");
const response_1 = require("../model/response");
/**
 * For more details, see <a href="https://tatum.io/apidoc#operation/getExchangeRate" target="_blank">Tatum API documentation</a>
 */
exports.getExchangeRate = async (currency, basePair = response_1.Fiat.EUR) => {
    return (await axios_1.default.get(`${process.env.TATUM_API_URL || constants_1.TATUM_API_URL}/v3/tatum/rate/${currency}?basePair=${basePair}`, { headers: { 'x-api-key': process.env.TATUM_API_KEY } })).data;
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvdGF0dW0vaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQUEsa0RBQTBCO0FBQzFCLDRDQUEyQztBQUUzQyxnREFBdUM7QUFHdkM7O0dBRUc7QUFDVSxRQUFBLGVBQWUsR0FBRyxLQUFLLEVBQUUsUUFBeUIsRUFBRSxRQUFRLEdBQUcsZUFBSSxDQUFDLEdBQUcsRUFBaUIsRUFBRTtJQUNuRyxPQUFPLENBQUMsTUFBTSxlQUFLLENBQUMsR0FBRyxDQUFDLEdBQUcsT0FBTyxDQUFDLEdBQUcsQ0FBQyxhQUFhLElBQUkseUJBQWEsa0JBQWtCLFFBQVEsYUFBYSxRQUFRLEVBQUUsRUFBRSxFQUFDLE9BQU8sRUFBRSxFQUFDLFdBQVcsRUFBRSxPQUFPLENBQUMsR0FBRyxDQUFDLGFBQWEsRUFBQyxFQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQztBQUN2TCxDQUFDLENBQUMifQ==