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
exports.BaseTransferEthErc20Offchain = void 0;
const class_validator_1 = require("class-validator");
class BaseTransferEthErc20Offchain {
}
__decorate([
    class_validator_1.IsNotEmpty(),
    class_validator_1.Length(24, 24),
    __metadata("design:type", String)
], BaseTransferEthErc20Offchain.prototype, "senderAccountId", void 0);
__decorate([
    class_validator_1.IsNotEmpty(),
    class_validator_1.Length(42, 42),
    __metadata("design:type", String)
], BaseTransferEthErc20Offchain.prototype, "address", void 0);
__decorate([
    class_validator_1.IsNotEmpty(),
    class_validator_1.IsNumberString(),
    class_validator_1.Matches(/^[+]?((\d+(\.\d*)?)|(\.\d+))$/),
    __metadata("design:type", String)
], BaseTransferEthErc20Offchain.prototype, "amount", void 0);
__decorate([
    class_validator_1.IsOptional(),
    class_validator_1.IsBoolean(),
    __metadata("design:type", Boolean)
], BaseTransferEthErc20Offchain.prototype, "compliant", void 0);
__decorate([
    class_validator_1.Length(1, 100),
    class_validator_1.IsOptional(),
    __metadata("design:type", String)
], BaseTransferEthErc20Offchain.prototype, "paymentId", void 0);
__decorate([
    class_validator_1.Length(1, 500),
    class_validator_1.IsOptional(),
    __metadata("design:type", String)
], BaseTransferEthErc20Offchain.prototype, "senderNote", void 0);
__decorate([
    class_validator_1.Min(0),
    class_validator_1.IsOptional(),
    class_validator_1.IsInt(),
    __metadata("design:type", Number)
], BaseTransferEthErc20Offchain.prototype, "nonce", void 0);
exports.BaseTransferEthErc20Offchain = BaseTransferEthErc20Offchain;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQmFzZVRyYW5zZmVyRXRoRXJjMjBPZmZjaGFpbi5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9tb2RlbC9yZXF1ZXN0L0Jhc2VUcmFuc2ZlckV0aEVyYzIwT2ZmY2hhaW4udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7O0FBQUEscURBQWdIO0FBRWhILE1BQXNCLDRCQUE0QjtDQStCakQ7QUEzQkc7SUFGQyw0QkFBVSxFQUFFO0lBQ1osd0JBQU0sQ0FBQyxFQUFFLEVBQUUsRUFBRSxDQUFDOztxRUFDZ0I7QUFJL0I7SUFGQyw0QkFBVSxFQUFFO0lBQ1osd0JBQU0sQ0FBQyxFQUFFLEVBQUUsRUFBRSxDQUFDOzs2REFDUTtBQUt2QjtJQUhDLDRCQUFVLEVBQUU7SUFDWixnQ0FBYyxFQUFFO0lBQ2hCLHlCQUFPLENBQUMsK0JBQStCLENBQUM7OzREQUNuQjtBQUl0QjtJQUZDLDRCQUFVLEVBQUU7SUFDWiwyQkFBUyxFQUFFOzsrREFDZTtBQUkzQjtJQUZDLHdCQUFNLENBQUMsQ0FBQyxFQUFFLEdBQUcsQ0FBQztJQUNkLDRCQUFVLEVBQUU7OytEQUNhO0FBSTFCO0lBRkMsd0JBQU0sQ0FBQyxDQUFDLEVBQUUsR0FBRyxDQUFDO0lBQ2QsNEJBQVUsRUFBRTs7Z0VBQ2M7QUFLM0I7SUFIQyxxQkFBRyxDQUFDLENBQUMsQ0FBQztJQUNOLDRCQUFVLEVBQUU7SUFDWix1QkFBSyxFQUFFOzsyREFDYztBQTlCMUIsb0VBK0JDIn0=