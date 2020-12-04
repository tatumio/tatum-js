"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const model_1 = require("../model");
const bitcoin_1 = require("./bitcoin");
describe('LTC transactions', () => {
    it('should test LTC transaction data', async () => {
        const body = new model_1.TransferBtcBasedBlockchain();
        body.fromUTXO = [{
                txHash: '53faa103e8217e1520f5149a4e8c84aeb58e55bdab11164a95e69a8ca50f8fcc',
                index: 0,
                privateKey: 'cVX7YtgL5muLTPncHFhP95oitV1mqUUA5VeSn8HeCRJbPqipzobf',
            }];
        body.to = [{
                address: 'mjJotvHmzEuyXZJGJXXknS6N3PWQnw6jf5',
                value: 0.02969944
            }];
        const txData = await bitcoin_1.prepareLitecoinSignedTransaction(true, body);
        expect(txData).toBe('0200000001cc8f0fa58c9ae6954a1611abbd558eb5ae848c4e9a14f520157e21e803a1fa53000000006a473044022030aeec05dc9bfefe5e3c1d6d4ea7945c9648f20bede1c854c9cc018cc9e4d771022048c64fb22ae3208a9ba9418aed392bbc4aab28f0e333b3c8fab042da88d357f5012103b17a162956975765aa6951f6349f9ab5bf510584c5df9f6065924bfd94a08513ffffffff0158512d00000000001976a914299480256432f2372df6d66e21ed48b097797c9a88ac00000000');
    });
    it('should not test LTC transaction data, fromAddress and fromUTXO present at the same time', async () => {
        const body = new model_1.TransferBtcBasedBlockchain();
        body.fromUTXO = [{
                txHash: '53faa103e8217e1520f5149a4e8c84aeb58e55bdab11164a95e69a8ca50f8fcc',
                index: 0,
                privateKey: 'cVX7YtgL5muLTPncHFhP95oitV1mqUUA5VeSn8HeCRJbPqipzobf',
            }];
        body.fromAddress = [{
                address: 'mjJotvHmzEuyXZJGJXXknS6N3PWQnw6jf5',
                privateKey: 'cVX7YtgL5muLTPncHFhP95oitV1mqUUA5VeSn8HeCRJbPqipzobf',
            }];
        body.to = [{
                address: 'mjJotvHmzEuyXZJGJXXknS6N3PWQnw6jf5',
                value: 0.02969944
            }];
        try {
            await bitcoin_1.prepareLitecoinSignedTransaction(true, body);
            fail('Validation did not pass.');
        }
        catch (e) {
            console.error(e);
        }
    });
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibGl0ZWNvaW4uc3BlYy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy90cmFuc2FjdGlvbi9saXRlY29pbi5zcGVjLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsb0NBQW9EO0FBQ3BELHVDQUEyRDtBQUUzRCxRQUFRLENBQUMsa0JBQWtCLEVBQUUsR0FBRyxFQUFFO0lBQzlCLEVBQUUsQ0FBQyxrQ0FBa0MsRUFBRSxLQUFLLElBQUksRUFBRTtRQUM5QyxNQUFNLElBQUksR0FBRyxJQUFJLGtDQUEwQixFQUFFLENBQUM7UUFDOUMsSUFBSSxDQUFDLFFBQVEsR0FBRyxDQUFDO2dCQUNiLE1BQU0sRUFBRSxrRUFBa0U7Z0JBQzFFLEtBQUssRUFBRSxDQUFDO2dCQUNSLFVBQVUsRUFBRSxzREFBc0Q7YUFDckUsQ0FBQyxDQUFDO1FBQ0gsSUFBSSxDQUFDLEVBQUUsR0FBRyxDQUFDO2dCQUNQLE9BQU8sRUFBRSxvQ0FBb0M7Z0JBQzdDLEtBQUssRUFBRSxVQUFVO2FBQ3BCLENBQUMsQ0FBQztRQUNILE1BQU0sTUFBTSxHQUFHLE1BQU0sMENBQWdDLENBQUMsSUFBSSxFQUFFLElBQUksQ0FBQyxDQUFDO1FBQ2xFLE1BQU0sQ0FBQyxNQUFNLENBQUMsQ0FBQyxJQUFJLENBQUMsZ1lBQWdZLENBQUMsQ0FBQztJQUMxWixDQUFDLENBQUMsQ0FBQztJQUVILEVBQUUsQ0FBQyx5RkFBeUYsRUFBRSxLQUFLLElBQUksRUFBRTtRQUNyRyxNQUFNLElBQUksR0FBRyxJQUFJLGtDQUEwQixFQUFFLENBQUM7UUFDOUMsSUFBSSxDQUFDLFFBQVEsR0FBRyxDQUFDO2dCQUNiLE1BQU0sRUFBRSxrRUFBa0U7Z0JBQzFFLEtBQUssRUFBRSxDQUFDO2dCQUNSLFVBQVUsRUFBRSxzREFBc0Q7YUFDckUsQ0FBQyxDQUFDO1FBQ0gsSUFBSSxDQUFDLFdBQVcsR0FBRyxDQUFDO2dCQUNoQixPQUFPLEVBQUUsb0NBQW9DO2dCQUM3QyxVQUFVLEVBQUUsc0RBQXNEO2FBQ3JFLENBQUMsQ0FBQztRQUNILElBQUksQ0FBQyxFQUFFLEdBQUcsQ0FBQztnQkFDUCxPQUFPLEVBQUUsb0NBQW9DO2dCQUM3QyxLQUFLLEVBQUUsVUFBVTthQUNwQixDQUFDLENBQUM7UUFDSCxJQUFJO1lBQ0EsTUFBTSwwQ0FBZ0MsQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDLENBQUM7WUFDbkQsSUFBSSxDQUFDLDBCQUEwQixDQUFDLENBQUM7U0FDcEM7UUFBQyxPQUFPLENBQUMsRUFBRTtZQUNSLE9BQU8sQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUM7U0FDcEI7SUFDTCxDQUFDLENBQUMsQ0FBQztBQUNQLENBQUMsQ0FBQyxDQUFDIn0=