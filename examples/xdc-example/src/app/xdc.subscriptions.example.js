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
exports.xdcSubscriptionsExample = void 0;
var xdc_1 = require("@tatumio/xdc");
var xdcSDK = (0, xdc_1.TatumXdcSDK)({ apiKey: '75ea3138-d0a1-47df-932e-acb3ee807dab' });
function xdcSubscriptionsExample() {
    return __awaiter(this, void 0, void 0, function () {
        var id, subscriptionReport, subscriptions;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, xdcSDK.subscriptions.createSubscription({
                        type: 'ACCOUNT_INCOMING_BLOCKCHAIN_TRANSACTION',
                        attr: {
                            id: '5e6be8e9e6aa436299950c41',
                            url: 'dashboard.tatum.io/webhook-handler'
                        }
                    })
                    // Cancel an existing subscription
                    // https://apidoc.tatum.io/tag/Notification-subscriptions#operation/deleteSubscription
                ];
                case 1:
                    id = _a.sent();
                    // Cancel an existing subscription
                    // https://apidoc.tatum.io/tag/Notification-subscriptions#operation/deleteSubscription
                    return [4 /*yield*/, xdcSDK.subscriptions.deleteSubscription('5e68c66581f2ee32bc354087')
                        // Disable Webhook HMAC
                        // https://apidoc.tatum.io/tag/Notification-subscriptions#operation/disableWebHookHmac
                    ];
                case 2:
                    // Cancel an existing subscription
                    // https://apidoc.tatum.io/tag/Notification-subscriptions#operation/deleteSubscription
                    _a.sent();
                    // Disable Webhook HMAC
                    // https://apidoc.tatum.io/tag/Notification-subscriptions#operation/disableWebHookHmac
                    return [4 /*yield*/, xdcSDK.subscriptions.disableWebHookHmac()
                        // https://apidoc.tatum.io/tag/Notification-subscriptions#operation/enableWebHookHmac
                        // Enable HMAC hash ID on the fired webhooks from Tatum API. In order to make sure that a
                        // webhook is sent by us, we have the possibility to sign it with the HMAC Sha512 Hex algorithm.
                    ];
                case 3:
                    // Disable Webhook HMAC
                    // https://apidoc.tatum.io/tag/Notification-subscriptions#operation/disableWebHookHmac
                    _a.sent();
                    // https://apidoc.tatum.io/tag/Notification-subscriptions#operation/enableWebHookHmac
                    // Enable HMAC hash ID on the fired webhooks from Tatum API. In order to make sure that a
                    // webhook is sent by us, we have the possibility to sign it with the HMAC Sha512 Hex algorithm.
                    return [4 /*yield*/, xdcSDK.subscriptions.enableWebHookHmac({
                            hmacSecret: '1f7f7c0c-3906-4aa1-9dfe-4b67c43918f6'
                        })
                        // Obtain report for subscription
                        // https://apidoc.tatum.io/tag/Notification-subscriptions#operation/getSubscriptionReport
                    ];
                case 4:
                    // https://apidoc.tatum.io/tag/Notification-subscriptions#operation/enableWebHookHmac
                    // Enable HMAC hash ID on the fired webhooks from Tatum API. In order to make sure that a
                    // webhook is sent by us, we have the possibility to sign it with the HMAC Sha512 Hex algorithm.
                    _a.sent();
                    return [4 /*yield*/, xdcSDK.subscriptions.getSubscriptionReport('5e68c66581f2ee32bc354087')];
                case 5:
                    subscriptionReport = _a.sent();
                    console.log("Subscription report ".concat(subscriptionReport));
                    return [4 /*yield*/, xdcSDK.subscriptions.getSubscriptions(10)];
                case 6:
                    subscriptions = _a.sent();
                    console.log("Subscriptions ".concat(subscriptions));
                    return [2 /*return*/];
            }
        });
    });
}
exports.xdcSubscriptionsExample = xdcSubscriptionsExample;
