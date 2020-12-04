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
exports.TransferXrpOffchain = void 0;
const class_validator_1 = require("class-validator");
const CreateWithdrawal_1 = require("./CreateWithdrawal");
class TransferXrpOffchain extends CreateWithdrawal_1.CreateWithdrawal {
}
__decorate([
    class_validator_1.IsNotEmpty(),
    class_validator_1.Length(33, 34),
    __metadata("design:type", String)
], TransferXrpOffchain.prototype, "account", void 0);
__decorate([
    class_validator_1.IsNotEmpty(),
    class_validator_1.Length(29, 29),
    __metadata("design:type", String)
], TransferXrpOffchain.prototype, "secret", void 0);
__decorate([
    class_validator_1.IsOptional(),
    class_validator_1.Min(0),
    __metadata("design:type", Number)
], TransferXrpOffchain.prototype, "sourceTag", void 0);
exports.TransferXrpOffchain = TransferXrpOffchain;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiVHJhbnNmZXJYcnBPZmZjaGFpbi5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9tb2RlbC9yZXF1ZXN0L1RyYW5zZmVyWHJwT2ZmY2hhaW4udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7O0FBQUEscURBQW9FO0FBQ3BFLHlEQUFvRDtBQUVwRCxNQUFhLG1CQUFvQixTQUFRLG1DQUFnQjtDQVl4RDtBQVRHO0lBRkMsNEJBQVUsRUFBRTtJQUNaLHdCQUFNLENBQUMsRUFBRSxFQUFFLEVBQUUsQ0FBQzs7b0RBQ1E7QUFJdkI7SUFGQyw0QkFBVSxFQUFFO0lBQ1osd0JBQU0sQ0FBQyxFQUFFLEVBQUUsRUFBRSxDQUFDOzttREFDTztBQUl0QjtJQUZDLDRCQUFVLEVBQUU7SUFDWixxQkFBRyxDQUFDLENBQUMsQ0FBQzs7c0RBQ21CO0FBWDlCLGtEQVlDIn0=