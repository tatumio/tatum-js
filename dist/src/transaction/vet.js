"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.prepareVetSignedTransaction = exports.signVetKMSTransaction = exports.sendVetTransaction = void 0;
const class_validator_1 = require("class-validator");
const thorify_1 = require("thorify");
const web3_1 = __importDefault(require("web3"));
const blockchain_1 = require("../blockchain");
const constants_1 = require("../constants");
const model_1 = require("../model");
/**
 * Send VeChain transaction to the blockchain. This method broadcasts signed transaction to the blockchain.
 * This operation is irreversible.
 * @param testnet mainnet or testnet version
 * @param body content of the transaction to broadcast
 * @param provider url of the VeChain Server to connect to. If not set, default public server will be used.
 * @returns transaction id of the transaction in the blockchain
 */
exports.sendVetTransaction = async (testnet, body, provider) => {
    return blockchain_1.vetBroadcast(await exports.prepareVetSignedTransaction(testnet, body, provider));
};
/**
 * Sign VeChain pending transaction from Tatum KMS
 * @param tx pending transaction from KMS
 * @param fromPrivateKey private key to sign transaction with.
 * @param testnet mainnet or testnet version
 * @param provider url of the VeChain Server to connect to. If not set, default public server will be used.
 * @returns transaction data to be broadcast to blockchain.
 */
exports.signVetKMSTransaction = async (tx, fromPrivateKey, testnet, provider) => {
    if (tx.chain !== model_1.Currency.VET) {
        throw Error('Unsupported chain.');
    }
    const client = thorify_1.thorify(new web3_1.default(), provider || (testnet ? constants_1.TEST_VET_URL : constants_1.VET_URL));
    client.eth.accounts.wallet.clear();
    client.eth.accounts.wallet.add(fromPrivateKey);
    client.eth.defaultAccount = client.eth.accounts.wallet[0].address;
    const transactionConfig = JSON.parse(tx.serializedTransaction);
    transactionConfig.gas = await client.eth.estimateGas(transactionConfig);
    return (await client.eth.accounts.signTransaction(transactionConfig, fromPrivateKey)).rawTransaction;
};
/**
 * Sign VeChain transaction with private keys locally. Nothing is broadcast to the blockchain.
 * @param testnet mainnet or testnet version
 * @param body content of the transaction to broadcast
 * @param provider url of the VeChain Server to connect to. If not set, default public server will be used.
 * @returns transaction data to be broadcast to blockchain.
 */
