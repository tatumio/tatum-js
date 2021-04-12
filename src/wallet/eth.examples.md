# Complete flow towards creating BTC wallet and making transactions

# Get your key from Tatum and use the key as 
## Import required libraries
```javascript
import {Currency} from '../model';
const {generateWallet, generatePrivateKeyFromMnemonic, Currency} = require("@tatumio/tatum");
import {generateAddressFromPrivatekey, generateAddressFromXPub, generatePrivateKeyFromMnemonic} from './address';
import {Currency, DeployEthErc20, TransferCustomErc20, TransferEthErc20} from '../model';
import {
    prepareCustomErc20SignedTransaction,
    prepareDeployErc20SignedTransaction,
    prepareEthOrErc20SignedTransaction
} from './eth';
```
## Prepare signed txn locally
```javascript
        const body = new TransferEthErc20();
        body.fromPrivateKey = '0x4874827a55d87f2309c55b835af509e3427aa4d52321eeb49a2b93b5c0f8edfb';
        body.amount = '0';
        body.currency = Currency.ETH;
        body.to = '0x8cb76aed9c5e336ef961265c6079c14e9cd3d2ea';
        const txData = await prepareEthOrErc20SignedTransaction(true, body);
```

## send signed txn
```javascript
        const body = new TransferEthErc20();
        body.fromPrivateKey = '0x4874827a55d87f2309c55b835af509e3427aa4d52321eeb49a2b93b5c0f8edfb';
        body.amount = '0';
        body.currency = Currency.ETH;
        body.to = '0x8cb76aed9c5e336ef961265c6079c14e9cd3d2ea';
        const txSend= await sendEthOrErc20Transaction(true,body)
```