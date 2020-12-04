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
exports.BlockAmount = void 0;
const class_validator_1 = require("class-validator");
class BlockAmount {
}
__decorate([
    class_validator_1.IsNotEmpty(),
    class_validator_1.IsNumberString(),
    class_validator_1.MaxLength(38),
    class_validator_1.Matches(/^[+]?((\d+(\.\d*)?)|(\.\d+))$/),
    __metadata("design:type", String)
], BlockAmount.prototype, "amount", void 0);
__decorate([
    class_validator_1.IsNotEmpty(),
    class_validator_1.Length(1, 100),
    __metadata("design:type", String)
], BlockAmount.prototype, "type", void 0);
__decorate([
    class_validator_1.IsOptional(),
    class_validator_1.Length(1, 300),
    __metadata("design:type", String)
], BlockAmount.prototype, "description", void 0);
exports.BlockAmount = BlockAmount;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQmxvY2tBbW91bnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9zcmMvbW9kZWwvcmVxdWVzdC9CbG9ja0Ftb3VudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7QUFBQSxxREFBbUc7QUFFbkcsTUFBYSxXQUFXO0NBZXZCO0FBVEc7SUFKQyw0QkFBVSxFQUFFO0lBQ1osZ0NBQWMsRUFBRTtJQUNoQiwyQkFBUyxDQUFDLEVBQUUsQ0FBQztJQUNiLHlCQUFPLENBQUMsK0JBQStCLENBQUM7OzJDQUNuQjtBQUl0QjtJQUZDLDRCQUFVLEVBQUU7SUFDWix3QkFBTSxDQUFDLENBQUMsRUFBRSxHQUFHLENBQUM7O3lDQUNLO0FBSXBCO0lBRkMsNEJBQVUsRUFBRTtJQUNaLHdCQUFNLENBQUMsQ0FBQyxFQUFFLEdBQUcsQ0FBQzs7Z0RBQ2E7QUFkaEMsa0NBZUMifQ==