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
exports.DeployEthErc20 = void 0;
const class_transformer_1 = require("class-transformer");
const class_validator_1 = require("class-validator");
const Fee_1 = require("./Fee");
class DeployEthErc20 {
}
__decorate([
    class_validator_1.IsNotEmpty(),
    class_validator_1.Length(1, 100),
    class_validator_1.Matches(/^[a-zA-Z0-9_]+$/),
    __metadata("design:type", String)
], DeployEthErc20.prototype, "name", void 0);
__decorate([
    class_validator_1.IsNotEmpty(),
    class_validator_1.Length(1, 30),
    __metadata("design:type", String)
], DeployEthErc20.prototype, "symbol", void 0);
__decorate([
    class_validator_1.IsNotEmpty(),
    class_validator_1.Length(42, 42),
    __metadata("design:type", String)
], DeployEthErc20.prototype, "address", void 0);
__decorate([
    class_validator_1.IsNotEmpty(),
    class_validator_1.IsNumberString(),
    class_validator_1.MaxLength(38),
    class_validator_1.Matches(/^[+]?((\d+(\.\d*)?)|(\.\d+))$/),
    __metadata("design:type", String)
], DeployEthErc20.prototype, "supply", void 0);
__decorate([
    class_validator_1.Min(1),
    class_validator_1.Max(30),
    __metadata("design:type", Number)
], DeployEthErc20.prototype, "digits", void 0);
__decorate([
    class_validator_1.IsNotEmpty(),
    class_validator_1.Length(66, 66),
    __metadata("design:type", String)
], DeployEthErc20.prototype, "fromPrivateKey", void 0);
__decorate([
    class_validator_1.IsOptional(),
    class_validator_1.Min(0),
    __metadata("design:type", Number)
], DeployEthErc20.prototype, "nonce", void 0);
__decorate([
    class_validator_1.IsOptional(),
    class_validator_1.ValidateNested(),
    class_transformer_1.Type(() => Fee_1.Fee),
    __metadata("design:type", Fee_1.Fee)
], DeployEthErc20.prototype, "fee", void 0);
exports.DeployEthErc20 = DeployEthErc20;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiRGVwbG95RXRoRXJjMjAuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9zcmMvbW9kZWwvcmVxdWVzdC9EZXBsb3lFdGhFcmMyMC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7QUFBQSx5REFBdUM7QUFDdkMscURBVXlCO0FBQ3pCLCtCQUEwQjtBQUUxQixNQUFhLGNBQWM7Q0FxQzFCO0FBaENHO0lBSEMsNEJBQVUsRUFBRTtJQUNaLHdCQUFNLENBQUMsQ0FBQyxFQUFFLEdBQUcsQ0FBQztJQUNkLHlCQUFPLENBQUMsaUJBQWlCLENBQUM7OzRDQUNQO0FBSXBCO0lBRkMsNEJBQVUsRUFBRTtJQUNaLHdCQUFNLENBQUMsQ0FBQyxFQUFFLEVBQUUsQ0FBQzs7OENBQ1E7QUFJdEI7SUFGQyw0QkFBVSxFQUFFO0lBQ1osd0JBQU0sQ0FBQyxFQUFFLEVBQUUsRUFBRSxDQUFDOzsrQ0FDUTtBQU12QjtJQUpDLDRCQUFVLEVBQUU7SUFDWixnQ0FBYyxFQUFFO0lBQ2hCLDJCQUFTLENBQUMsRUFBRSxDQUFDO0lBQ2IseUJBQU8sQ0FBQywrQkFBK0IsQ0FBQzs7OENBQ25CO0FBSXRCO0lBRkMscUJBQUcsQ0FBQyxDQUFDLENBQUM7SUFDTixxQkFBRyxDQUFDLEVBQUUsQ0FBQzs7OENBQ2M7QUFJdEI7SUFGQyw0QkFBVSxFQUFFO0lBQ1osd0JBQU0sQ0FBQyxFQUFFLEVBQUUsRUFBRSxDQUFDOztzREFDZTtBQUk5QjtJQUZDLDRCQUFVLEVBQUU7SUFDWixxQkFBRyxDQUFDLENBQUMsQ0FBQzs7NkNBQ2U7QUFLdEI7SUFIQyw0QkFBVSxFQUFFO0lBQ1osZ0NBQWMsRUFBRTtJQUNoQix3QkFBSSxDQUFDLEdBQUcsRUFBRSxDQUFDLFNBQUcsQ0FBQzs4QkFDSCxTQUFHOzJDQUFDO0FBcENyQix3Q0FxQ0MifQ==