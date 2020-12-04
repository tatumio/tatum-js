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
const xrp_1 = require("./xrp");
jest.mock('../blockchain');
describe('XRP transactions', () => {
    it('should test XRP transaction data', async () => {
        jest.spyOn(blockchain, 'xrpGetAccountInfo').mockResolvedValue({
            ledger_current_index: 1,
            account_data: { Sequence: 123 }
        });
        const body = new model_1.TransferXrp();
        body.fromSecret = 'shunwft7BwrFHdcXmAA87CazLsRMY';
        body.fromAccount = 'rKHuaCVSzJCFh43ji9EvFAysmu1KHdMb8N';
        body.fee = '0.00001';
        body.amount = '1';
        body.to = 'rKHuaCVSzJCFh43ji9EvFAysmu1KHdMb8N';
        const txData = await xrp_1.prepareXrpSignedTransaction(body);
        expect(txData).toContain('1200002280000000240000007B201B000000066140000000000F424068400000000000000A732102A6736884D857E721F19B91226FBA68D638009FA44B14CD46C63CC30253C8715C74473045022100F57CE43BE920FCE2DD5B8E03F1A64A9F6E46D68A37EE13BDE0B193E12635DF94022018740EED96BB501ACC1090AD722CED4C38E388DF1705EDC5A47558F59C7343D88114C8A4688E754167637D0E2C00F14C7E15AAFDA42C8314C8A4688E754167637D0E2C00F14C7E15AAFDA42C');
    });
    it('should not test XRP transaction data, missing amount', async () => {
        jest.spyOn(blockchain, 'xrpGetAccountInfo').mockResolvedValue({
            ledger_current_index: 1,
            account_data: { Sequence: 123 }
        });
        const body = new model_1.TransferXrp();
        body.fromSecret = 'shunwft7BwrFHdcXmAA87CazLsRMY';
        body.fee = '100';
        body.fromAccount = 'rKHuaCVSzJCFh43ji9EvFAysmu1KHdMb8N';
        body.to = 'rKHuaCVSzJCFh43ji9EvFAysmu1KHdMb8N';
        try {
            await xrp_1.prepareXrpSignedTransaction(body);
            fail('Validation did not pass.');
        }
        catch (e) {
            console.error(e);
        }
    });
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoieHJwLnNwZWMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvdHJhbnNhY3Rpb24veHJwLnNwZWMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsMERBQTRDO0FBQzVDLG9DQUFxQztBQUNyQywrQkFBa0Q7QUFFbEQsSUFBSSxDQUFDLElBQUksQ0FBQyxlQUFlLENBQUMsQ0FBQztBQUUzQixRQUFRLENBQUMsa0JBQWtCLEVBQUUsR0FBRyxFQUFFO0lBQzlCLEVBQUUsQ0FBQyxrQ0FBa0MsRUFBRSxLQUFLLElBQUksRUFBRTtRQUM5QyxJQUFJLENBQUMsS0FBSyxDQUFDLFVBQVUsRUFBRSxtQkFBbUIsQ0FBQyxDQUFDLGlCQUFpQixDQUFDO1lBQzFELG9CQUFvQixFQUFFLENBQUM7WUFDdkIsWUFBWSxFQUFFLEVBQUMsUUFBUSxFQUFFLEdBQUcsRUFBQztTQUNoQyxDQUFDLENBQUM7UUFDSCxNQUFNLElBQUksR0FBRyxJQUFJLG1CQUFXLEVBQUUsQ0FBQztRQUMvQixJQUFJLENBQUMsVUFBVSxHQUFHLCtCQUErQixDQUFDO1FBQ2xELElBQUksQ0FBQyxXQUFXLEdBQUcsb0NBQW9DLENBQUM7UUFDeEQsSUFBSSxDQUFDLEdBQUcsR0FBRyxTQUFTLENBQUM7UUFDckIsSUFBSSxDQUFDLE1BQU0sR0FBRyxHQUFHLENBQUM7UUFDbEIsSUFBSSxDQUFDLEVBQUUsR0FBRyxvQ0FBb0MsQ0FBQztRQUMvQyxNQUFNLE1BQU0sR0FBRyxNQUFNLGlDQUEyQixDQUFDLElBQUksQ0FBQyxDQUFDO1FBQ3ZELE1BQU0sQ0FBQyxNQUFNLENBQUMsQ0FBQyxTQUFTLENBQUMsNFhBQTRYLENBQUMsQ0FBQztJQUMzWixDQUFDLENBQUMsQ0FBQztJQUVILEVBQUUsQ0FBQyxzREFBc0QsRUFBRSxLQUFLLElBQUksRUFBRTtRQUNsRSxJQUFJLENBQUMsS0FBSyxDQUFDLFVBQVUsRUFBRSxtQkFBbUIsQ0FBQyxDQUFDLGlCQUFpQixDQUFDO1lBQzFELG9CQUFvQixFQUFFLENBQUM7WUFDdkIsWUFBWSxFQUFFLEVBQUMsUUFBUSxFQUFFLEdBQUcsRUFBQztTQUNoQyxDQUFDLENBQUM7UUFDSCxNQUFNLElBQUksR0FBRyxJQUFJLG1CQUFXLEVBQUUsQ0FBQztRQUMvQixJQUFJLENBQUMsVUFBVSxHQUFHLCtCQUErQixDQUFDO1FBQ2xELElBQUksQ0FBQyxHQUFHLEdBQUcsS0FBSyxDQUFDO1FBQ2pCLElBQUksQ0FBQyxXQUFXLEdBQUcsb0NBQW9DLENBQUM7UUFDeEQsSUFBSSxDQUFDLEVBQUUsR0FBRyxvQ0FBb0MsQ0FBQztRQUMvQyxJQUFJO1lBQ0EsTUFBTSxpQ0FBMkIsQ0FBQyxJQUFJLENBQUMsQ0FBQztZQUN4QyxJQUFJLENBQUMsMEJBQTBCLENBQUMsQ0FBQztTQUNwQztRQUFDLE9BQU8sQ0FBQyxFQUFFO1lBQ1IsT0FBTyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQztTQUNwQjtJQUNMLENBQUMsQ0FBQyxDQUFDO0FBQ1AsQ0FBQyxDQUFDLENBQUMifQ==