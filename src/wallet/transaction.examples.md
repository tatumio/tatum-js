# Complete flow towards creating most of the crypto transactions

## Get your key from Tatum and use the key and add some amount in wallet, this guide will show you how to make transactions
## Import required libraries
```javascript
import {Currency} from '../model';
const {generateWallet, generatePrivateKeyFromMnemonic, Currency} = require("@tatumio/tatum");
import {generateAddressFromPrivatekey, generateAddressFromXPub, generatePrivateKeyFromMnemonic} from './address';
```

## Generate your wallet
### Following are the options you can use to create wallet:
### BTC,BCH,LTC,ETH,QUORUM,XRP,XLM,VET,NEO,BNB,USDT,USDT_TRON,TRON,LEO,LINK,WBTC,UNI,FREE,MKR,USDC,BAT,TUSD,PAX,PLTC,XCON,MMY,PAXG,LYRA
```javascript
const Wallet = generateWallet(Currency.BTC, false);
console.log(Wallet);
```

## For making transaction in Tron
### Import the following libraries
```javascript
import {TransferTron} from '../model';
import {tronBroadcast} from '../blockchain';
import {prepareTronSignedTransaction} from './tron';
```

### Prepare and send signed transction
```javascript
    const body = new TransferTron();
    body.fromPrivateKey = '842E09EB40D8175979EFB0071B28163E11AED0F14BDD84090A4CEFB936EF5701';
    body.amount = '0.000001';
    body.to = 'TVAEYCmc15awaDRAjUZ1kvcHwQQaoPw2CW';
    const txData = tronBroadcast(await prepareTronSignedTransaction(true, body))
```

## For making transaction in vet
### Import the following libraries
```javascript
import {TransferVet} from '../model';
import {prepareVetSignedTransaction} from './vet';
import {vetBroadcast} from '../blockchain';
```

### Prepare and send signed transction
```javascript
    const body = new TransferVet();
    body.fromPrivateKey = '0x4874827a55d87f2309c55b835af509e3427aa4d52321eeb49a2b93b5c0f8edfb';
    body.amount = '0';
    body.fee = {gasLimit: '21000'};
    body.to = '0x8cb76aed9c5e336ef961265c6079c14e9cd3d2ea';
    const txData = vetBroadcast(await prepareVetSignedTransaction(true, body));
```

## For making transactions in scrypta
### Import the following libraries
```javascript
import {TransferBtcBasedBlockchain} from '../model';
import {prepareScryptaSignedTransaction} from './scrypta';
import {scryptaBroadcast} from '../blockchain';
```
### Prepare and send signed transaction
```javascript
    const body = new TransferBtcBasedBlockchain();
    body.fromUTXO = [{
        txHash: '53faa103e8217e1520f5149a4e8c84aeb58e55bdab11164a95e69a8ca50f8fcc',
        index: 0,
        privateKey: 'cVX7YtgL5muLTPncHFhP95oitV1mqUUA5VeSn8HeCRJbPqipzobf',
    }];
    body.to = [{
        address: 'mjJotvHmzEuyXZJGJXXknS6N3PWQnw6jf5',
        value: 0.02969944
    }];
    const txData = scryptaBroadcast(await prepareScryptaSignedTransaction(true, body)); 
```

## For making transactions in xlm
### Import the following libraries
```javascript
    import * as blockchain from '../blockchain';
    import {TransferXlm} from '../model';
    import {prepareXlmSignedTransaction} from './xlm';
```
### Prepare and send signed transaction
```javascript
    const body = new TransferXlm();
    body.fromSecret = 'SCFCTIS5326CRI3XFFBEWGXFWZK3HTUFI2AOI5IJUZAX2W5KM2PXIFIQ';
    body.amount = '1';
    body.to = 'GB4HCKVMM6SVPVSO7SFYS7DUU2C5KESP3ZOVGOHG32MLC7T4B6G4ZBLO';
    const txData = blockchain.xlmBroadcast(await prepareXlmSignedTransaction(true, body));
```

