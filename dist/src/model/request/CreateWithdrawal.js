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
exports.CreateWithdrawal = void 0;
const class_validator_1 = require("class-validator");
class CreateWithdrawal {
}
__decorate([
    class_validator_1.IsNotEmpty(),
    class_validator_1.Length(24, 24),
    __metadata("design:type", String)
], CreateWithdrawal.prototype, "senderAccountId", void 0);
__decorate([
    class_validator_1.IsNotEmpty(),
    class_validator_1.Length(1, 100),
    __metadata("design:type", String)
], CreateWithdrawal.prototype, "address", void 0);
__decorate([
    class_validator_1.IsNotEmpty(),
    class_validator_1.IsNumberString(),
    class_validator_1.MaxLength(38),
    class_validator_1.Matches(/^[+]?((\d+(\.\d*)?)|(\.\d+))$/),
    __metadata("design:type", String)
], CreateWithdrawal.prototype, "amount", void 0);
__decorate([
    class_validator_1.IsNumberString(),
    class_validator_1.IsOptional(),
    class_validator_1.Matches(/^[+]?((\d+(\.\d*)?)|(\.\d+))$/),
    __metadata("design:type", String)
], CreateWithdrawal.prototype, "fee", void 0);
__decorate([
    class_validator_1.IsOptional(),
    class_validator_1.IsBoolean(),
    __metadata("design:type", Boolean)
], CreateWithdrawal.prototype, "compliant", void 0);
__decorate([
    class_validator_1.Length(1, 100),
    class_validator_1.IsOptional(),
    __metadata("design:type", String)
], CreateWithdrawal.prototype, "paymentId", void 0);
__decorate([
    class_validator_1.Length(1, 500),
    class_validator_1.IsOptional(),
    __metadata("design:type", String)
], CreateWithdrawal.prototype, "senderNote", void 0);
__decorate([
    class_validator_1.MaxLength(64),
    class_validator_1.Matches(/^[ -~]{0,64}$/),
    class_validator_1.IsOptional(),
    __metadata("design:type", String)
], CreateWithdrawal.prototype, "attr", void 0);
exports.CreateWithdrawal = CreateWithdrawal;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQ3JlYXRlV2l0aGRyYXdhbC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9tb2RlbC9yZXF1ZXN0L0NyZWF0ZVdpdGhkcmF3YWwudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7O0FBQUEscURBQThHO0FBRTlHLE1BQWEsZ0JBQWdCO0NBcUM1QjtBQWpDRztJQUZDLDRCQUFVLEVBQUU7SUFDWix3QkFBTSxDQUFDLEVBQUUsRUFBRSxFQUFFLENBQUM7O3lEQUNnQjtBQUkvQjtJQUZDLDRCQUFVLEVBQUU7SUFDWix3QkFBTSxDQUFDLENBQUMsRUFBRSxHQUFHLENBQUM7O2lEQUNRO0FBTXZCO0lBSkMsNEJBQVUsRUFBRTtJQUNaLGdDQUFjLEVBQUU7SUFDaEIsMkJBQVMsQ0FBQyxFQUFFLENBQUM7SUFDYix5QkFBTyxDQUFDLCtCQUErQixDQUFDOztnREFDbkI7QUFLdEI7SUFIQyxnQ0FBYyxFQUFFO0lBQ2hCLDRCQUFVLEVBQUU7SUFDWix5QkFBTyxDQUFDLCtCQUErQixDQUFDOzs2Q0FDckI7QUFJcEI7SUFGQyw0QkFBVSxFQUFFO0lBQ1osMkJBQVMsRUFBRTs7bURBQ2U7QUFJM0I7SUFGQyx3QkFBTSxDQUFDLENBQUMsRUFBRSxHQUFHLENBQUM7SUFDZCw0QkFBVSxFQUFFOzttREFDYTtBQUkxQjtJQUZDLHdCQUFNLENBQUMsQ0FBQyxFQUFFLEdBQUcsQ0FBQztJQUNkLDRCQUFVLEVBQUU7O29EQUNjO0FBSzNCO0lBSEMsMkJBQVMsQ0FBQyxFQUFFLENBQUM7SUFDYix5QkFBTyxDQUFDLGVBQWUsQ0FBQztJQUN4Qiw0QkFBVSxFQUFFOzs4Q0FDUTtBQXBDekIsNENBcUNDIn0=