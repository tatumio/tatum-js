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
exports.CreateAccount = void 0;
const class_transformer_1 = require("class-transformer");
const class_validator_1 = require("class-validator");
const response_1 = require("../response");
const CustomerUpdate_1 = require("./CustomerUpdate");
class CreateAccount {
}
__decorate([
    class_validator_1.IsNotEmpty(),
    class_validator_1.Length(2, 40),
    __metadata("design:type", String)
], CreateAccount.prototype, "currency", void 0);
__decorate([
    class_validator_1.MaxLength(192),
    class_validator_1.IsOptional(),
    __metadata("design:type", String)
], CreateAccount.prototype, "xpub", void 0);
__decorate([
    class_validator_1.IsOptional(),
    class_validator_1.IsBoolean(),
    __metadata("design:type", Boolean)
], CreateAccount.prototype, "compliant", void 0);
__decorate([
    class_validator_1.Length(3, 3),
    class_validator_1.IsOptional(),
    class_validator_1.IsIn(Object.keys(response_1.Fiat)),
    __metadata("design:type", String)
], CreateAccount.prototype, "accountingCurrency", void 0);
__decorate([
    class_validator_1.Length(1, 50),
    class_validator_1.IsOptional(),
    __metadata("design:type", String)
], CreateAccount.prototype, "accountCode", void 0);
__decorate([
    class_validator_1.Length(1, 30),
    class_validator_1.IsOptional(),
    __metadata("design:type", String)
], CreateAccount.prototype, "accountNumber", void 0);
__decorate([
    class_validator_1.IsOptional(),
    class_validator_1.ValidateNested(),
    class_transformer_1.Type(() => CustomerUpdate_1.CustomerUpdate),
    __metadata("design:type", CustomerUpdate_1.CustomerUpdate)
], CreateAccount.prototype, "customer", void 0);
exports.CreateAccount = CreateAccount;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQ3JlYXRlQWNjb3VudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9tb2RlbC9yZXF1ZXN0L0NyZWF0ZUFjY291bnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7O0FBQUEseURBQXVDO0FBQ3ZDLHFEQUEyRztBQUMzRywwQ0FBaUM7QUFDakMscURBQWdEO0FBRWhELE1BQWEsYUFBYTtDQStCekI7QUEzQkc7SUFGQyw0QkFBVSxFQUFFO0lBQ1osd0JBQU0sQ0FBQyxDQUFDLEVBQUUsRUFBRSxDQUFDOzsrQ0FDVTtBQUl4QjtJQUZDLDJCQUFTLENBQUMsR0FBRyxDQUFDO0lBQ2QsNEJBQVUsRUFBRTs7MkNBQ1E7QUFJckI7SUFGQyw0QkFBVSxFQUFFO0lBQ1osMkJBQVMsRUFBRTs7Z0RBQ2U7QUFLM0I7SUFIQyx3QkFBTSxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUM7SUFDWiw0QkFBVSxFQUFFO0lBQ1osc0JBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLGVBQUksQ0FBQyxDQUFDOzt5REFDUztBQUlqQztJQUZDLHdCQUFNLENBQUMsQ0FBQyxFQUFFLEVBQUUsQ0FBQztJQUNiLDRCQUFVLEVBQUU7O2tEQUNlO0FBSTVCO0lBRkMsd0JBQU0sQ0FBQyxDQUFDLEVBQUUsRUFBRSxDQUFDO0lBQ2IsNEJBQVUsRUFBRTs7b0RBQ2lCO0FBSzlCO0lBSEMsNEJBQVUsRUFBRTtJQUNaLGdDQUFjLEVBQUU7SUFDaEIsd0JBQUksQ0FBQyxHQUFHLEVBQUUsQ0FBQywrQkFBYyxDQUFDOzhCQUNULCtCQUFjOytDQUFDO0FBOUJyQyxzQ0ErQkMifQ==