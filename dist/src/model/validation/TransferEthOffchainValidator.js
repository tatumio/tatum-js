"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TransferEthOffchainValidator = void 0;
const class_validator_1 = require("class-validator");
let TransferEthOffchainValidator = class TransferEthOffchainValidator {
    defaultMessage(validationArguments) {
        return 'Either mnemonic and index, or privateKey a must be present.';
    }
    validate(value, validationArguments) {
        const data = validationArguments === null || validationArguments === void 0 ? void 0 : validationArguments.object;
        return !(data.mnemonic && data.index >= 0 && data.privateKey);
    }
};
TransferEthOffchainValidator = __decorate([
    class_validator_1.ValidatorConstraint({ name: 'mnemonicIndexPrivateKey', async: false })
], TransferEthOffchainValidator);
exports.TransferEthOffchainValidator = TransferEthOffchainValidator;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiVHJhbnNmZXJFdGhPZmZjaGFpblZhbGlkYXRvci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9tb2RlbC92YWxpZGF0aW9uL1RyYW5zZmVyRXRoT2ZmY2hhaW5WYWxpZGF0b3IudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBQUEscURBQXVHO0FBR3ZHLElBQWEsNEJBQTRCLEdBQXpDLE1BQWEsNEJBQTRCO0lBQzlCLGNBQWMsQ0FBQyxtQkFBeUM7UUFDM0QsT0FBTyw2REFBNkQsQ0FBQztJQUN6RSxDQUFDO0lBRU0sUUFBUSxDQUFDLEtBQVUsRUFBRSxtQkFBeUM7UUFDakUsTUFBTSxJQUFJLEdBQUcsbUJBQW1CLGFBQW5CLG1CQUFtQix1QkFBbkIsbUJBQW1CLENBQUUsTUFBYSxDQUFDO1FBQ2hELE9BQU8sQ0FBQyxDQUFDLElBQUksQ0FBQyxRQUFRLElBQUksSUFBSSxDQUFDLEtBQUssSUFBSSxDQUFDLElBQUksSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDO0lBQ2xFLENBQUM7Q0FFSixDQUFBO0FBVlksNEJBQTRCO0lBRHhDLHFDQUFtQixDQUFDLEVBQUMsSUFBSSxFQUFFLHlCQUF5QixFQUFFLEtBQUssRUFBRSxLQUFLLEVBQUMsQ0FBQztHQUN4RCw0QkFBNEIsQ0FVeEM7QUFWWSxvRUFBNEIifQ==