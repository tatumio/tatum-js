"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TransferBtcOffchainValidator = void 0;
const class_validator_1 = require("class-validator");
let TransferBtcOffchainValidator = class TransferBtcOffchainValidator {
    defaultMessage(validationArguments) {
        return 'Either mnemonic, or keyPair must be present.';
    }
    validate(value, validationArguments) {
        const data = validationArguments === null || validationArguments === void 0 ? void 0 : validationArguments.object;
        return !(data.mnemonic && data.keyPair);
    }
};
TransferBtcOffchainValidator = __decorate([
    class_validator_1.ValidatorConstraint({ name: 'mnemonicKeypair', async: false })
], TransferBtcOffchainValidator);
exports.TransferBtcOffchainValidator = TransferBtcOffchainValidator;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiVHJhbnNmZXJCdGNPZmZjaGFpblZhbGlkYXRvci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9tb2RlbC92YWxpZGF0aW9uL1RyYW5zZmVyQnRjT2ZmY2hhaW5WYWxpZGF0b3IudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBQUEscURBQXVHO0FBSXZHLElBQWEsNEJBQTRCLEdBQXpDLE1BQWEsNEJBQTRCO0lBQzlCLGNBQWMsQ0FBQyxtQkFBeUM7UUFDM0QsT0FBTyw4Q0FBOEMsQ0FBQztJQUMxRCxDQUFDO0lBRU0sUUFBUSxDQUFDLEtBQVUsRUFBRSxtQkFBeUM7UUFDakUsTUFBTSxJQUFJLEdBQUcsbUJBQW1CLGFBQW5CLG1CQUFtQix1QkFBbkIsbUJBQW1CLENBQUUsTUFBa0MsQ0FBQztRQUNyRSxPQUFPLENBQUMsQ0FBQyxJQUFJLENBQUMsUUFBUSxJQUFJLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQztJQUM1QyxDQUFDO0NBRUosQ0FBQTtBQVZZLDRCQUE0QjtJQUR4QyxxQ0FBbUIsQ0FBQyxFQUFDLElBQUksRUFBRSxpQkFBaUIsRUFBRSxLQUFLLEVBQUUsS0FBSyxFQUFDLENBQUM7R0FDaEQsNEJBQTRCLENBVXhDO0FBVlksb0VBQTRCIn0=