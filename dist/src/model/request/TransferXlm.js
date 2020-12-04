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
exports.TransferXlm = void 0;
const class_validator_1 = require("class-validator");
class TransferXlm {
}
__decorate([
    class_validator_1.IsNotEmpty(),
    class_validator_1.Length(56, 56),
    __metadata("design:type", String)
], TransferXlm.prototype, "fromSecret", void 0);
__decorate([
    class_validator_1.IsNotEmpty(),
    class_validator_1.Length(56, 56),
    __metadata("design:type", String)
], TransferXlm.prototype, "to", void 0);
__decorate([
    class_validator_1.IsNotEmpty(),
    class_validator_1.IsNumberString(),
    class_validator_1.Matches(/^[+]?((\d+(\.\d*)?)|(\.\d+))$/),
    __metadata("design:type", String)
], TransferXlm.prototype, "amount", void 0);
__decorate([
    class_validator_1.IsOptional(),
    __metadata("design:type", Boolean)
], TransferXlm.prototype, "initialize", void 0);
__decorate([
    class_validator_1.MaxLength(64),
    class_validator_1.Matches(/^[ -~]{0,64}$/),
    class_validator_1.IsOptional(),
    __metadata("design:type", String)
], TransferXlm.prototype, "message", void 0);
exports.TransferXlm = TransferXlm;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiVHJhbnNmZXJYbG0uanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9zcmMvbW9kZWwvcmVxdWVzdC9UcmFuc2ZlclhsbS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7QUFBQSxxREFBbUc7QUFFbkcsTUFBYSxXQUFXO0NBc0J2QjtBQWxCRztJQUZDLDRCQUFVLEVBQUU7SUFDWix3QkFBTSxDQUFDLEVBQUUsRUFBRSxFQUFFLENBQUM7OytDQUNXO0FBSTFCO0lBRkMsNEJBQVUsRUFBRTtJQUNaLHdCQUFNLENBQUMsRUFBRSxFQUFFLEVBQUUsQ0FBQzs7dUNBQ0c7QUFLbEI7SUFIQyw0QkFBVSxFQUFFO0lBQ1osZ0NBQWMsRUFBRTtJQUNoQix5QkFBTyxDQUFDLCtCQUErQixDQUFDOzsyQ0FDbkI7QUFHdEI7SUFEQyw0QkFBVSxFQUFFOzsrQ0FDYztBQUszQjtJQUhDLDJCQUFTLENBQUMsRUFBRSxDQUFDO0lBQ2IseUJBQU8sQ0FBQyxlQUFlLENBQUM7SUFDeEIsNEJBQVUsRUFBRTs7NENBQ1c7QUFyQjVCLGtDQXNCQyJ9