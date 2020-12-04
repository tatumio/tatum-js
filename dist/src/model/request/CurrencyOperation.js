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
exports.CurrencyOperation = void 0;
const class_validator_1 = require("class-validator");
class CurrencyOperation {
}
__decorate([
    class_validator_1.IsNotEmpty(),
    class_validator_1.Length(24, 24),
    __metadata("design:type", String)
], CurrencyOperation.prototype, "accountId", void 0);
__decorate([
    class_validator_1.IsNotEmpty(),
    class_validator_1.IsNumberString(),
    class_validator_1.MaxLength(38),
    class_validator_1.Matches(/^[+]?((\d+(\.\d*)?)|(\.\d+))$/),
    __metadata("design:type", String)
], CurrencyOperation.prototype, "amount", void 0);
__decorate([
    class_validator_1.Length(1, 100),
    class_validator_1.IsOptional(),
    __metadata("design:type", String)
], CurrencyOperation.prototype, "paymentId", void 0);
__decorate([
    class_validator_1.Length(1, 100),
    class_validator_1.IsOptional(),
    __metadata("design:type", String)
], CurrencyOperation.prototype, "transactionCode", void 0);
__decorate([
    class_validator_1.Length(1, 500),
    class_validator_1.IsOptional(),
    __metadata("design:type", String)
], CurrencyOperation.prototype, "senderNote", void 0);
__decorate([
    class_validator_1.Length(1, 500),
    class_validator_1.IsOptional(),
    __metadata("design:type", String)
], CurrencyOperation.prototype, "recipientNote", void 0);
__decorate([
    class_validator_1.Length(24, 24),
    class_validator_1.IsOptional(),
    __metadata("design:type", String)
], CurrencyOperation.prototype, "counterAccount", void 0);
__decorate([
    class_validator_1.Length(1, 50),
    class_validator_1.IsOptional(),
    __metadata("design:type", String)
], CurrencyOperation.prototype, "reference", void 0);
exports.CurrencyOperation = CurrencyOperation;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQ3VycmVuY3lPcGVyYXRpb24uanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9zcmMvbW9kZWwvcmVxdWVzdC9DdXJyZW5jeU9wZXJhdGlvbi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7QUFBQSxxREFBbUc7QUFFbkcsTUFBYSxpQkFBaUI7Q0FtQzdCO0FBL0JHO0lBRkMsNEJBQVUsRUFBRTtJQUNaLHdCQUFNLENBQUMsRUFBRSxFQUFFLEVBQUUsQ0FBQzs7b0RBQ1U7QUFNekI7SUFKQyw0QkFBVSxFQUFFO0lBQ1osZ0NBQWMsRUFBRTtJQUNoQiwyQkFBUyxDQUFDLEVBQUUsQ0FBQztJQUNiLHlCQUFPLENBQUMsK0JBQStCLENBQUM7O2lEQUNuQjtBQUl0QjtJQUZDLHdCQUFNLENBQUMsQ0FBQyxFQUFFLEdBQUcsQ0FBQztJQUNkLDRCQUFVLEVBQUU7O29EQUNhO0FBSTFCO0lBRkMsd0JBQU0sQ0FBQyxDQUFDLEVBQUUsR0FBRyxDQUFDO0lBQ2QsNEJBQVUsRUFBRTs7MERBQ21CO0FBSWhDO0lBRkMsd0JBQU0sQ0FBQyxDQUFDLEVBQUUsR0FBRyxDQUFDO0lBQ2QsNEJBQVUsRUFBRTs7cURBQ2M7QUFJM0I7SUFGQyx3QkFBTSxDQUFDLENBQUMsRUFBRSxHQUFHLENBQUM7SUFDZCw0QkFBVSxFQUFFOzt3REFDaUI7QUFJOUI7SUFGQyx3QkFBTSxDQUFDLEVBQUUsRUFBRSxFQUFFLENBQUM7SUFDZCw0QkFBVSxFQUFFOzt5REFDa0I7QUFJL0I7SUFGQyx3QkFBTSxDQUFDLENBQUMsRUFBRSxFQUFFLENBQUM7SUFDYiw0QkFBVSxFQUFFOztvREFDYTtBQWxDOUIsOENBbUNDIn0=