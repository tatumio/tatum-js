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
exports.CreateAccountsBatch = void 0;
const class_transformer_1 = require("class-transformer");
const class_validator_1 = require("class-validator");
const CreateAccount_1 = require("./CreateAccount");
class CreateAccountsBatch {
}
__decorate([
    class_validator_1.IsNotEmpty(),
    class_validator_1.ValidateNested({ each: true }),
    class_transformer_1.Type(() => CreateAccount_1.CreateAccount),
    __metadata("design:type", Array)
], CreateAccountsBatch.prototype, "accounts", void 0);
exports.CreateAccountsBatch = CreateAccountsBatch;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQ3JlYXRlQWNjb3VudHNCYXRjaC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9tb2RlbC9yZXF1ZXN0L0NyZWF0ZUFjY291bnRzQmF0Y2gudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7O0FBQUEseURBQXVDO0FBQ3ZDLHFEQUEyRDtBQUMzRCxtREFBOEM7QUFFOUMsTUFBYSxtQkFBbUI7Q0FNL0I7QUFERztJQUhDLDRCQUFVLEVBQUU7SUFDWixnQ0FBYyxDQUFDLEVBQUMsSUFBSSxFQUFFLElBQUksRUFBQyxDQUFDO0lBQzVCLHdCQUFJLENBQUMsR0FBRyxFQUFFLENBQUMsNkJBQWEsQ0FBQzs7cURBQ087QUFMckMsa0RBTUMifQ==