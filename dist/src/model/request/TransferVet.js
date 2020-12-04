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
exports.TransferVet = void 0;
const class_validator_1 = require("class-validator");
class VetFee {
}
__decorate([
    class_validator_1.IsNotEmpty(),
    class_validator_1.IsNumberString(),
    class_validator_1.Matches(/^[+]?((\d+(\.\d*)?)|(\.\d+))$/),
    __metadata("design:type", String)
], VetFee.prototype, "gasLimit", void 0);
class TransferVet {
}
__decorate([
    class_validator_1.IsNotEmpty(),
    class_validator_1.Length(66, 66),
    __metadata("design:type", String)
], TransferVet.prototype, "fromPrivateKey", void 0);
__decorate([
    class_validator_1.IsNotEmpty(),
    class_validator_1.Length(42, 42),
    __metadata("design:type", String)
], TransferVet.prototype, "to", void 0);
__decorate([
    class_validator_1.IsNotEmpty(),
    class_validator_1.IsNumberString(),
    class_validator_1.Matches(/^[+]?((\d+(\.\d*)?)|(\.\d+))$/),
    __metadata("design:type", String)
], TransferVet.prototype, "amount", void 0);
__decorate([
    class_validator_1.MaxLength(10000),
    class_validator_1.IsOptional(),
    __metadata("design:type", String)
], TransferVet.prototype, "data", void 0);
__decorate([
    class_validator_1.IsOptional(),
    __metadata("design:type", VetFee)
], TransferVet.prototype, "fee", void 0);
exports.TransferVet = TransferVet;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiVHJhbnNmZXJWZXQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9zcmMvbW9kZWwvcmVxdWVzdC9UcmFuc2ZlclZldC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7QUFBQSxxREFBbUc7QUFFbkcsTUFBTSxNQUFNO0NBS1g7QUFERztJQUhDLDRCQUFVLEVBQUU7SUFDWixnQ0FBYyxFQUFFO0lBQ2hCLHlCQUFPLENBQUMsK0JBQStCLENBQUM7O3dDQUNqQjtBQUc1QixNQUFhLFdBQVc7Q0FxQnZCO0FBakJHO0lBRkMsNEJBQVUsRUFBRTtJQUNaLHdCQUFNLENBQUMsRUFBRSxFQUFFLEVBQUUsQ0FBQzs7bURBQ2U7QUFJOUI7SUFGQyw0QkFBVSxFQUFFO0lBQ1osd0JBQU0sQ0FBQyxFQUFFLEVBQUUsRUFBRSxDQUFDOzt1Q0FDRztBQUtsQjtJQUhDLDRCQUFVLEVBQUU7SUFDWixnQ0FBYyxFQUFFO0lBQ2hCLHlCQUFPLENBQUMsK0JBQStCLENBQUM7OzJDQUNuQjtBQUl0QjtJQUZDLDJCQUFTLENBQUMsS0FBSyxDQUFDO0lBQ2hCLDRCQUFVLEVBQUU7O3lDQUNRO0FBR3JCO0lBREMsNEJBQVUsRUFBRTs4QkFDQSxNQUFNO3dDQUFDO0FBcEJ4QixrQ0FxQkMifQ==