exports.prepareVetSignedTransaction = async (testnet, body, provider) => {
    await class_validator_1.validateOrReject(body);
    const { fromPrivateKey, to, amount, data, fee, } = body;
    const client = thorify_1.thorify(new web3_1.default(), provider || (testnet ? constants_1.TEST_VET_URL : constants_1.VET_URL));
    client.eth.accounts.wallet.clear();
    client.eth.accounts.wallet.add(fromPrivateKey);
    client.eth.defaultAccount = client.eth.accounts.wallet[0].address;
    const tx = {
        from: 0,
        to: to.trim(),
        data: data ? client.utils.toHex(data) : undefined,
        value: client.utils.toWei(`${amount}`, 'ether'),
    };
    if (fee) {
        tx.gas = fee.gasLimit;
    }
    else {
        tx.gas = await client.eth.estimateGas(tx);
    }
    return (await client.eth.accounts.signTransaction(tx, fromPrivateKey)).rawTransaction;
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidmV0LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL3RyYW5zYWN0aW9uL3ZldC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7QUFBQSxxREFBaUQ7QUFDakQscUNBQWdDO0FBQ2hDLGdEQUF3QjtBQUV4Qiw4Q0FBMkM7QUFDM0MsNENBQW1EO0FBQ25ELG9DQUErRDtBQUUvRDs7Ozs7OztHQU9HO0FBQ1UsUUFBQSxrQkFBa0IsR0FBRyxLQUFLLEVBQUUsT0FBZ0IsRUFBRSxJQUFpQixFQUFFLFFBQWlCLEVBQUUsRUFBRTtJQUMvRixPQUFPLHlCQUFZLENBQUMsTUFBTSxtQ0FBMkIsQ0FBQyxPQUFPLEVBQUUsSUFBSSxFQUFFLFFBQVEsQ0FBQyxDQUFDLENBQUM7QUFDcEYsQ0FBQyxDQUFDO0FBRUY7Ozs7Ozs7R0FPRztBQUNVLFFBQUEscUJBQXFCLEdBQUcsS0FBSyxFQUFFLEVBQWtCLEVBQUUsY0FBc0IsRUFBRSxPQUFnQixFQUFFLFFBQWlCLEVBQUUsRUFBRTtJQUMzSCxJQUFJLEVBQUUsQ0FBQyxLQUFLLEtBQUssZ0JBQVEsQ0FBQyxHQUFHLEVBQUU7UUFDM0IsTUFBTSxLQUFLLENBQUMsb0JBQW9CLENBQUMsQ0FBQztLQUNyQztJQUNELE1BQU0sTUFBTSxHQUFHLGlCQUFPLENBQUMsSUFBSSxjQUFJLEVBQUUsRUFBRSxRQUFRLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLHdCQUFZLENBQUMsQ0FBQyxDQUFDLG1CQUFPLENBQUMsQ0FBQyxDQUFDO0lBQ25GLE1BQU0sQ0FBQyxHQUFHLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxLQUFLLEVBQUUsQ0FBQztJQUNuQyxNQUFNLENBQUMsR0FBRyxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLGNBQWMsQ0FBQyxDQUFDO0lBQy9DLE1BQU0sQ0FBQyxHQUFHLENBQUMsY0FBYyxHQUFHLE1BQU0sQ0FBQyxHQUFHLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUM7SUFDbEUsTUFBTSxpQkFBaUIsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLEVBQUUsQ0FBQyxxQkFBcUIsQ0FBQyxDQUFDO0lBQy9ELGlCQUFpQixDQUFDLEdBQUcsR0FBRyxNQUFNLE1BQU0sQ0FBQyxHQUFHLENBQUMsV0FBVyxDQUFDLGlCQUFpQixDQUFDLENBQUM7SUFDeEUsT0FBTyxDQUFDLE1BQU0sTUFBTSxDQUFDLEdBQUcsQ0FBQyxRQUFRLENBQUMsZUFBZSxDQUFDLGlCQUFpQixFQUFFLGNBQWMsQ0FBQyxDQUFDLENBQUMsY0FBYyxDQUFDO0FBQ3pHLENBQUMsQ0FBQztBQUVGOzs7Ozs7R0FNRztBQUNVLFFBQUEsMkJBQTJCLEdBQUcsS0FBSyxFQUFFLE9BQWdCLEVBQUUsSUFBaUIsRUFBRSxRQUFpQixFQUFFLEVBQUU7SUFDeEcsTUFBTSxrQ0FBZ0IsQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUM3QixNQUFNLEVBQ0YsY0FBYyxFQUNkLEVBQUUsRUFDRixNQUFNLEVBQ04sSUFBSSxFQUNKLEdBQUcsR0FDTixHQUFHLElBQUksQ0FBQztJQUVULE1BQU0sTUFBTSxHQUFHLGlCQUFPLENBQUMsSUFBSSxjQUFJLEVBQUUsRUFBRSxRQUFRLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLHdCQUFZLENBQUMsQ0FBQyxDQUFDLG1CQUFPLENBQUMsQ0FBQyxDQUFDO0lBQ25GLE1BQU0sQ0FBQyxHQUFHLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxLQUFLLEVBQUUsQ0FBQztJQUNuQyxNQUFNLENBQUMsR0FBRyxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLGNBQWMsQ0FBQyxDQUFDO0lBQy9DLE1BQU0sQ0FBQyxHQUFHLENBQUMsY0FBYyxHQUFHLE1BQU0sQ0FBQyxHQUFHLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUM7SUFFbEUsTUFBTSxFQUFFLEdBQXNCO1FBQzFCLElBQUksRUFBRSxDQUFDO1FBQ1AsRUFBRSxFQUFFLEVBQUUsQ0FBQyxJQUFJLEVBQUU7UUFDYixJQUFJLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsU0FBUztRQUNqRCxLQUFLLEVBQUUsTUFBTSxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsR0FBRyxNQUFNLEVBQUUsRUFBRSxPQUFPLENBQUM7S0FDbEQsQ0FBQztJQUVGLElBQUksR0FBRyxFQUFFO1FBQ0wsRUFBRSxDQUFDLEdBQUcsR0FBRyxHQUFHLENBQUMsUUFBUSxDQUFDO0tBQ3pCO1NBQU07UUFDSCxFQUFFLENBQUMsR0FBRyxHQUFHLE1BQU0sTUFBTSxDQUFDLEdBQUcsQ0FBQyxXQUFXLENBQUMsRUFBRSxDQUFDLENBQUM7S0FDN0M7SUFDRCxPQUFPLENBQUMsTUFBTSxNQUFNLENBQUMsR0FBRyxDQUFDLFFBQVEsQ0FBQyxlQUFlLENBQUMsRUFBRSxFQUFFLGNBQWMsQ0FBQyxDQUFDLENBQUMsY0FBYyxDQUFDO0FBQzFGLENBQUMsQ0FBQyJ9