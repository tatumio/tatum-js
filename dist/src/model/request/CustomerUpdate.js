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
exports.CustomerUpdate = void 0;
const class_validator_1 = require("class-validator");
const response_1 = require("../response");
const Country_1 = require("./Country");
class CustomerUpdate {
}
__decorate([
    class_validator_1.Length(2, 2),
    class_validator_1.IsOptional(),
    class_validator_1.IsIn(Object.keys(Country_1.Country)),
    __metadata("design:type", String)
], CustomerUpdate.prototype, "customerCountry", void 0);
__decorate([
    class_validator_1.Length(3, 3),
    class_validator_1.IsOptional(),
    class_validator_1.IsIn(Object.keys(response_1.Fiat)),
    __metadata("design:type", String)
], CustomerUpdate.prototype, "accountingCurrency", void 0);
__decorate([
    class_validator_1.Length(2, 2),
    class_validator_1.IsOptional(),
    class_validator_1.IsIn(Object.keys(Country_1.Country)),
    __metadata("design:type", String)
], CustomerUpdate.prototype, "providerCountry", void 0);
__decorate([
    class_validator_1.Length(1, 100),
    __metadata("design:type", String)
], CustomerUpdate.prototype, "externalId", void 0);
exports.CustomerUpdate = CustomerUpdate;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQ3VzdG9tZXJVcGRhdGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9zcmMvbW9kZWwvcmVxdWVzdC9DdXN0b21lclVwZGF0ZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7QUFBQSxxREFBeUQ7QUFDekQsMENBQWlDO0FBQ2pDLHVDQUFrQztBQUVsQyxNQUFhLGNBQWM7Q0FtQjFCO0FBZEc7SUFIQyx3QkFBTSxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUM7SUFDWiw0QkFBVSxFQUFFO0lBQ1osc0JBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLGlCQUFPLENBQUMsQ0FBQzs7dURBQ007QUFLakM7SUFIQyx3QkFBTSxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUM7SUFDWiw0QkFBVSxFQUFFO0lBQ1osc0JBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLGVBQUksQ0FBQyxDQUFDOzswREFDUztBQUtqQztJQUhDLHdCQUFNLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQztJQUNaLDRCQUFVLEVBQUU7SUFDWixzQkFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsaUJBQU8sQ0FBQyxDQUFDOzt1REFDTTtBQUdqQztJQURDLHdCQUFNLENBQUMsQ0FBQyxFQUFFLEdBQUcsQ0FBQzs7a0RBQ1c7QUFsQjlCLHdDQW1CQyJ9