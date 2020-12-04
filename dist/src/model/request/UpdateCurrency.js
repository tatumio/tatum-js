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
exports.UpdateCurrency = void 0;
const class_validator_1 = require("class-validator");
const response_1 = require("../response");
const Currency_1 = require("./Currency");
class UpdateCurrency {
}
__decorate([
    class_validator_1.IsNotEmpty(),
    class_validator_1.Length(1, 30),
    class_validator_1.Matches(/^VC_[a-zA-Z0-9_]+$/),
    __metadata("design:type", String)
], UpdateCurrency.prototype, "name", void 0);
__decorate([
    class_validator_1.IsOptional(),
    class_validator_1.Length(3, 5),
    class_validator_1.IsIn([...Object.keys(Currency_1.Currency), ...Object.keys(response_1.Fiat)]),
    __metadata("design:type", String)
], UpdateCurrency.prototype, "basePair", void 0);
__decorate([
    class_validator_1.Min(0),
    class_validator_1.IsOptional(),
    __metadata("design:type", Number)
], UpdateCurrency.prototype, "baseRate", void 0);
exports.UpdateCurrency = UpdateCurrency;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiVXBkYXRlQ3VycmVuY3kuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9zcmMvbW9kZWwvcmVxdWVzdC9VcGRhdGVDdXJyZW5jeS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7QUFBQSxxREFBbUY7QUFDbkYsMENBQWlDO0FBQ2pDLHlDQUFvQztBQUVwQyxNQUFhLGNBQWM7Q0FlMUI7QUFWRztJQUhDLDRCQUFVLEVBQUU7SUFDWix3QkFBTSxDQUFDLENBQUMsRUFBRSxFQUFFLENBQUM7SUFDYix5QkFBTyxDQUFDLG9CQUFvQixDQUFDOzs0Q0FDVjtBQUtwQjtJQUhDLDRCQUFVLEVBQUU7SUFDWix3QkFBTSxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUM7SUFDWixzQkFBSSxDQUFDLENBQUMsR0FBRyxNQUFNLENBQUMsSUFBSSxDQUFDLG1CQUFRLENBQUMsRUFBRSxHQUFHLE1BQU0sQ0FBQyxJQUFJLENBQUMsZUFBSSxDQUFDLENBQUMsQ0FBQzs7Z0RBQ3JCO0FBSWxDO0lBRkMscUJBQUcsQ0FBQyxDQUFDLENBQUM7SUFDTiw0QkFBVSxFQUFFOztnREFDWTtBQWQ3Qix3Q0FlQyJ9