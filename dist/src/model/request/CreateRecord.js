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
exports.CreateRecord = void 0;
const class_transformer_1 = require("class-transformer");
const class_validator_1 = require("class-validator");
const Fee_1 = require("./Fee");
class CreateRecord {
}
__decorate([
    class_validator_1.IsNotEmpty(),
    class_validator_1.Length(1, 130000),
    __metadata("design:type", String)
], CreateRecord.prototype, "data", void 0);
__decorate([
    class_validator_1.IsNotEmpty(),
    class_validator_1.Length(32, 66),
    __metadata("design:type", String)
], CreateRecord.prototype, "fromPrivateKey", void 0);
__decorate([
    class_validator_1.IsOptional(),
    class_validator_1.Length(42, 42),
    __metadata("design:type", String)
], CreateRecord.prototype, "to", void 0);
__decorate([
    class_validator_1.Min(0),
    class_validator_1.IsOptional(),
    __metadata("design:type", Number)
], CreateRecord.prototype, "nonce", void 0);
__decorate([
    class_validator_1.IsOptional(),
    class_transformer_1.Type(() => Fee_1.Fee),
    class_validator_1.ValidateNested(),
    __metadata("design:type", Fee_1.Fee)
], CreateRecord.prototype, "ethFee", void 0);
exports.CreateRecord = CreateRecord;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQ3JlYXRlUmVjb3JkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vc3JjL21vZGVsL3JlcXVlc3QvQ3JlYXRlUmVjb3JkLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7OztBQUFBLHlEQUF1QztBQUN2QyxxREFBb0Y7QUFDcEYsK0JBQTBCO0FBRTFCLE1BQWEsWUFBWTtDQXNCeEI7QUFsQkc7SUFGQyw0QkFBVSxFQUFFO0lBQ1osd0JBQU0sQ0FBQyxDQUFDLEVBQUUsTUFBTSxDQUFDOzswQ0FDRTtBQUlwQjtJQUZDLDRCQUFVLEVBQUU7SUFDWix3QkFBTSxDQUFDLEVBQUUsRUFBRSxFQUFFLENBQUM7O29EQUNlO0FBSTlCO0lBRkMsNEJBQVUsRUFBRTtJQUNaLHdCQUFNLENBQUMsRUFBRSxFQUFFLEVBQUUsQ0FBQzs7d0NBQ0k7QUFJbkI7SUFGQyxxQkFBRyxDQUFDLENBQUMsQ0FBQztJQUNOLDRCQUFVLEVBQUU7OzJDQUNTO0FBS3RCO0lBSEMsNEJBQVUsRUFBRTtJQUNaLHdCQUFJLENBQUMsR0FBRyxFQUFFLENBQUMsU0FBRyxDQUFDO0lBQ2YsZ0NBQWMsRUFBRTs4QkFDRCxTQUFHOzRDQUFDO0FBckJ4QixvQ0FzQkMifQ==