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
exports.CreateTransaction = void 0;
const class_validator_1 = require("class-validator");
class CreateTransaction {
}
__decorate([
    class_validator_1.IsNotEmpty(),
    class_validator_1.Length(24, 24),
    __metadata("design:type", String)
], CreateTransaction.prototype, "senderAccountId", void 0);
__decorate([
    class_validator_1.IsNotEmpty(),
    class_validator_1.Length(24, 24),
    __metadata("design:type", String)
], CreateTransaction.prototype, "recipientAccountId", void 0);
__decorate([
    class_validator_1.IsNotEmpty(),
    class_validator_1.IsNumberString(),
    class_validator_1.MaxLength(38),
    class_validator_1.Matches(/^[+]?((\d+(\.\d*)?)|(\.\d+))$/),
    __metadata("design:type", String)
], CreateTransaction.prototype, "amount", void 0);
__decorate([
    class_validator_1.Length(1, 100),
    class_validator_1.IsOptional(),
    __metadata("design:type", String)
], CreateTransaction.prototype, "paymentId", void 0);
__decorate([
    class_validator_1.Length(1, 100),
    class_validator_1.IsOptional(),
    __metadata("design:type", String)
], CreateTransaction.prototype, "transactionCode", void 0);
__decorate([
    class_validator_1.Length(1, 500),
    class_validator_1.IsOptional(),
    __metadata("design:type", String)
], CreateTransaction.prototype, "senderNote", void 0);
__decorate([
    class_validator_1.Length(1, 500),
    class_validator_1.IsOptional(),
    __metadata("design:type", String)
], CreateTransaction.prototype, "recipientNote", void 0);
__decorate([
    class_validator_1.IsNumber(),
    class_validator_1.Min(0),
    class_validator_1.IsOptional(),
    __metadata("design:type", Number)
], CreateTransaction.prototype, "baseRate", void 0);
__decorate([
    class_validator_1.IsOptional(),
    class_validator_1.IsBoolean(),
    __metadata("design:type", Boolean)
], CreateTransaction.prototype, "anonymous", void 0);
__decorate([
    class_validator_1.IsOptional(),
    class_validator_1.IsBoolean(),
    __metadata("design:type", Boolean)
], CreateTransaction.prototype, "compliant", void 0);
exports.CreateTransaction = CreateTransaction;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQ3JlYXRlVHJhbnNhY3Rpb24uanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9zcmMvbW9kZWwvcmVxdWVzdC9DcmVhdGVUcmFuc2FjdGlvbi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7QUFBQSxxREFVeUI7QUFFekIsTUFBYSxpQkFBaUI7Q0E0QzdCO0FBeENHO0lBRkMsNEJBQVUsRUFBRTtJQUNaLHdCQUFNLENBQUMsRUFBRSxFQUFFLEVBQUUsQ0FBQzs7MERBQ2dCO0FBSS9CO0lBRkMsNEJBQVUsRUFBRTtJQUNaLHdCQUFNLENBQUMsRUFBRSxFQUFFLEVBQUUsQ0FBQzs7NkRBQ21CO0FBTWxDO0lBSkMsNEJBQVUsRUFBRTtJQUNaLGdDQUFjLEVBQUU7SUFDaEIsMkJBQVMsQ0FBQyxFQUFFLENBQUM7SUFDYix5QkFBTyxDQUFDLCtCQUErQixDQUFDOztpREFDbkI7QUFJdEI7SUFGQyx3QkFBTSxDQUFDLENBQUMsRUFBRSxHQUFHLENBQUM7SUFDZCw0QkFBVSxFQUFFOztvREFDYTtBQUkxQjtJQUZDLHdCQUFNLENBQUMsQ0FBQyxFQUFFLEdBQUcsQ0FBQztJQUNkLDRCQUFVLEVBQUU7OzBEQUNtQjtBQUloQztJQUZDLHdCQUFNLENBQUMsQ0FBQyxFQUFFLEdBQUcsQ0FBQztJQUNkLDRCQUFVLEVBQUU7O3FEQUNjO0FBSTNCO0lBRkMsd0JBQU0sQ0FBQyxDQUFDLEVBQUUsR0FBRyxDQUFDO0lBQ2QsNEJBQVUsRUFBRTs7d0RBQ2lCO0FBSzlCO0lBSEMsMEJBQVEsRUFBRTtJQUNWLHFCQUFHLENBQUMsQ0FBQyxDQUFDO0lBQ04sNEJBQVUsRUFBRTs7bURBQ1k7QUFJekI7SUFGQyw0QkFBVSxFQUFFO0lBQ1osMkJBQVMsRUFBRTs7b0RBQ2U7QUFJM0I7SUFGQyw0QkFBVSxFQUFFO0lBQ1osMkJBQVMsRUFBRTs7b0RBQ2U7QUEzQy9CLDhDQTRDQyJ9