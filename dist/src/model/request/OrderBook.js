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
exports.OrderBookRequest = void 0;
const class_validator_1 = require("class-validator");
const TradeType_1 = require("./TradeType");
class OrderBookRequest {
}
__decorate([
    class_validator_1.IsNotEmpty(),
    class_validator_1.IsIn(Object.keys(TradeType_1.TradeType)),
    __metadata("design:type", String)
], OrderBookRequest.prototype, "type", void 0);
__decorate([
    class_validator_1.IsNotEmpty(),
    class_validator_1.IsNumberString(),
    class_validator_1.Matches(/^[+]?((\d+(\.\d*)?)|(\.\d+))$/),
    class_validator_1.MaxLength(38),
    __metadata("design:type", String)
], OrderBookRequest.prototype, "price", void 0);
__decorate([
    class_validator_1.IsNotEmpty(),
    class_validator_1.IsNumberString(),
    class_validator_1.Matches(/^[+]?((\d+(\.\d*)?)|(\.\d+))$/),
    class_validator_1.MaxLength(38),
    __metadata("design:type", String)
], OrderBookRequest.prototype, "amount", void 0);
__decorate([
    class_validator_1.IsNotEmpty(),
    class_validator_1.IsString(),
    class_validator_1.Matches(/^[A-a-zZ0-9_\-]+\/[A-Za-z0-9_\-]+$/),
    class_validator_1.MinLength(3),
    class_validator_1.MaxLength(30),
    __metadata("design:type", String)
], OrderBookRequest.prototype, "pair", void 0);
__decorate([
    class_validator_1.IsNotEmpty(),
    class_validator_1.IsString(),
    class_validator_1.Length(24, 24),
    __metadata("design:type", String)
], OrderBookRequest.prototype, "currency1AccountId", void 0);
__decorate([
    class_validator_1.IsNotEmpty(),
    class_validator_1.IsString(),
    class_validator_1.Length(24, 24),
    __metadata("design:type", String)
], OrderBookRequest.prototype, "currency2AccountId", void 0);
__decorate([
    class_validator_1.IsNotEmpty(),
    class_validator_1.ValidateIf(o => o.feeAccountId),
    class_validator_1.IsNumber(),
    class_validator_1.Min(0),
    class_validator_1.Max(100),
    __metadata("design:type", Number)
], OrderBookRequest.prototype, "fee", void 0);
__decorate([
    class_validator_1.IsNotEmpty(),
    class_validator_1.ValidateIf(o => o.fee),
    class_validator_1.Length(24, 24),
    __metadata("design:type", String)
], OrderBookRequest.prototype, "feeAccountId", void 0);
exports.OrderBookRequest = OrderBookRequest;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiT3JkZXJCb29rLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vc3JjL21vZGVsL3JlcXVlc3QvT3JkZXJCb29rLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7OztBQUFBLHFEQVV5QjtBQUN6QiwyQ0FBc0M7QUFFdEMsTUFBYSxnQkFBZ0I7Q0E4QzVCO0FBMUNHO0lBRkMsNEJBQVUsRUFBRTtJQUNaLHNCQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxxQkFBUyxDQUFDLENBQUM7OzhDQUNOO0FBTXZCO0lBSkMsNEJBQVUsRUFBRTtJQUNaLGdDQUFjLEVBQUU7SUFDaEIseUJBQU8sQ0FBQywrQkFBK0IsQ0FBQztJQUN4QywyQkFBUyxDQUFDLEVBQUUsQ0FBQzs7K0NBQ087QUFNckI7SUFKQyw0QkFBVSxFQUFFO0lBQ1osZ0NBQWMsRUFBRTtJQUNoQix5QkFBTyxDQUFDLCtCQUErQixDQUFDO0lBQ3hDLDJCQUFTLENBQUMsRUFBRSxDQUFDOztnREFDUTtBQU90QjtJQUxDLDRCQUFVLEVBQUU7SUFDWiwwQkFBUSxFQUFFO0lBQ1YseUJBQU8sQ0FBQyxvQ0FBb0MsQ0FBQztJQUM3QywyQkFBUyxDQUFDLENBQUMsQ0FBQztJQUNaLDJCQUFTLENBQUMsRUFBRSxDQUFDOzs4Q0FDTTtBQUtwQjtJQUhDLDRCQUFVLEVBQUU7SUFDWiwwQkFBUSxFQUFFO0lBQ1Ysd0JBQU0sQ0FBQyxFQUFFLEVBQUUsRUFBRSxDQUFDOzs0REFDbUI7QUFLbEM7SUFIQyw0QkFBVSxFQUFFO0lBQ1osMEJBQVEsRUFBRTtJQUNWLHdCQUFNLENBQUMsRUFBRSxFQUFFLEVBQUUsQ0FBQzs7NERBQ21CO0FBT2xDO0lBTEMsNEJBQVUsRUFBRTtJQUNaLDRCQUFVLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsWUFBWSxDQUFDO0lBQy9CLDBCQUFRLEVBQUU7SUFDVixxQkFBRyxDQUFDLENBQUMsQ0FBQztJQUNOLHFCQUFHLENBQUMsR0FBRyxDQUFDOzs2Q0FDVztBQUtwQjtJQUhDLDRCQUFVLEVBQUU7SUFDWiw0QkFBVSxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQztJQUN0Qix3QkFBTSxDQUFDLEVBQUUsRUFBRSxFQUFFLENBQUM7O3NEQUNjO0FBN0NqQyw0Q0E4Q0MifQ==