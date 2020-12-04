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
exports.TransferBchBlockchain = exports.FromUTXOBcash = void 0;
const class_transformer_1 = require("class-transformer");
const class_validator_1 = require("class-validator");
const TransferBtcBasedBlockchain_1 = require("./TransferBtcBasedBlockchain");
class FromUTXOBcash extends TransferBtcBasedBlockchain_1.FromUTXO {
}
__decorate([
    class_validator_1.IsNotEmpty(),
    class_validator_1.IsNumberString(),
    class_validator_1.Min(0),
    __metadata("design:type", String)
], FromUTXOBcash.prototype, "value", void 0);
exports.FromUTXOBcash = FromUTXOBcash;
class TransferBchBlockchain {
}
__decorate([
    class_validator_1.IsNotEmpty(),
    class_validator_1.ValidateNested({ each: true }),
    class_transformer_1.Type(() => FromUTXOBcash),
    __metadata("design:type", Array)
], TransferBchBlockchain.prototype, "fromUTXO", void 0);
__decorate([
    class_validator_1.ArrayNotEmpty(),
    class_validator_1.ValidateNested({ each: true }),
    class_transformer_1.Type(() => TransferBtcBasedBlockchain_1.To),
    __metadata("design:type", Array)
], TransferBchBlockchain.prototype, "to", void 0);
exports.TransferBchBlockchain = TransferBchBlockchain;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiVHJhbnNmZXJCY2hCbG9ja2NoYWluLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vc3JjL21vZGVsL3JlcXVlc3QvVHJhbnNmZXJCY2hCbG9ja2NoYWluLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7OztBQUFBLHlEQUF1QztBQUN2QyxxREFBK0Y7QUFDL0YsNkVBQTBEO0FBRTFELE1BQWEsYUFBYyxTQUFRLHFDQUFRO0NBSzFDO0FBREc7SUFIQyw0QkFBVSxFQUFFO0lBQ1osZ0NBQWMsRUFBRTtJQUNoQixxQkFBRyxDQUFDLENBQUMsQ0FBQzs7NENBQ2M7QUFKekIsc0NBS0M7QUFFRCxNQUFhLHFCQUFxQjtDQVdqQztBQU5HO0lBSEMsNEJBQVUsRUFBRTtJQUNaLGdDQUFjLENBQUMsRUFBQyxJQUFJLEVBQUUsSUFBSSxFQUFDLENBQUM7SUFDNUIsd0JBQUksQ0FBQyxHQUFHLEVBQUUsQ0FBQyxhQUFhLENBQUM7O3VEQUNPO0FBS2pDO0lBSEMsK0JBQWEsRUFBRTtJQUNmLGdDQUFjLENBQUMsRUFBQyxJQUFJLEVBQUUsSUFBSSxFQUFDLENBQUM7SUFDNUIsd0JBQUksQ0FBQyxHQUFHLEVBQUUsQ0FBQywrQkFBRSxDQUFDOztpREFDQztBQVZwQixzREFXQyJ9