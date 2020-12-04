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
exports.TransferEthErc20 = void 0;
const class_transformer_1 = require("class-transformer");
const class_validator_1 = require("class-validator");
const Currency_1 = require("./Currency");
const Fee_1 = require("./Fee");
class TransferEthErc20 {
}
__decorate([
    class_validator_1.IsNotEmpty(),
    class_validator_1.Length(66, 66),
    __metadata("design:type", String)
], TransferEthErc20.prototype, "fromPrivateKey", void 0);
__decorate([
    class_validator_1.IsNotEmpty(),
    class_validator_1.Length(42, 42),
    __metadata("design:type", String)
], TransferEthErc20.prototype, "to", void 0);
__decorate([
    class_validator_1.IsNotEmpty(),
    class_validator_1.IsNumberString(),
    class_validator_1.Matches(/^[+]?((\d+(\.\d*)?)|(\.\d+))$/),
    __metadata("design:type", String)
], TransferEthErc20.prototype, "amount", void 0);
__decorate([
    class_validator_1.MaxLength(130000),
    class_validator_1.IsOptional(),
    __metadata("design:type", String)
], TransferEthErc20.prototype, "data", void 0);
__decorate([
    class_validator_1.IsNotEmpty(),
    class_validator_1.IsIn(Currency_1.ETH_BASED_CURRENCIES),
    __metadata("design:type", String)
], TransferEthErc20.prototype, "currency", void 0);
__decorate([
    class_validator_1.IsOptional(),
    class_transformer_1.Type(() => Fee_1.Fee),
    class_validator_1.ValidateNested(),
    __metadata("design:type", Fee_1.Fee)
], TransferEthErc20.prototype, "fee", void 0);
__decorate([
    class_validator_1.Min(0),
    class_validator_1.IsOptional(),
    __metadata("design:type", Number)
], TransferEthErc20.prototype, "nonce", void 0);
exports.TransferEthErc20 = TransferEthErc20;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiVHJhbnNmZXJFdGhFcmMyMC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9tb2RlbC9yZXF1ZXN0L1RyYW5zZmVyRXRoRXJjMjAudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7O0FBQUEseURBQXVDO0FBQ3ZDLHFEQVV5QjtBQUN6Qix5Q0FBMEQ7QUFDMUQsK0JBQTBCO0FBRTFCLE1BQWEsZ0JBQWdCO0NBK0I1QjtBQTNCRztJQUZDLDRCQUFVLEVBQUU7SUFDWix3QkFBTSxDQUFDLEVBQUUsRUFBRSxFQUFFLENBQUM7O3dEQUNlO0FBSTlCO0lBRkMsNEJBQVUsRUFBRTtJQUNaLHdCQUFNLENBQUMsRUFBRSxFQUFFLEVBQUUsQ0FBQzs7NENBQ0c7QUFLbEI7SUFIQyw0QkFBVSxFQUFFO0lBQ1osZ0NBQWMsRUFBRTtJQUNoQix5QkFBTyxDQUFDLCtCQUErQixDQUFDOztnREFDbkI7QUFJdEI7SUFGQywyQkFBUyxDQUFDLE1BQU0sQ0FBQztJQUNqQiw0QkFBVSxFQUFFOzs4Q0FDUTtBQUlyQjtJQUZDLDRCQUFVLEVBQUU7SUFDWixzQkFBSSxDQUFDLCtCQUFvQixDQUFDOztrREFDRDtBQUsxQjtJQUhDLDRCQUFVLEVBQUU7SUFDWix3QkFBSSxDQUFDLEdBQUcsRUFBRSxDQUFDLFNBQUcsQ0FBQztJQUNmLGdDQUFjLEVBQUU7OEJBQ0osU0FBRzs2Q0FBQztBQUlqQjtJQUZDLHFCQUFHLENBQUMsQ0FBQyxDQUFDO0lBQ04sNEJBQVUsRUFBRTs7K0NBQ1M7QUE5QjFCLDRDQStCQyJ9