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
exports.TransferXlmOffchainKMS = void 0;
const class_validator_1 = require("class-validator");
const CreateWithdrawal_1 = require("./CreateWithdrawal");
class TransferXlmOffchainKMS extends CreateWithdrawal_1.CreateWithdrawal {
}
__decorate([
    class_validator_1.IsNotEmpty(),
    class_validator_1.Length(56, 56),
    __metadata("design:type", String)
], TransferXlmOffchainKMS.prototype, "fromAccount", void 0);
__decorate([
    class_validator_1.Length(36, 36),
    class_validator_1.IsUUID('4'),
    class_validator_1.IsNotEmpty(),
    __metadata("design:type", String)
], TransferXlmOffchainKMS.prototype, "signatureId", void 0);
exports.TransferXlmOffchainKMS = TransferXlmOffchainKMS;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiVHJhbnNmZXJYbG1PZmZjaGFpbktNUy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9tb2RlbC9yZXF1ZXN0L1RyYW5zZmVyWGxtT2ZmY2hhaW5LTVMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7O0FBQUEscURBQTJEO0FBQzNELHlEQUFvRDtBQUVwRCxNQUFhLHNCQUF1QixTQUFRLG1DQUFnQjtDQVczRDtBQVBHO0lBRkMsNEJBQVUsRUFBRTtJQUNaLHdCQUFNLENBQUMsRUFBRSxFQUFFLEVBQUUsQ0FBQzs7MkRBQ1k7QUFLM0I7SUFIQyx3QkFBTSxDQUFDLEVBQUUsRUFBRSxFQUFFLENBQUM7SUFDZCx3QkFBTSxDQUFDLEdBQUcsQ0FBQztJQUNYLDRCQUFVLEVBQUU7OzJEQUNlO0FBVGhDLHdEQVdDIn0=