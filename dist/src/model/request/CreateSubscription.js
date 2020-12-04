"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateSubscription = exports.SubscriptionAttrCompleteBlockchainTx = exports.SubscriptionAttrIncomingBlockchainTx = exports.SubscriptionAttrTxHistoryReport = exports.SubscriptionAttrOffchainWithdrawal = exports.SubscriptionAttrAccountBalanceLimit = void 0;
const class_transformer_1 = require("class-transformer");
const class_validator_1 = require("class-validator");
const SubscriptionType_1 = require("../response/ledger/SubscriptionType");
class SubscriptionAttrAccountBalanceLimit {
}
__decorate([
    class_validator_1.MaxLength(38),
    class_validator_1.IsNotEmpty(),
    class_validator_1.Matches(/^[+]?((\d+(\.\d*)?)|(\.\d+))$/),
    __metadata("design:type", String)
], SubscriptionAttrAccountBalanceLimit.prototype, "limit", void 0);
__decorate([
    class_validator_1.IsNotEmpty(),
    class_validator_1.IsIn(['account', 'available']),
    __metadata("design:type", String)
], SubscriptionAttrAccountBalanceLimit.prototype, "typeOfBalance", void 0);
exports.SubscriptionAttrAccountBalanceLimit = SubscriptionAttrAccountBalanceLimit;
class SubscriptionAttrOffchainWithdrawal {
}
__decorate([
    class_validator_1.IsNotEmpty(),
    class_validator_1.Length(1, 30),
    class_validator_1.Matches(/^BTC|BNB|LTC|BCH|ETH|USDT|LEO|LINK|UNI|FREE|MKR|USDC|BAT|TUSD|PAX|PAXG|PLTC|XCON|MMY|[a-zA-Z0-9_]+$/),
    __metadata("design:type", String)
], SubscriptionAttrOffchainWithdrawal.prototype, "currency", void 0);
exports.SubscriptionAttrOffchainWithdrawal = SubscriptionAttrOffchainWithdrawal;
class SubscriptionAttrTxHistoryReport {
}
__decorate([
    class_validator_1.IsNotEmpty(),
    class_validator_1.IsNumber(),
    class_validator_1.Min(1),
    class_validator_1.Max(720),
    __metadata("design:type", Number)
], SubscriptionAttrTxHistoryReport.prototype, "interval", void 0);
exports.SubscriptionAttrTxHistoryReport = SubscriptionAttrTxHistoryReport;
class SubscriptionAttrIncomingBlockchainTx {
}
__decorate([
    class_validator_1.Length(24, 24),
    class_validator_1.IsNotEmpty(),
    __metadata("design:type", String)
], SubscriptionAttrIncomingBlockchainTx.prototype, "id", void 0);
__decorate([
    class_validator_1.IsUrl(),
    class_validator_1.IsNotEmpty(),
    class_validator_1.MaxLength(500),
    __metadata("design:type", String)
], SubscriptionAttrIncomingBlockchainTx.prototype, "url", void 0);
exports.SubscriptionAttrIncomingBlockchainTx = SubscriptionAttrIncomingBlockchainTx;
class SubscriptionAttrCompleteBlockchainTx {
}
__decorate([
    class_validator_1.IsNotEmpty(),
    class_validator_1.Length(1, 30),
    class_validator_1.Matches(/^BTC|BNB|LTC|BCH|ETH|USDT|LEO|LINK|UNI|FREE|MKR|USDC|BAT|TUSD|PAX|PAXG|PLTC|XCON|MMY|[a-zA-Z0-9_]+$/),
    __metadata("design:type", String)
], SubscriptionAttrCompleteBlockchainTx.prototype, "currency", void 0);
exports.SubscriptionAttrCompleteBlockchainTx = SubscriptionAttrCompleteBlockchainTx;
class CreateSubscription {
}
__decorate([
    class_validator_1.IsNotEmpty(),
    class_validator_1.IsIn(Object.keys(SubscriptionType_1.SubscriptionType)),
    __metadata("design:type", String)
], CreateSubscription.prototype, "type", void 0);
__decorate([
    class_validator_1.IsNotEmptyObject(),
    class_validator_1.ValidateNested(),
    class_transformer_1.Type(() => SubscriptionAttrAccountBalanceLimit || SubscriptionAttrCompleteBlockchainTx
        || SubscriptionAttrOffchainWithdrawal || SubscriptionAttrTxHistoryReport || SubscriptionAttrIncomingBlockchainTx),
    __metadata("design:type", Object)
], CreateSubscription.prototype, "attr", void 0);
exports.CreateSubscription = CreateSubscription;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQ3JlYXRlU3Vic2NyaXB0aW9uLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vc3JjL21vZGVsL3JlcXVlc3QvQ3JlYXRlU3Vic2NyaXB0aW9uLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7OztBQUFBLHlEQUF1QztBQUN2QyxxREFZeUI7QUFDekIsMEVBQXFFO0FBRXJFLE1BQWEsbUNBQW1DO0NBVS9DO0FBTEc7SUFIQywyQkFBUyxDQUFDLEVBQUUsQ0FBQztJQUNiLDRCQUFVLEVBQUU7SUFDWix5QkFBTyxDQUFDLCtCQUErQixDQUFDOztrRUFDcEI7QUFJckI7SUFGQyw0QkFBVSxFQUFFO0lBQ1osc0JBQUksQ0FBQyxDQUFDLFNBQVMsRUFBRSxXQUFXLENBQUMsQ0FBQzs7MEVBQ0Y7QUFUakMsa0ZBVUM7QUFFRCxNQUFhLGtDQUFrQztDQU05QztBQURHO0lBSEMsNEJBQVUsRUFBRTtJQUNaLHdCQUFNLENBQUMsQ0FBQyxFQUFFLEVBQUUsQ0FBQztJQUNiLHlCQUFPLENBQUMscUdBQXFHLENBQUM7O29FQUN2RjtBQUw1QixnRkFNQztBQUVELE1BQWEsK0JBQStCO0NBTTNDO0FBREc7SUFKQyw0QkFBVSxFQUFFO0lBQ1osMEJBQVEsRUFBRTtJQUNWLHFCQUFHLENBQUMsQ0FBQyxDQUFDO0lBQ04scUJBQUcsQ0FBQyxHQUFHLENBQUM7O2lFQUNlO0FBTDVCLDBFQU1DO0FBRUQsTUFBYSxvQ0FBb0M7Q0FVaEQ7QUFORztJQUZDLHdCQUFNLENBQUMsRUFBRSxFQUFFLEVBQUUsQ0FBQztJQUNkLDRCQUFVLEVBQUU7O2dFQUNLO0FBS2xCO0lBSEMsdUJBQUssRUFBRTtJQUNQLDRCQUFVLEVBQUU7SUFDWiwyQkFBUyxDQUFDLEdBQUcsQ0FBQzs7aUVBQ0k7QUFUdkIsb0ZBVUM7QUFFRCxNQUFhLG9DQUFvQztDQU1oRDtBQURHO0lBSEMsNEJBQVUsRUFBRTtJQUNaLHdCQUFNLENBQUMsQ0FBQyxFQUFFLEVBQUUsQ0FBQztJQUNiLHlCQUFPLENBQUMscUdBQXFHLENBQUM7O3NFQUN2RjtBQUw1QixvRkFNQztBQUVELE1BQWEsa0JBQWtCO0NBWTlCO0FBUkc7SUFGQyw0QkFBVSxFQUFFO0lBQ1osc0JBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLG1DQUFnQixDQUFDLENBQUM7O2dEQUNOO0FBTTlCO0lBSkMsa0NBQWdCLEVBQUU7SUFDbEIsZ0NBQWMsRUFBRTtJQUNoQix3QkFBSSxDQUFDLEdBQUcsRUFBRSxDQUFDLG1DQUFtQyxJQUFJLG9DQUFvQztXQUNoRixrQ0FBa0MsSUFBSSwrQkFBK0IsSUFBSSxvQ0FBb0MsQ0FBQzs7Z0RBRW5DO0FBWHRGLGdEQVlDIn0=