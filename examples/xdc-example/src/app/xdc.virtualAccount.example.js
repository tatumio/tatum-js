"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
exports.xdcVirtualAccountExample = void 0;
var xdc_1 = require("@tatumio/xdc");
var xdcSdk = (0, xdc_1.TatumXdcSDK)({ apiKey: '75ea3138-d0a1-47df-932e-acb3ee807dab' });
function xdcVirtualAccountExample() {
    return __awaiter(this, void 0, void 0, function () {
        var account, address, addresses, assignedAddress, addressByAccount, withdrawals;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, xdcSdk.virtualAccount.depositAddress.checkExists('0xa7673161CbfE0116A4De9E341f8465940c2211d4')];
                case 1:
                    account = _a.sent();
                    console.log("Account information ".concat(JSON.stringify(account)));
                    return [4 /*yield*/, xdcSdk.virtualAccount.depositAddress.create('0xa7673161CbfE0116A4De9E341f8465940c2211d4', 1)];
                case 2:
                    address = _a.sent();
                    console.log("Address information ".concat(JSON.stringify(address)));
                    return [4 /*yield*/, xdcSdk.virtualAccount.depositAddress.createMultiple({
                            addresses: [
                                {
                                    accountId: '5e6be8e9e6aa436299950c41',
                                    derivationKey: 0
                                },
                                {
                                    accountId: '5e6be8e9e6aa436299951n35',
                                    derivationKey: 1
                                },
                            ]
                        })];
                case 3:
                    addresses = _a.sent();
                    console.log("Information for all addresses ".concat(JSON.stringify(addresses)));
                    return [4 /*yield*/, xdcSdk.virtualAccount.depositAddress.assign('5e6be8e9e6aa436299950c41', '0xa7673161CbfE0116A4De9E341f8465940c2211d4')];
                case 4:
                    assignedAddress = _a.sent();
                    console.log("Address information ".concat(JSON.stringify(assignedAddress)));
                    return [4 /*yield*/, xdcSdk.virtualAccount.depositAddress.getByAccount('5e6be8e9e6aa436299950c41')];
                case 5:
                    addressByAccount = _a.sent();
                    console.log("Information for all addresses ".concat(JSON.stringify(addressByAccount)));
                    return [4 /*yield*/, xdcSdk.virtualAccount.withdrawal.getAll('Done')];
                case 6:
                    withdrawals = _a.sent();
                    console.log("Get all withdrawals ".concat(JSON.stringify(withdrawals)));
                    // Remove a deposit address from a virtual account
                    // https://apidoc.tatum.io/tag/Blockchain-addresses#operation/removeAddress
                    return [4 /*yield*/, xdcSdk.virtualAccount.depositAddress.remove('5e6be8e9e6aa436299950c41', '0xa7673161CbfE0116A4De9E341f8465940c2211d4')];
                case 7:
                    // Remove a deposit address from a virtual account
                    // https://apidoc.tatum.io/tag/Blockchain-addresses#operation/removeAddress
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    });
}
exports.xdcVirtualAccountExample = xdcVirtualAccountExample;
