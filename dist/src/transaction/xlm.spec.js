"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const blockchain = __importStar(require("../blockchain"));
const model_1 = require("../model");
const xlm_1 = require("./xlm");
jest.mock('../blockchain');
describe('XLM transactions', () => {
    it('should test XLM transaction data', async () => {
        jest.spyOn(blockchain, 'xlmGetAccountInfo').mockResolvedValue({ sequence: '123' });
        const body = new model_1.TransferXlm();
        body.fromSecret = 'SCFCTIS5326CRI3XFFBEWGXFWZK3HTUFI2AOI5IJUZAX2W5KM2PXIFIQ';
        body.amount = '1';
        body.to = 'GB4HCKVMM6SVPVSO7SFYS7DUU2C5KESP3ZOVGOHG32MLC7T4B6G4ZBLO';
        const txData = await xlm_1.prepareXlmSignedTransaction(true, body);
        expect(txData).toContain('AAAAAgAAAAA0EqaLPO0bvBPvzGz4wucBtxmNXs');
    });
    it('should not test XLM transaction data, missing amount', async () => {
        jest.spyOn(blockchain, 'xlmGetAccountInfo').mockResolvedValue({ sequence: '123' });
        const body = new model_1.TransferXlm();
        body.fromSecret = 'SCFCTIS5326CRI3XFFBEWGXFWZK3HTUFI2AOI5IJUZAX2W5KM2PXIFIQ';
        body.to = 'GB4HCKVMM6SVPVSO7SFYS7DUU2C5KESP3ZOVGOHG32MLC7T4B6G4ZBLO';
        try {
            await xlm_1.prepareXlmSignedTransaction(true, body);
            fail('Validation did not pass.');
        }
        catch (e) {
            console.error(e);
        }
    });
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoieGxtLnNwZWMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvdHJhbnNhY3Rpb24veGxtLnNwZWMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsMERBQTRDO0FBQzVDLG9DQUFxQztBQUNyQywrQkFBa0Q7QUFFbEQsSUFBSSxDQUFDLElBQUksQ0FBQyxlQUFlLENBQUMsQ0FBQztBQUUzQixRQUFRLENBQUMsa0JBQWtCLEVBQUUsR0FBRyxFQUFFO0lBQzlCLEVBQUUsQ0FBQyxrQ0FBa0MsRUFBRSxLQUFLLElBQUksRUFBRTtRQUM5QyxJQUFJLENBQUMsS0FBSyxDQUFDLFVBQVUsRUFBRSxtQkFBbUIsQ0FBQyxDQUFDLGlCQUFpQixDQUFDLEVBQUMsUUFBUSxFQUFFLEtBQUssRUFBQyxDQUFDLENBQUM7UUFDakYsTUFBTSxJQUFJLEdBQUcsSUFBSSxtQkFBVyxFQUFFLENBQUM7UUFDL0IsSUFBSSxDQUFDLFVBQVUsR0FBRywwREFBMEQsQ0FBQztRQUM3RSxJQUFJLENBQUMsTUFBTSxHQUFHLEdBQUcsQ0FBQztRQUNsQixJQUFJLENBQUMsRUFBRSxHQUFHLDBEQUEwRCxDQUFDO1FBQ3JFLE1BQU0sTUFBTSxHQUFHLE1BQU0saUNBQTJCLENBQUMsSUFBSSxFQUFFLElBQUksQ0FBQyxDQUFDO1FBQzdELE1BQU0sQ0FBQyxNQUFNLENBQUMsQ0FBQyxTQUFTLENBQUMsd0NBQXdDLENBQUMsQ0FBQztJQUN2RSxDQUFDLENBQUMsQ0FBQztJQUVILEVBQUUsQ0FBQyxzREFBc0QsRUFBRSxLQUFLLElBQUksRUFBRTtRQUNsRSxJQUFJLENBQUMsS0FBSyxDQUFDLFVBQVUsRUFBRSxtQkFBbUIsQ0FBQyxDQUFDLGlCQUFpQixDQUFDLEVBQUMsUUFBUSxFQUFFLEtBQUssRUFBQyxDQUFDLENBQUM7UUFDakYsTUFBTSxJQUFJLEdBQUcsSUFBSSxtQkFBVyxFQUFFLENBQUM7UUFDL0IsSUFBSSxDQUFDLFVBQVUsR0FBRywwREFBMEQsQ0FBQztRQUM3RSxJQUFJLENBQUMsRUFBRSxHQUFHLDBEQUEwRCxDQUFDO1FBQ3JFLElBQUk7WUFDQSxNQUFNLGlDQUEyQixDQUFDLElBQUksRUFBRSxJQUFJLENBQUMsQ0FBQztZQUM5QyxJQUFJLENBQUMsMEJBQTBCLENBQUMsQ0FBQztTQUNwQztRQUFDLE9BQU8sQ0FBQyxFQUFFO1lBQ1IsT0FBTyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQztTQUNwQjtJQUNMLENBQUMsQ0FBQyxDQUFDO0FBQ1AsQ0FBQyxDQUFDLENBQUMifQ==