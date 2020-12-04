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
exports.Fee = void 0;
const class_validator_1 = require("class-validator");
class Fee {
}
__decorate([
    class_validator_1.IsNotEmpty(),
    class_validator_1.IsNumberString(),
    class_validator_1.Matches(/^[+]?((\d+(\.\d*)?)|(\.\d+))$/),
    __metadata("design:type", String)
], Fee.prototype, "gasLimit", void 0);
__decorate([
    class_validator_1.IsNotEmpty(),
    class_validator_1.IsNumberString(),
    class_validator_1.Matches(/^[+]?((\d+(\.\d*)?)|(\.\d+))$/),
    __metadata("design:type", String)
], Fee.prototype, "gasPrice", void 0);
exports.Fee = Fee;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiRmVlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vc3JjL21vZGVsL3JlcXVlc3QvRmVlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7OztBQUFBLHFEQUFvRTtBQUVwRSxNQUFhLEdBQUc7Q0FXZjtBQU5HO0lBSEMsNEJBQVUsRUFBRTtJQUNaLGdDQUFjLEVBQUU7SUFDaEIseUJBQU8sQ0FBQywrQkFBK0IsQ0FBQzs7cUNBQ2pCO0FBS3hCO0lBSEMsNEJBQVUsRUFBRTtJQUNaLGdDQUFjLEVBQUU7SUFDaEIseUJBQU8sQ0FBQywrQkFBK0IsQ0FBQzs7cUNBQ2pCO0FBVjVCLGtCQVdDIn0=