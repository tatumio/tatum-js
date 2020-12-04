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
exports.TransferXrp = void 0;
const class_validator_1 = require("class-validator");
class TransferXrp {
}
__decorate([
    class_validator_1.IsNotEmpty(),
    class_validator_1.Length(33, 34),
    __metadata("design:type", String)
], TransferXrp.prototype, "fromAccount", void 0);
__decorate([
    class_validator_1.IsNotEmpty(),
    class_validator_1.Length(29, 29),
    __metadata("design:type", String)
], TransferXrp.prototype, "fromSecret", void 0);
__decorate([
    class_validator_1.IsNotEmpty(),
    class_validator_1.Length(33, 34),
    __metadata("design:type", String)
], TransferXrp.prototype, "to", void 0);
__decorate([
    class_validator_1.IsNotEmpty(),
    class_validator_1.IsNumberString(),
    class_validator_1.Matches(/^[+]?((\d+(\.\d*)?)|(\.\d+))$/),
    __metadata("design:type", String)
], TransferXrp.prototype, "amount", void 0);
__decorate([
    class_validator_1.IsNumberString(),
    class_validator_1.IsOptional(),
    class_validator_1.Matches(/^[+]?((\d+(\.\d*)?)|(\.\d+))$/),
    __metadata("design:type", String)
], TransferXrp.prototype, "fee", void 0);
__decorate([
    class_validator_1.Min(0),
    class_validator_1.IsOptional(),
    class_validator_1.IsInt(),
    __metadata("design:type", Number)
], TransferXrp.prototype, "sourceTag", void 0);
__decorate([
    class_validator_1.Min(0),
    class_validator_1.IsOptional(),
    class_validator_1.IsInt(),
    __metadata("design:type", Number)
], TransferXrp.prototype, "destinationTag", void 0);
exports.TransferXrp = TransferXrp;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiVHJhbnNmZXJYcnAuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9zcmMvbW9kZWwvcmVxdWVzdC9UcmFuc2ZlclhycC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7QUFBQSxxREFBb0c7QUFFcEcsTUFBYSxXQUFXO0NBaUN2QjtBQTdCRztJQUZDLDRCQUFVLEVBQUU7SUFDWix3QkFBTSxDQUFDLEVBQUUsRUFBRSxFQUFFLENBQUM7O2dEQUNZO0FBSTNCO0lBRkMsNEJBQVUsRUFBRTtJQUNaLHdCQUFNLENBQUMsRUFBRSxFQUFFLEVBQUUsQ0FBQzs7K0NBQ1c7QUFJMUI7SUFGQyw0QkFBVSxFQUFFO0lBQ1osd0JBQU0sQ0FBQyxFQUFFLEVBQUUsRUFBRSxDQUFDOzt1Q0FDRztBQUtsQjtJQUhDLDRCQUFVLEVBQUU7SUFDWixnQ0FBYyxFQUFFO0lBQ2hCLHlCQUFPLENBQUMsK0JBQStCLENBQUM7OzJDQUNuQjtBQUt0QjtJQUhDLGdDQUFjLEVBQUU7SUFDaEIsNEJBQVUsRUFBRTtJQUNaLHlCQUFPLENBQUMsK0JBQStCLENBQUM7O3dDQUNyQjtBQUtwQjtJQUhDLHFCQUFHLENBQUMsQ0FBQyxDQUFDO0lBQ04sNEJBQVUsRUFBRTtJQUNaLHVCQUFLLEVBQUU7OzhDQUNrQjtBQUsxQjtJQUhDLHFCQUFHLENBQUMsQ0FBQyxDQUFDO0lBQ04sNEJBQVUsRUFBRTtJQUNaLHVCQUFLLEVBQUU7O21EQUN1QjtBQWhDbkMsa0NBaUNDIn0=