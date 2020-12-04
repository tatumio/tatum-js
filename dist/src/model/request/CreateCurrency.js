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
exports.CreateCurrency = void 0;
const class_validator_1 = require("class-validator");
const response_1 = require("../response");
const Currency_1 = require("./Currency");
const CustomerUpdate_1 = require("./CustomerUpdate");
class CreateCurrency {
}
__decorate([
    class_validator_1.IsNotEmpty(),
    class_validator_1.Length(1, 30),
    class_validator_1.Matches(/^VC_[a-zA-Z0-9_]+$/),
    __metadata("design:type", String)
], CreateCurrency.prototype, "name", void 0);
__decorate([
    class_validator_1.IsNotEmpty(),
    class_validator_1.IsNumberString(),
    class_validator_1.MaxLength(38),
    class_validator_1.Matches(/^[+]?((\d+(\.\d*)?)|(\.\d+))$/),
    __metadata("design:type", String)
], CreateCurrency.prototype, "supply", void 0);
__decorate([
    class_validator_1.Length(1, 100),
    class_validator_1.IsOptional(),
    __metadata("design:type", String)
], CreateCurrency.prototype, "description", void 0);
__decorate([
    class_validator_1.Length(1, 50),
    class_validator_1.IsOptional(),
    __metadata("design:type", String)
], CreateCurrency.prototype, "accountCode", void 0);
__decorate([
    class_validator_1.IsNotEmpty(),
    class_validator_1.IsIn([...Object.keys(Currency_1.Currency), ...Object.keys(response_1.Fiat)]),
    class_validator_1.Length(3, 5),
    __metadata("design:type", String)
], CreateCurrency.prototype, "basePair", void 0);
__decorate([
    class_validator_1.Min(0),
    class_validator_1.IsOptional(),
    __metadata("design:type", Number)
], CreateCurrency.prototype, "baseRate", void 0);
__decorate([
    class_validator_1.Length(3, 3),
    class_validator_1.IsOptional(),
    class_validator_1.IsIn(Object.keys(response_1.Fiat)),
    __metadata("design:type", String)
], CreateCurrency.prototype, "accountingCurrency", void 0);
__decorate([
    class_validator_1.IsOptional(),
    __metadata("design:type", CustomerUpdate_1.CustomerUpdate)
], CreateCurrency.prototype, "customer", void 0);
exports.CreateCurrency = CreateCurrency;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQ3JlYXRlQ3VycmVuY3kuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9zcmMvbW9kZWwvcmVxdWVzdC9DcmVhdGVDdXJyZW5jeS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7QUFBQSxxREFBOEc7QUFDOUcsMENBQWlDO0FBQ2pDLHlDQUFvQztBQUNwQyxxREFBa0Q7QUFFbEQsTUFBYSxjQUFjO0NBcUMxQjtBQWhDRztJQUhDLDRCQUFVLEVBQUU7SUFDWix3QkFBTSxDQUFDLENBQUMsRUFBRSxFQUFFLENBQUM7SUFDYix5QkFBTyxDQUFDLG9CQUFvQixDQUFDOzs0Q0FDVjtBQU1wQjtJQUpDLDRCQUFVLEVBQUU7SUFDWixnQ0FBYyxFQUFFO0lBQ2hCLDJCQUFTLENBQUMsRUFBRSxDQUFDO0lBQ2IseUJBQU8sQ0FBQywrQkFBK0IsQ0FBQzs7OENBQ25CO0FBSXRCO0lBRkMsd0JBQU0sQ0FBQyxDQUFDLEVBQUUsR0FBRyxDQUFDO0lBQ2QsNEJBQVUsRUFBRTs7bURBQ2U7QUFJNUI7SUFGQyx3QkFBTSxDQUFDLENBQUMsRUFBRSxFQUFFLENBQUM7SUFDYiw0QkFBVSxFQUFFOzttREFDZTtBQUs1QjtJQUhDLDRCQUFVLEVBQUU7SUFDWixzQkFBSSxDQUFDLENBQUMsR0FBRyxNQUFNLENBQUMsSUFBSSxDQUFDLG1CQUFRLENBQUMsRUFBRSxHQUFHLE1BQU0sQ0FBQyxJQUFJLENBQUMsZUFBSSxDQUFDLENBQUMsQ0FBQztJQUN0RCx3QkFBTSxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUM7O2dEQUNvQjtBQUlqQztJQUZDLHFCQUFHLENBQUMsQ0FBQyxDQUFDO0lBQ04sNEJBQVUsRUFBRTs7Z0RBQ1k7QUFLekI7SUFIQyx3QkFBTSxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUM7SUFDWiw0QkFBVSxFQUFFO0lBQ1osc0JBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLGVBQUksQ0FBQyxDQUFDOzswREFDUztBQUdqQztJQURDLDRCQUFVLEVBQUU7OEJBQ0ssK0JBQWM7Z0RBQUM7QUFwQ3JDLHdDQXFDQyJ9