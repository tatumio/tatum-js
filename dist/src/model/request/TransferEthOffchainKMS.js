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
exports.TransferEthOffchainKMS = void 0;
const class_validator_1 = require("class-validator");
const BaseTransferEthErc20Offchain_1 = require("./BaseTransferEthErc20Offchain");
class TransferEthOffchainKMS extends BaseTransferEthErc20Offchain_1.BaseTransferEthErc20Offchain {
}
__decorate([
    class_validator_1.ValidateIf(o => !o.mnemonic && !o.privateKey),
    class_validator_1.Length(36, 36),
    class_validator_1.IsUUID('4'),
    class_validator_1.IsNotEmpty(),
    __metadata("design:type", String)
], TransferEthOffchainKMS.prototype, "signatureId", void 0);
__decorate([
    class_validator_1.MaxLength(50000),
    class_validator_1.IsOptional(),
    __metadata("design:type", String)
], TransferEthOffchainKMS.prototype, "data", void 0);
exports.TransferEthOffchainKMS = TransferEthOffchainKMS;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiVHJhbnNmZXJFdGhPZmZjaGFpbktNUy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9tb2RlbC9yZXF1ZXN0L1RyYW5zZmVyRXRoT2ZmY2hhaW5LTVMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7O0FBQUEscURBQStGO0FBQy9GLGlGQUE0RTtBQUU1RSxNQUFhLHNCQUF1QixTQUFRLDJEQUE0QjtDQVd2RTtBQUxHO0lBSkMsNEJBQVUsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLFFBQVEsSUFBSSxDQUFDLENBQUMsQ0FBQyxVQUFVLENBQUM7SUFDN0Msd0JBQU0sQ0FBQyxFQUFFLEVBQUUsRUFBRSxDQUFDO0lBQ2Qsd0JBQU0sQ0FBQyxHQUFHLENBQUM7SUFDWCw0QkFBVSxFQUFFOzsyREFDZTtBQUk1QjtJQUZDLDJCQUFTLENBQUMsS0FBSyxDQUFDO0lBQ2hCLDRCQUFVLEVBQUU7O29EQUNRO0FBVnpCLHdEQVdDIn0=