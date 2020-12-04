"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const model_1 = require("../model");
const vet_1 = require("./vet");
describe('VET transactions', () => {
    it('should test valid transaction data with fee estimation', async () => {
        const body = new model_1.TransferVet();
        body.fromPrivateKey = '0x4874827a55d87f2309c55b835af509e3427aa4d52321eeb49a2b93b5c0f8edfb';
        body.amount = '0';
        body.to = '0x8cb76aed9c5e336ef961265c6079c14e9cd3d2ea';
        const txData = await vet_1.prepareVetSignedTransaction(true, body);
        expect(txData).toContain('0x');
    });
    it('should test valid transaction data with custom fee', async () => {
        const body = new model_1.TransferVet();
        body.fromPrivateKey = '0x4874827a55d87f2309c55b835af509e3427aa4d52321eeb49a2b93b5c0f8edfb';
        body.amount = '0';
        body.fee = { gasLimit: '21000' };
        body.to = '0x8cb76aed9c5e336ef961265c6079c14e9cd3d2ea';
        const txData = await vet_1.prepareVetSignedTransaction(true, body);
        expect(txData).toContain('0x');
    });
    it('should not test valid transaction data, to private key assigned', async () => {
        const body = new model_1.TransferVet();
        body.amount = '0';
        body.fee = { gasLimit: '21000' };
        body.to = '0x8cb76aed9c5e336ef961265c6079c14e9cd3d2ea';
        try {
            await vet_1.prepareVetSignedTransaction(true, body);
            fail('Validation did not pass.');
        }
        catch (e) {
            console.error(e);
        }
    });
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidmV0LnNwZWMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvdHJhbnNhY3Rpb24vdmV0LnNwZWMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxvQ0FBcUM7QUFDckMsK0JBQWtEO0FBRWxELFFBQVEsQ0FBQyxrQkFBa0IsRUFBRSxHQUFHLEVBQUU7SUFDOUIsRUFBRSxDQUFDLHdEQUF3RCxFQUFFLEtBQUssSUFBSSxFQUFFO1FBQ3BFLE1BQU0sSUFBSSxHQUFHLElBQUksbUJBQVcsRUFBRSxDQUFDO1FBQy9CLElBQUksQ0FBQyxjQUFjLEdBQUcsb0VBQW9FLENBQUM7UUFDM0YsSUFBSSxDQUFDLE1BQU0sR0FBRyxHQUFHLENBQUM7UUFDbEIsSUFBSSxDQUFDLEVBQUUsR0FBRyw0Q0FBNEMsQ0FBQztRQUN2RCxNQUFNLE1BQU0sR0FBRyxNQUFNLGlDQUEyQixDQUFDLElBQUksRUFBRSxJQUFJLENBQUMsQ0FBQztRQUM3RCxNQUFNLENBQUMsTUFBTSxDQUFDLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQ25DLENBQUMsQ0FBQyxDQUFDO0lBRUgsRUFBRSxDQUFDLG9EQUFvRCxFQUFFLEtBQUssSUFBSSxFQUFFO1FBQ2hFLE1BQU0sSUFBSSxHQUFHLElBQUksbUJBQVcsRUFBRSxDQUFDO1FBQy9CLElBQUksQ0FBQyxjQUFjLEdBQUcsb0VBQW9FLENBQUM7UUFDM0YsSUFBSSxDQUFDLE1BQU0sR0FBRyxHQUFHLENBQUM7UUFDbEIsSUFBSSxDQUFDLEdBQUcsR0FBRyxFQUFDLFFBQVEsRUFBRSxPQUFPLEVBQUMsQ0FBQztRQUMvQixJQUFJLENBQUMsRUFBRSxHQUFHLDRDQUE0QyxDQUFDO1FBQ3ZELE1BQU0sTUFBTSxHQUFHLE1BQU0saUNBQTJCLENBQUMsSUFBSSxFQUFFLElBQUksQ0FBQyxDQUFDO1FBQzdELE1BQU0sQ0FBQyxNQUFNLENBQUMsQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDbkMsQ0FBQyxDQUFDLENBQUM7SUFFSCxFQUFFLENBQUMsaUVBQWlFLEVBQUUsS0FBSyxJQUFJLEVBQUU7UUFDN0UsTUFBTSxJQUFJLEdBQUcsSUFBSSxtQkFBVyxFQUFFLENBQUM7UUFDL0IsSUFBSSxDQUFDLE1BQU0sR0FBRyxHQUFHLENBQUM7UUFDbEIsSUFBSSxDQUFDLEdBQUcsR0FBRyxFQUFDLFFBQVEsRUFBRSxPQUFPLEVBQUMsQ0FBQztRQUMvQixJQUFJLENBQUMsRUFBRSxHQUFHLDRDQUE0QyxDQUFDO1FBQ3ZELElBQUk7WUFDQSxNQUFNLGlDQUEyQixDQUFDLElBQUksRUFBRSxJQUFJLENBQUMsQ0FBQztZQUM5QyxJQUFJLENBQUMsMEJBQTBCLENBQUMsQ0FBQztTQUNwQztRQUFDLE9BQU8sQ0FBQyxFQUFFO1lBQ1IsT0FBTyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQztTQUNwQjtJQUNMLENBQUMsQ0FBQyxDQUFDO0FBQ1AsQ0FBQyxDQUFDLENBQUMifQ==