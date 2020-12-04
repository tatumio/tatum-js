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
exports.TransferBtcBasedOffchainKMS = void 0;
const class_validator_1 = require("class-validator");
const TransferBtcOffchainValidator_1 = require("../validation/TransferBtcOffchainValidator");
const CreateWithdrawal_1 = require("./CreateWithdrawal");
class TransferBtcBasedOffchainKMS extends CreateWithdrawal_1.CreateWithdrawal {
}
__decorate([
    class_validator_1.Length(1, 150),
    class_validator_1.IsNotEmpty(),
    __metadata("design:type", String)
], TransferBtcBasedOffchainKMS.prototype, "xpub", void 0);
__decorate([
    class_validator_1.Validate(TransferBtcOffchainValidator_1.TransferBtcOffchainValidator),
    class_validator_1.IsUUID('4'),
    class_validator_1.IsNotEmpty(),
    __metadata("design:type", String)
], TransferBtcBasedOffchainKMS.prototype, "signatureId", void 0);
exports.TransferBtcBasedOffchainKMS = TransferBtcBasedOffchainKMS;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiVHJhbnNmZXJCdGNCYXNlZE9mZmNoYWluS01TLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vc3JjL21vZGVsL3JlcXVlc3QvVHJhbnNmZXJCdGNCYXNlZE9mZmNoYWluS01TLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7OztBQUFBLHFEQUFxRTtBQUNyRSw2RkFBd0Y7QUFDeEYseURBQW9EO0FBRXBELE1BQWEsMkJBQTRCLFNBQVEsbUNBQWdCO0NBVWhFO0FBTkc7SUFGQyx3QkFBTSxDQUFDLENBQUMsRUFBRSxHQUFHLENBQUM7SUFDZCw0QkFBVSxFQUFFOzt5REFDUTtBQUtyQjtJQUhDLDBCQUFRLENBQUMsMkRBQTRCLENBQUM7SUFDdEMsd0JBQU0sQ0FBQyxHQUFHLENBQUM7SUFDWCw0QkFBVSxFQUFFOztnRUFDZTtBQVRoQyxrRUFVQyJ9