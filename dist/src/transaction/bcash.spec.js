"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const model_1 = require("../model");
const bcash_1 = require("./bcash");
describe('BCH transactions', () => {
    it('should test BCH transaction data', async () => {
        const body = new model_1.TransferBchBlockchain();
        body.fromUTXO = [{
                txHash: '53faa103e8217e1520f5149a4e8c84aeb58e55bdab11164a95e69a8ca50f8fcc',
                index: 0,
                value: '0.0001',
                privateKey: 'cVX7YtgL5muLTPncHFhP95oitV1mqUUA5VeSn8HeCRJbPqipzobf',
            }];
        body.to = [{
                address: 'mjJotvHmzEuyXZJGJXXknS6N3PWQnw6jf5',
                value: 0.02969944
            }];
        const txData = await bcash_1.prepareBitcoinCashSignedTransaction(true, body);
        expect(txData).toBe('0200000001cc8f0fa58c9ae6954a1611abbd558eb5ae848c4e9a14f520157e21e803a1fa5300000000644149b200cc9f41c0247c0fe1bfa9668adbcd2edd5c04bda9446db16c34e4b6e6ed2f2c5d9db454343ce84797114779610642b03ac09cdf9754795c605ce24f4974412103b17a162956975765aa6951f6349f9ab5bf510584c5df9f6065924bfd94a08513ffffffff0158512d00000000001976a914299480256432f2372df6d66e21ed48b097797c9a88ac00000000');
    });
    it('should not test BCH transaction data, missing to', async () => {
        const body = new model_1.TransferBchBlockchain();
        body.fromUTXO = [{
                txHash: '53faa103e8217e1520f5149a4e8c84aeb58e55bdab11164a95e69a8ca50f8fcc',
                index: 0,
                value: '0.0001',
                privateKey: 'cVX7YtgL5muLTPncHFhP95oitV1mqUUA5VeSn8HeCRJbPqipzobf',
            }];
        try {
            await bcash_1.prepareBitcoinCashSignedTransaction(true, body);
            fail('Validation did not pass.');
        }
        catch (e) {
            console.error(e);
        }
    });
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYmNhc2guc3BlYy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy90cmFuc2FjdGlvbi9iY2FzaC5zcGVjLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsb0NBQStDO0FBQy9DLG1DQUE0RDtBQUU1RCxRQUFRLENBQUMsa0JBQWtCLEVBQUUsR0FBRyxFQUFFO0lBQzlCLEVBQUUsQ0FBQyxrQ0FBa0MsRUFBRSxLQUFLLElBQUksRUFBRTtRQUM5QyxNQUFNLElBQUksR0FBRyxJQUFJLDZCQUFxQixFQUFFLENBQUM7UUFDekMsSUFBSSxDQUFDLFFBQVEsR0FBRyxDQUFDO2dCQUNiLE1BQU0sRUFBRSxrRUFBa0U7Z0JBQzFFLEtBQUssRUFBRSxDQUFDO2dCQUNSLEtBQUssRUFBRSxRQUFRO2dCQUNmLFVBQVUsRUFBRSxzREFBc0Q7YUFDckUsQ0FBQyxDQUFDO1FBQ0gsSUFBSSxDQUFDLEVBQUUsR0FBRyxDQUFDO2dCQUNQLE9BQU8sRUFBRSxvQ0FBb0M7Z0JBQzdDLEtBQUssRUFBRSxVQUFVO2FBQ3BCLENBQUMsQ0FBQztRQUNILE1BQU0sTUFBTSxHQUFHLE1BQU0sMkNBQW1DLENBQUMsSUFBSSxFQUFFLElBQUksQ0FBQyxDQUFDO1FBQ3JFLE1BQU0sQ0FBQyxNQUFNLENBQUMsQ0FBQyxJQUFJLENBQUMsb1hBQW9YLENBQUMsQ0FBQztJQUM5WSxDQUFDLENBQUMsQ0FBQztJQUVILEVBQUUsQ0FBQyxrREFBa0QsRUFBRSxLQUFLLElBQUksRUFBRTtRQUM5RCxNQUFNLElBQUksR0FBRyxJQUFJLDZCQUFxQixFQUFFLENBQUM7UUFDekMsSUFBSSxDQUFDLFFBQVEsR0FBRyxDQUFDO2dCQUNiLE1BQU0sRUFBRSxrRUFBa0U7Z0JBQzFFLEtBQUssRUFBRSxDQUFDO2dCQUNSLEtBQUssRUFBRSxRQUFRO2dCQUNmLFVBQVUsRUFBRSxzREFBc0Q7YUFDckUsQ0FBQyxDQUFDO1FBQ0gsSUFBSTtZQUNBLE1BQU0sMkNBQW1DLENBQUMsSUFBSSxFQUFFLElBQUksQ0FBQyxDQUFDO1lBQ3RELElBQUksQ0FBQywwQkFBMEIsQ0FBQyxDQUFDO1NBQ3BDO1FBQUMsT0FBTyxDQUFDLEVBQUU7WUFDUixPQUFPLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDO1NBQ3BCO0lBQ0wsQ0FBQyxDQUFDLENBQUM7QUFDUCxDQUFDLENBQUMsQ0FBQyJ9