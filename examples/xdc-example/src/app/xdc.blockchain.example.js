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
exports.xdcBlockchainExample = void 0;
var xdc_1 = require("@tatumio/xdc");
var xdcSDK = (0, xdc_1.TatumXdcSDK)({ apiKey: '75ea3138-d0a1-47df-932e-acb3ee807dab' });
function xdcBlockchainExample() {
    return __awaiter(this, void 0, void 0, function () {
        var address, blockHash, transactionHash, gasInfo, transaction, balance, block, currentBlock, transactionsCount;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    address = '0x3223AEB8404C7525FcAA6C512f91e287AE9FfE7B';
                    blockHash = '0x305c58c8c62399097f1ea702e337f13be6b3a3ed28867d530d8a03191f040b9c';
                    transactionHash = '0xe6e7340394958674cdf8606936d292f565e4ecc476aaa8b258ec8a141f7c75d7';
                    return [4 /*yield*/, xdcSDK.blockchain.estimateGas({
                            from: '0xfb99f8ae9b70a0c8cd96ae665bbaf85a7e01a2ef',
                            to: '0x687422eEA2cB73B5d3e242bA5456b782919AFc85',
                            amount: '100000'
                        })];
                case 1:
                    gasInfo = _a.sent();
                    console.log("Gas information for transaction is ".concat(JSON.stringify(gasInfo)));
                    return [4 /*yield*/, xdcSDK.blockchain.get(transactionHash)];
                case 2:
                    transaction = _a.sent();
                    console.log("transaction with hash ".concat(transactionHash, " is ").concat(JSON.stringify(transaction)));
                    return [4 /*yield*/, xdcSDK.blockchain.getBlockchainAccountBalance(address)];
                case 3:
                    balance = _a.sent();
                    console.log("Balance on address ".concat(address, " is ").concat(balance));
                    return [4 /*yield*/, xdcSDK.blockchain.getBlock(blockHash)];
                case 4:
                    block = _a.sent();
                    console.log("Block with hash ".concat(blockHash, " is ").concat(block));
                    return [4 /*yield*/, xdcSDK.blockchain.getCurrentBlock()];
                case 5:
                    currentBlock = _a.sent();
                    console.log("Current block is ".concat(currentBlock));
                    return [4 /*yield*/, xdcSDK.blockchain.getTransactionsCount(address)];
                case 6:
                    transactionsCount = _a.sent();
                    console.log("Transaction count for address ".concat(address, " is ").concat(transactionsCount));
                    return [2 /*return*/];
            }
        });
    });
}
exports.xdcBlockchainExample = xdcBlockchainExample;
