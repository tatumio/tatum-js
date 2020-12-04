"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TransferBtcValidator = void 0;
const class_validator_1 = require("class-validator");
let TransferBtcValidator = class TransferBtcValidator {
    defaultMessage(validationArguments) {
        return 'Either fromAddress, or fromUTXO must be present.';
    }
    validate(value, validationArguments) {
        const data = validationArguments === null || validationArguments === void 0 ? void 0 : validationArguments.object;
        return !(data.fromAddress && data.fromUTXO);
    }
};
TransferBtcValidator = __decorate([
    class_validator_1.ValidatorConstraint({ name: 'fromAddressFromUTXO', async: false })
], TransferBtcValidator);
exports.TransferBtcValidator = TransferBtcValidator;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiVHJhbnNmZXJCdGNWYWxpZGF0b3IuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9zcmMvbW9kZWwvdmFsaWRhdGlvbi9UcmFuc2ZlckJ0Y1ZhbGlkYXRvci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFBQSxxREFBdUc7QUFJdkcsSUFBYSxvQkFBb0IsR0FBakMsTUFBYSxvQkFBb0I7SUFDdEIsY0FBYyxDQUFDLG1CQUF5QztRQUMzRCxPQUFPLGtEQUFrRCxDQUFDO0lBQzlELENBQUM7SUFFTSxRQUFRLENBQUMsS0FBVSxFQUFFLG1CQUF5QztRQUNqRSxNQUFNLElBQUksR0FBRyxtQkFBbUIsYUFBbkIsbUJBQW1CLHVCQUFuQixtQkFBbUIsQ0FBRSxNQUFvQyxDQUFDO1FBQ3ZFLE9BQU8sQ0FBQyxDQUFDLElBQUksQ0FBQyxXQUFXLElBQUksSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDO0lBQ2hELENBQUM7Q0FFSixDQUFBO0FBVlksb0JBQW9CO0lBRGhDLHFDQUFtQixDQUFDLEVBQUMsSUFBSSxFQUFFLHFCQUFxQixFQUFFLEtBQUssRUFBRSxLQUFLLEVBQUMsQ0FBQztHQUNwRCxvQkFBb0IsQ0FVaEM7QUFWWSxvREFBb0IifQ==