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
exports.TransferBtcBasedOffchain = exports.KeyPair = void 0;
const class_transformer_1 = require("class-transformer");
const class_validator_1 = require("class-validator");
const TransferBtcOffchainValidator_1 = require("../validation/TransferBtcOffchainValidator");
const CreateWithdrawal_1 = require("./CreateWithdrawal");
class KeyPair {
}
__decorate([
    class_validator_1.IsNotEmpty(),
    class_validator_1.Length(30, 50),
    __metadata("design:type", String)
], KeyPair.prototype, "address", void 0);
__decorate([
    class_validator_1.IsNotEmpty(),
    class_validator_1.Length(52, 52),
    __metadata("design:type", String)
], KeyPair.prototype, "privateKey", void 0);
exports.KeyPair = KeyPair;
class TransferBtcBasedOffchain extends CreateWithdrawal_1.CreateWithdrawal {
}
__decorate([
    class_validator_1.Length(1, 500),
    class_validator_1.Validate(TransferBtcOffchainValidator_1.TransferBtcOffchainValidator),
    class_validator_1.ValidateIf(o => (o.mnemonic && o.keyPair) || !o.keyPair),
    class_validator_1.IsNotEmpty(),
    __metadata("design:type", String)
], TransferBtcBasedOffchain.prototype, "mnemonic", void 0);
__decorate([
    class_validator_1.ValidateIf(o => (o.mnemonic && o.keyPair) || !o.mnemonic),
    class_validator_1.Validate(TransferBtcOffchainValidator_1.TransferBtcOffchainValidator),
    class_validator_1.IsNotEmpty(),
    class_transformer_1.Type(() => KeyPair),
    class_validator_1.ValidateNested({ each: true }),
    __metadata("design:type", Array)
], TransferBtcBasedOffchain.prototype, "keyPair", void 0);
exports.TransferBtcBasedOffchain = TransferBtcBasedOffchain;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiVHJhbnNmZXJCdGNCYXNlZE9mZmNoYWluLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vc3JjL21vZGVsL3JlcXVlc3QvVHJhbnNmZXJCdGNCYXNlZE9mZmNoYWluLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7OztBQUFBLHlEQUF1QztBQUN2QyxxREFBeUY7QUFDekYsNkZBQXdGO0FBQ3hGLHlEQUFvRDtBQUVwRCxNQUFhLE9BQU87Q0FTbkI7QUFMRztJQUZDLDRCQUFVLEVBQUU7SUFDWix3QkFBTSxDQUFDLEVBQUUsRUFBRSxFQUFFLENBQUM7O3dDQUNRO0FBSXZCO0lBRkMsNEJBQVUsRUFBRTtJQUNaLHdCQUFNLENBQUMsRUFBRSxFQUFFLEVBQUUsQ0FBQzs7MkNBQ1c7QUFSOUIsMEJBU0M7QUFFRCxNQUFhLHdCQUF5QixTQUFRLG1DQUFnQjtDQWM3RDtBQVJHO0lBSkMsd0JBQU0sQ0FBQyxDQUFDLEVBQUUsR0FBRyxDQUFDO0lBQ2QsMEJBQVEsQ0FBQywyREFBNEIsQ0FBQztJQUN0Qyw0QkFBVSxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsUUFBUSxJQUFJLENBQUMsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUM7SUFDeEQsNEJBQVUsRUFBRTs7MERBQ1k7QUFPekI7SUFMQyw0QkFBVSxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsUUFBUSxJQUFJLENBQUMsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxRQUFRLENBQUM7SUFDekQsMEJBQVEsQ0FBQywyREFBNEIsQ0FBQztJQUN0Qyw0QkFBVSxFQUFFO0lBQ1osd0JBQUksQ0FBQyxHQUFHLEVBQUUsQ0FBQyxPQUFPLENBQUM7SUFDbkIsZ0NBQWMsQ0FBQyxFQUFDLElBQUksRUFBRSxJQUFJLEVBQUMsQ0FBQzs7eURBQ0Y7QUFiL0IsNERBY0MifQ==