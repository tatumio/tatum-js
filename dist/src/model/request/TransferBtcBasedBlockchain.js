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
exports.TransferBtcBasedBlockchain = exports.To = exports.FromUTXO = void 0;
const class_transformer_1 = require("class-transformer");
const class_validator_1 = require("class-validator");
const TransferBtcValidator_1 = require("../validation/TransferBtcValidator");
class FromAddress {
}
__decorate([
    class_validator_1.IsNotEmpty(),
    class_validator_1.Length(30, 50),
    __metadata("design:type", String)
], FromAddress.prototype, "address", void 0);
__decorate([
    class_validator_1.IsNotEmpty(),
    class_validator_1.Length(52, 52),
    __metadata("design:type", String)
], FromAddress.prototype, "privateKey", void 0);
class FromUTXO {
}
__decorate([
    class_validator_1.IsNotEmpty(),
    class_validator_1.Length(64, 64),
    __metadata("design:type", String)
], FromUTXO.prototype, "txHash", void 0);
__decorate([
    class_validator_1.IsNotEmpty(),
    class_validator_1.Min(0),
    class_validator_1.Max(4294967295),
    __metadata("design:type", Number)
], FromUTXO.prototype, "index", void 0);
__decorate([
    class_validator_1.IsNotEmpty(),
    class_validator_1.Length(52, 52),
    __metadata("design:type", String)
], FromUTXO.prototype, "privateKey", void 0);
exports.FromUTXO = FromUTXO;
class To {
}
__decorate([
    class_validator_1.IsNotEmpty(),
    class_validator_1.Length(30, 50),
    __metadata("design:type", String)
], To.prototype, "address", void 0);
__decorate([
    class_validator_1.IsNotEmpty(),
    class_validator_1.Min(0),
    __metadata("design:type", Number)
], To.prototype, "value", void 0);
exports.To = To;
class TransferBtcBasedBlockchain {
}
__decorate([
    class_validator_1.ValidateIf(o => (o.fromUTXO && o.fromAddress) || !o.fromUTXO),
    class_validator_1.Validate(TransferBtcValidator_1.TransferBtcValidator),
    class_validator_1.IsNotEmpty(),
    class_validator_1.ValidateNested({ each: true }),
    class_transformer_1.Type(() => FromAddress),
    __metadata("design:type", Array)
], TransferBtcBasedBlockchain.prototype, "fromAddress", void 0);
__decorate([
    class_validator_1.ValidateIf(o => (o.fromUTXO && o.fromAddress) || !o.fromAddress),
    class_validator_1.Validate(TransferBtcValidator_1.TransferBtcValidator),
    class_validator_1.IsNotEmpty(),
    class_validator_1.ValidateNested({ each: true }),
    class_transformer_1.Type(() => FromUTXO),
    __metadata("design:type", Array)
], TransferBtcBasedBlockchain.prototype, "fromUTXO", void 0);
__decorate([
    class_validator_1.ArrayNotEmpty(),
    class_validator_1.ValidateNested({ each: true }),
    class_transformer_1.Type(() => To),
    __metadata("design:type", Array)
], TransferBtcBasedBlockchain.prototype, "to", void 0);
exports.TransferBtcBasedBlockchain = TransferBtcBasedBlockchain;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiVHJhbnNmZXJCdGNCYXNlZEJsb2NrY2hhaW4uanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9zcmMvbW9kZWwvcmVxdWVzdC9UcmFuc2ZlckJ0Y0Jhc2VkQmxvY2tjaGFpbi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7QUFBQSx5REFBdUM7QUFDdkMscURBQWtIO0FBQ2xILDZFQUF3RTtBQUV4RSxNQUFNLFdBQVc7Q0FRaEI7QUFMRztJQUZDLDRCQUFVLEVBQUU7SUFDWix3QkFBTSxDQUFDLEVBQUUsRUFBRSxFQUFFLENBQUM7OzRDQUNRO0FBSXZCO0lBRkMsNEJBQVUsRUFBRTtJQUNaLHdCQUFNLENBQUMsRUFBRSxFQUFFLEVBQUUsQ0FBQzs7K0NBQ1c7QUFHOUIsTUFBYSxRQUFRO0NBY3BCO0FBVkc7SUFGQyw0QkFBVSxFQUFFO0lBQ1osd0JBQU0sQ0FBQyxFQUFFLEVBQUUsRUFBRSxDQUFDOzt3Q0FDTztBQUt0QjtJQUhDLDRCQUFVLEVBQUU7SUFDWixxQkFBRyxDQUFDLENBQUMsQ0FBQztJQUNOLHFCQUFHLENBQUMsVUFBVSxDQUFDOzt1Q0FDSztBQUlyQjtJQUZDLDRCQUFVLEVBQUU7SUFDWix3QkFBTSxDQUFDLEVBQUUsRUFBRSxFQUFFLENBQUM7OzRDQUNXO0FBYjlCLDRCQWNDO0FBRUQsTUFBYSxFQUFFO0NBUWQ7QUFMRztJQUZDLDRCQUFVLEVBQUU7SUFDWix3QkFBTSxDQUFDLEVBQUUsRUFBRSxFQUFFLENBQUM7O21DQUNRO0FBSXZCO0lBRkMsNEJBQVUsRUFBRTtJQUNaLHFCQUFHLENBQUMsQ0FBQyxDQUFDOztpQ0FDYztBQVB6QixnQkFRQztBQUVELE1BQWEsMEJBQTBCO0NBb0J0QztBQWJHO0lBTEMsNEJBQVUsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLFFBQVEsSUFBSSxDQUFDLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsUUFBUSxDQUFDO0lBQzdELDBCQUFRLENBQUMsMkNBQW9CLENBQUM7SUFDOUIsNEJBQVUsRUFBRTtJQUNaLGdDQUFjLENBQUMsRUFBQyxJQUFJLEVBQUUsSUFBSSxFQUFDLENBQUM7SUFDNUIsd0JBQUksQ0FBQyxHQUFHLEVBQUUsQ0FBQyxXQUFXLENBQUM7OytEQUNXO0FBT25DO0lBTEMsNEJBQVUsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLFFBQVEsSUFBSSxDQUFDLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsV0FBVyxDQUFDO0lBQ2hFLDBCQUFRLENBQUMsMkNBQW9CLENBQUM7SUFDOUIsNEJBQVUsRUFBRTtJQUNaLGdDQUFjLENBQUMsRUFBQyxJQUFJLEVBQUUsSUFBSSxFQUFDLENBQUM7SUFDNUIsd0JBQUksQ0FBQyxHQUFHLEVBQUUsQ0FBQyxRQUFRLENBQUM7OzREQUNRO0FBSzdCO0lBSEMsK0JBQWEsRUFBRTtJQUNmLGdDQUFjLENBQUMsRUFBQyxJQUFJLEVBQUUsSUFBSSxFQUFDLENBQUM7SUFDNUIsd0JBQUksQ0FBQyxHQUFHLEVBQUUsQ0FBQyxFQUFFLENBQUM7O3NEQUNDO0FBbkJwQixnRUFvQkMifQ==