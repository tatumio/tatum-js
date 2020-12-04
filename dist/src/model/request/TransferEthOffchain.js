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
exports.TransferEthOffchain = void 0;
const class_validator_1 = require("class-validator");
const TransferEthOffchainValidator_1 = require("../validation/TransferEthOffchainValidator");
const BaseTransferEthErc20Offchain_1 = require("./BaseTransferEthErc20Offchain");
class TransferEthOffchain extends BaseTransferEthErc20Offchain_1.BaseTransferEthErc20Offchain {
}
__decorate([
    class_validator_1.Length(1, 500),
    class_validator_1.Validate(TransferEthOffchainValidator_1.TransferEthOffchainValidator),
    class_validator_1.ValidateIf(o => (o.mnemonic && o.index >= 0 && o.privateKey) || o.index >= 0),
    class_validator_1.IsNotEmpty(),
    __metadata("design:type", String)
], TransferEthOffchain.prototype, "mnemonic", void 0);
__decorate([
    class_validator_1.ValidateIf(o => (o.mnemonic && o.index >= 0 && o.privateKey) || o.mnemonic),
    class_validator_1.Validate(TransferEthOffchainValidator_1.TransferEthOffchainValidator),
    class_validator_1.Min(0),
    class_validator_1.IsNotEmpty(),
    class_validator_1.IsInt(),
    __metadata("design:type", Number)
], TransferEthOffchain.prototype, "index", void 0);
__decorate([
    class_validator_1.ValidateIf(o => (o.mnemonic && o.index >= 0 && o.privateKey) || (!o.mnemonic && !o.index)),
    class_validator_1.Validate(TransferEthOffchainValidator_1.TransferEthOffchainValidator),
    class_validator_1.Length(66, 66),
    class_validator_1.IsNotEmpty(),
    __metadata("design:type", String)
], TransferEthOffchain.prototype, "privateKey", void 0);
__decorate([
    class_validator_1.MaxLength(50000),
    class_validator_1.IsOptional(),
    __metadata("design:type", String)
], TransferEthOffchain.prototype, "data", void 0);
exports.TransferEthOffchain = TransferEthOffchain;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiVHJhbnNmZXJFdGhPZmZjaGFpbi5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9tb2RlbC9yZXF1ZXN0L1RyYW5zZmVyRXRoT2ZmY2hhaW4udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7O0FBQUEscURBQTZHO0FBQzdHLDZGQUF3RjtBQUN4RixpRkFBNEU7QUFFNUUsTUFBYSxtQkFBb0IsU0FBUSwyREFBNEI7Q0F3QnBFO0FBbEJHO0lBSkMsd0JBQU0sQ0FBQyxDQUFDLEVBQUUsR0FBRyxDQUFDO0lBQ2QsMEJBQVEsQ0FBQywyREFBNEIsQ0FBQztJQUN0Qyw0QkFBVSxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsUUFBUSxJQUFJLENBQUMsQ0FBQyxLQUFLLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLENBQUMsS0FBSyxJQUFJLENBQUMsQ0FBQztJQUM3RSw0QkFBVSxFQUFFOztxREFDWTtBQU96QjtJQUxDLDRCQUFVLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxRQUFRLElBQUksQ0FBQyxDQUFDLEtBQUssSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsQ0FBQyxRQUFRLENBQUM7SUFDM0UsMEJBQVEsQ0FBQywyREFBNEIsQ0FBQztJQUN0QyxxQkFBRyxDQUFDLENBQUMsQ0FBQztJQUNOLDRCQUFVLEVBQUU7SUFDWix1QkFBSyxFQUFFOztrREFDYztBQU10QjtJQUpDLDRCQUFVLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxRQUFRLElBQUksQ0FBQyxDQUFDLEtBQUssSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsUUFBUSxJQUFJLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQzFGLDBCQUFRLENBQUMsMkRBQTRCLENBQUM7SUFDdEMsd0JBQU0sQ0FBQyxFQUFFLEVBQUUsRUFBRSxDQUFDO0lBQ2QsNEJBQVUsRUFBRTs7dURBQ2M7QUFJM0I7SUFGQywyQkFBUyxDQUFDLEtBQUssQ0FBQztJQUNoQiw0QkFBVSxFQUFFOztpREFDUTtBQXZCekIsa0RBd0JDIn0=