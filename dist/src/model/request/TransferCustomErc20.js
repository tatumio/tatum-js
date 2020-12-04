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
exports.TransferCustomErc20 = void 0;
const class_transformer_1 = require("class-transformer");
const class_validator_1 = require("class-validator");
const Fee_1 = require("./Fee");
class TransferCustomErc20 {
}
__decorate([
    class_validator_1.IsNotEmpty(),
    class_validator_1.Length(66, 66),
    __metadata("design:type", String)
], TransferCustomErc20.prototype, "fromPrivateKey", void 0);
__decorate([
    class_validator_1.IsNotEmpty(),
    class_validator_1.Length(42, 42),
    __metadata("design:type", String)
], TransferCustomErc20.prototype, "to", void 0);
__decorate([
    class_validator_1.IsNotEmpty(),
    class_validator_1.IsNumberString(),
    class_validator_1.Matches(/^[+]?((\d+(\.\d*)?)|(\.\d+))$/),
    __metadata("design:type", String)
], TransferCustomErc20.prototype, "amount", void 0);
__decorate([
    class_validator_1.IsNotEmpty(),
    class_validator_1.Length(42, 42),
    __metadata("design:type", String)
], TransferCustomErc20.prototype, "contractAddress", void 0);
__decorate([
    class_validator_1.IsOptional(),
    class_transformer_1.Type(() => Fee_1.Fee),
    class_validator_1.ValidateNested(),
    __metadata("design:type", Fee_1.Fee)
], TransferCustomErc20.prototype, "fee", void 0);
__decorate([
    class_validator_1.Min(1),
    class_validator_1.Max(30),
    __metadata("design:type", Number)
], TransferCustomErc20.prototype, "digits", void 0);
__decorate([
    class_validator_1.Min(0),
    class_validator_1.IsOptional(),
    __metadata("design:type", Number)
], TransferCustomErc20.prototype, "nonce", void 0);
exports.TransferCustomErc20 = TransferCustomErc20;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiVHJhbnNmZXJDdXN0b21FcmMyMC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9tb2RlbC9yZXF1ZXN0L1RyYW5zZmVyQ3VzdG9tRXJjMjAudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7O0FBQUEseURBQXVDO0FBQ3ZDLHFEQUFrSDtBQUNsSCwrQkFBMEI7QUFFMUIsTUFBYSxtQkFBbUI7Q0ErQi9CO0FBM0JHO0lBRkMsNEJBQVUsRUFBRTtJQUNaLHdCQUFNLENBQUMsRUFBRSxFQUFFLEVBQUUsQ0FBQzs7MkRBQ2U7QUFJOUI7SUFGQyw0QkFBVSxFQUFFO0lBQ1osd0JBQU0sQ0FBQyxFQUFFLEVBQUUsRUFBRSxDQUFDOzsrQ0FDRztBQUtsQjtJQUhDLDRCQUFVLEVBQUU7SUFDWixnQ0FBYyxFQUFFO0lBQ2hCLHlCQUFPLENBQUMsK0JBQStCLENBQUM7O21EQUNuQjtBQUl0QjtJQUZDLDRCQUFVLEVBQUU7SUFDWix3QkFBTSxDQUFDLEVBQUUsRUFBRSxFQUFFLENBQUM7OzREQUNnQjtBQUsvQjtJQUhDLDRCQUFVLEVBQUU7SUFDWix3QkFBSSxDQUFDLEdBQUcsRUFBRSxDQUFDLFNBQUcsQ0FBQztJQUNmLGdDQUFjLEVBQUU7OEJBQ0osU0FBRztnREFBQztBQUlqQjtJQUZDLHFCQUFHLENBQUMsQ0FBQyxDQUFDO0lBQ04scUJBQUcsQ0FBQyxFQUFFLENBQUM7O21EQUNjO0FBSXRCO0lBRkMscUJBQUcsQ0FBQyxDQUFDLENBQUM7SUFDTiw0QkFBVSxFQUFFOztrREFDUztBQTlCMUIsa0RBK0JDIn0=