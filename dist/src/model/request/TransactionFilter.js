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
exports.TransactionFilter = void 0;
const class_validator_1 = require("class-validator");
const OperationType_1 = require("../response/ledger/OperationType");
const TransactionType_1 = require("../response/ledger/TransactionType");
class TransactionFilter {
}
__decorate([
    class_validator_1.Length(1, 50),
    class_validator_1.IsString(),
    class_validator_1.IsOptional(),
    __metadata("design:type", String)
], TransactionFilter.prototype, "id", void 0);
__decorate([
    class_validator_1.Min(0),
    class_validator_1.IsNumber(),
    class_validator_1.IsOptional(),
    __metadata("design:type", Number)
], TransactionFilter.prototype, "from", void 0);
__decorate([
    class_validator_1.Min(0),
    class_validator_1.IsNumber(),
    class_validator_1.IsOptional(),
    __metadata("design:type", Number)
], TransactionFilter.prototype, "to", void 0);
__decorate([
    class_validator_1.Length(1, 50),
    class_validator_1.IsString(),
    class_validator_1.IsOptional(),
    __metadata("design:type", String)
], TransactionFilter.prototype, "account", void 0);
__decorate([
    class_validator_1.Length(1, 50),
    class_validator_1.IsString(),
    class_validator_1.IsOptional(),
    __metadata("design:type", String)
], TransactionFilter.prototype, "counterAccount", void 0);
__decorate([
    class_validator_1.Length(1, 50),
    class_validator_1.IsString(),
    class_validator_1.IsOptional(),
    __metadata("design:type", String)
], TransactionFilter.prototype, "currency", void 0);
__decorate([
    class_validator_1.Length(1, 100),
    class_validator_1.IsString(),
    class_validator_1.IsOptional(),
    __metadata("design:type", String)
], TransactionFilter.prototype, "paymentId", void 0);
__decorate([
    class_validator_1.Length(1, 100),
    class_validator_1.IsString(),
    class_validator_1.IsOptional(),
    __metadata("design:type", String)
], TransactionFilter.prototype, "transactionCode", void 0);
__decorate([
    class_validator_1.Length(1, 500),
    class_validator_1.IsString(),
    class_validator_1.IsOptional(),
    __metadata("design:type", String)
], TransactionFilter.prototype, "senderNote", void 0);
__decorate([
    class_validator_1.Length(1, 500),
    class_validator_1.IsString(),
    class_validator_1.IsOptional(),
    __metadata("design:type", String)
], TransactionFilter.prototype, "recipientNote", void 0);
__decorate([
    class_validator_1.IsString(),
    class_validator_1.Length(4, 22),
    class_validator_1.IsOptional(),
    class_validator_1.IsIn(Object.keys(OperationType_1.OperationType)),
    __metadata("design:type", String)
], TransactionFilter.prototype, "opType", void 0);
__decorate([
    class_validator_1.IsOptional(),
    class_validator_1.Length(6, 23),
    class_validator_1.IsIn(Object.keys(TransactionType_1.TransactionType)),
    class_validator_1.IsString(),
    __metadata("design:type", String)
], TransactionFilter.prototype, "transactionType", void 0);
exports.TransactionFilter = TransactionFilter;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiVHJhbnNhY3Rpb25GaWx0ZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9zcmMvbW9kZWwvcmVxdWVzdC9UcmFuc2FjdGlvbkZpbHRlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7QUFBQSxxREFBa0Y7QUFDbEYsb0VBQStEO0FBQy9ELHdFQUFtRTtBQUVuRSxNQUFhLGlCQUFpQjtDQStEN0I7QUExREc7SUFIQyx3QkFBTSxDQUFDLENBQUMsRUFBRSxFQUFFLENBQUM7SUFDYiwwQkFBUSxFQUFFO0lBQ1YsNEJBQVUsRUFBRTs7NkNBQ007QUFLbkI7SUFIQyxxQkFBRyxDQUFDLENBQUMsQ0FBQztJQUNOLDBCQUFRLEVBQUU7SUFDViw0QkFBVSxFQUFFOzsrQ0FDUTtBQUtyQjtJQUhDLHFCQUFHLENBQUMsQ0FBQyxDQUFDO0lBQ04sMEJBQVEsRUFBRTtJQUNWLDRCQUFVLEVBQUU7OzZDQUNNO0FBS25CO0lBSEMsd0JBQU0sQ0FBQyxDQUFDLEVBQUUsRUFBRSxDQUFDO0lBQ2IsMEJBQVEsRUFBRTtJQUNWLDRCQUFVLEVBQUU7O2tEQUNXO0FBS3hCO0lBSEMsd0JBQU0sQ0FBQyxDQUFDLEVBQUUsRUFBRSxDQUFDO0lBQ2IsMEJBQVEsRUFBRTtJQUNWLDRCQUFVLEVBQUU7O3lEQUNrQjtBQUsvQjtJQUhDLHdCQUFNLENBQUMsQ0FBQyxFQUFFLEVBQUUsQ0FBQztJQUNiLDBCQUFRLEVBQUU7SUFDViw0QkFBVSxFQUFFOzttREFDWTtBQUt6QjtJQUhDLHdCQUFNLENBQUMsQ0FBQyxFQUFFLEdBQUcsQ0FBQztJQUNkLDBCQUFRLEVBQUU7SUFDViw0QkFBVSxFQUFFOztvREFDYTtBQUsxQjtJQUhDLHdCQUFNLENBQUMsQ0FBQyxFQUFFLEdBQUcsQ0FBQztJQUNkLDBCQUFRLEVBQUU7SUFDViw0QkFBVSxFQUFFOzswREFDbUI7QUFLaEM7SUFIQyx3QkFBTSxDQUFDLENBQUMsRUFBRSxHQUFHLENBQUM7SUFDZCwwQkFBUSxFQUFFO0lBQ1YsNEJBQVUsRUFBRTs7cURBQ2M7QUFLM0I7SUFIQyx3QkFBTSxDQUFDLENBQUMsRUFBRSxHQUFHLENBQUM7SUFDZCwwQkFBUSxFQUFFO0lBQ1YsNEJBQVUsRUFBRTs7d0RBQ2lCO0FBTTlCO0lBSkMsMEJBQVEsRUFBRTtJQUNWLHdCQUFNLENBQUMsQ0FBQyxFQUFFLEVBQUUsQ0FBQztJQUNiLDRCQUFVLEVBQUU7SUFDWixzQkFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsNkJBQWEsQ0FBQyxDQUFDOztpREFDSDtBQU05QjtJQUpDLDRCQUFVLEVBQUU7SUFDWix3QkFBTSxDQUFDLENBQUMsRUFBRSxFQUFFLENBQUM7SUFDYixzQkFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsaUNBQWUsQ0FBQyxDQUFDO0lBQ2xDLDBCQUFRLEVBQUU7OzBEQUM4QjtBQTlEN0MsOENBK0RDIn0=