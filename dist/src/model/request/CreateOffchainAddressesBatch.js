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
exports.AddressBatch = exports.AddressQuery = void 0;
const class_transformer_1 = require("class-transformer");
const class_validator_1 = require("class-validator");
class AddressQuery {
}
__decorate([
    class_validator_1.IsNotEmpty(),
    class_validator_1.Length(24, 24),
    __metadata("design:type", String)
], AddressQuery.prototype, "accountId", void 0);
__decorate([
    class_validator_1.IsOptional(),
    class_validator_1.Min(0),
    class_validator_1.Max(2147483647),
    __metadata("design:type", Number)
], AddressQuery.prototype, "derivationKey", void 0);
exports.AddressQuery = AddressQuery;
class AddressBatch {
}
__decorate([
    class_validator_1.IsNotEmpty(),
    class_validator_1.ValidateNested({ each: true }),
    class_transformer_1.Type(() => AddressQuery),
    __metadata("design:type", Array)
], AddressBatch.prototype, "addresses", void 0);
exports.AddressBatch = AddressBatch;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQ3JlYXRlT2ZmY2hhaW5BZGRyZXNzZXNCYXRjaC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9tb2RlbC9yZXF1ZXN0L0NyZWF0ZU9mZmNoYWluQWRkcmVzc2VzQmF0Y2gudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7O0FBQUEseURBQXVDO0FBQ3ZDLHFEQUF5RjtBQUV6RixNQUFhLFlBQVk7Q0FVeEI7QUFORztJQUZDLDRCQUFVLEVBQUU7SUFDWix3QkFBTSxDQUFDLEVBQUUsRUFBRSxFQUFFLENBQUM7OytDQUNVO0FBS3pCO0lBSEMsNEJBQVUsRUFBRTtJQUNaLHFCQUFHLENBQUMsQ0FBQyxDQUFDO0lBQ04scUJBQUcsQ0FBQyxVQUFVLENBQUM7O21EQUNjO0FBVGxDLG9DQVVDO0FBRUQsTUFBYSxZQUFZO0NBTXhCO0FBREc7SUFIQyw0QkFBVSxFQUFFO0lBQ1osZ0NBQWMsQ0FBQyxFQUFDLElBQUksRUFBRSxJQUFJLEVBQUMsQ0FBQztJQUM1Qix3QkFBSSxDQUFDLEdBQUcsRUFBRSxDQUFDLFlBQVksQ0FBQzs7K0NBQ1E7QUFMckMsb0NBTUMifQ==