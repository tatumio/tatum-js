# Complete flow towards creating BTC wallet and making transactions

# Get your key from Tatum and use the key as 
## Import required libraries
```javascript
import {Currency} from '../model';
const {generateWallet, generatePrivateKeyFromMnemonic, Currency} = require("@tatumio/tatum");
import {generateAddressFromPrivatekey, generateAddressFromXPub, generatePrivateKeyFromMnemonic} from './address';
```
## Generate BTC wallet
```javascript
const btcWallet = generateWallet(Currency.BTC, false);
console.log(btcWallet);
```
## Create an Address
```javascript
const address = generateAddressFromXPub(Currency.BTC, false, 'xpub6EsCk1uU6cJzqvP9CdsTiJwT2rF748YkPnhv5Qo8q44DG7nn2vbyt48YRsNSUYS44jFCW9gwvD9kLQu9AuqXpTpM1c5hgg9PsuBLdeNncid', 1);
```
## Create a private key for the wallet    
```javascript
const btcAddress = generatePrivateKeyFromMnemonic(Currency.BTC, false, "<<mnemonic>>", 1);
console.log(btcAddress);
```

## Prepare signed transaction
```javascript
const body = new TransferBtcBasedBlockchain();
        body.fromUTXO = [{
            txHash: '53faa103e8217e1520f5149a4e8c84aeb58e55bdab11164a95e69a8ca50f8fcc',
            index: 0,
            privateKey: 'cVX7YtgL5muLTPncHFhP95oitV1mqUUA5VeSn8HeCRJbPqipzobf',
        }];
        body.to = [{
            address: '2MzNGwuKvMEvKMQogtgzSqJcH2UW3Tc5oc7',
            value: 0.02969944
        }];
const txData = await prepareBitcoinSignedTransaction(true, body);
```

## Send BTC txn to blockchain
```javascript
await sendBitcoinTransaction(true,{"fromAddress":[{"address":"2N9bBiH2qrTDrPCzrNhaFGdkNKS86PJAAAS","privateKey":"cVX7YtgL5muLTPncHFhP95oitV1mqUUA5VeSn8HeCRJbPqipzobf"}],"to":[{"address":"2MzNGwuKvMEvKMQogtgzSqJcH2UW3Tc5oc7","value":0.02969944}]})
```