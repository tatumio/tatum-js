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
exports.EstimateGasVet = void 0;
const class_validator_1 = require("class-validator");
class EstimateGasVet {
}
__decorate([
    class_validator_1.IsNotEmpty(),
    class_validator_1.Length(66, 66),
    __metadata("design:type", String)
], EstimateGasVet.prototype, "from", void 0);
__decorate([
    class_validator_1.IsNotEmpty(),
    class_validator_1.Length(42, 42),
    __metadata("design:type", String)
], EstimateGasVet.prototype, "to", void 0);
__decorate([
    class_validator_1.IsNotEmpty(),
    class_validator_1.IsNumberString(),
    class_validator_1.Matches(/^[+]?((\d+(\.\d*)?)|(\.\d+))$/),
    __metadata("design:type", String)
], EstimateGasVet.prototype, "value", void 0);
__decorate([
    class_validator_1.IsOptional(),
    class_validator_1.MaxLength(10000),
    __metadata("design:type", String)
], EstimateGasVet.prototype, "data", void 0);
__decorate([
    class_validator_1.Min(0),
    class_validator_1.IsOptional(),
    class_validator_1.IsInt(),
    __metadata("design:type", Number)
], EstimateGasVet.prototype, "nonce", void 0);
exports.EstimateGasVet = EstimateGasVet;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiRXN0aW1hdGVHYXNWZXQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9zcmMvbW9kZWwvcmVxdWVzdC9Fc3RpbWF0ZUdhc1ZldC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7QUFBQSxxREFBK0c7QUFFL0csTUFBYSxjQUFjO0NBdUIxQjtBQW5CRztJQUZDLDRCQUFVLEVBQUU7SUFDWix3QkFBTSxDQUFDLEVBQUUsRUFBRSxFQUFFLENBQUM7OzRDQUNLO0FBSXBCO0lBRkMsNEJBQVUsRUFBRTtJQUNaLHdCQUFNLENBQUMsRUFBRSxFQUFFLEVBQUUsQ0FBQzs7MENBQ0c7QUFLbEI7SUFIQyw0QkFBVSxFQUFFO0lBQ1osZ0NBQWMsRUFBRTtJQUNoQix5QkFBTyxDQUFDLCtCQUErQixDQUFDOzs2Q0FDcEI7QUFJckI7SUFGQyw0QkFBVSxFQUFFO0lBQ1osMkJBQVMsQ0FBQyxLQUFLLENBQUM7OzRDQUNJO0FBS3JCO0lBSEMscUJBQUcsQ0FBQyxDQUFDLENBQUM7SUFDTiw0QkFBVSxFQUFFO0lBQ1osdUJBQUssRUFBRTs7NkNBQ2M7QUF0QjFCLHdDQXVCQyJ9