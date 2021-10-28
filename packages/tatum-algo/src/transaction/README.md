# Transaction API guide

In following guide we will see how to work with transaction endpoints. Just browse source code
or [Github Pages](https://tatumio.github.io/tatum-js/) to see how to use other transaction endpoints.

## Import required libraries

```typescript
import { sendAlgoSignedTransaction } from '@tatumio/tatum-algo';
```

## Send algo transaction - from address

```typescript
const transactionHash = await sendAlgoSignedTransaction(true, {
        from:           'TMETT6BXL3QUH7AH5TS6IONU7LVTLKIGG54CFCNPMQXWGRIZFIESZBYWP4',
        to:             'NTAESFCB3WOD7SAOL42KSPVARLB3JFA3MNX3AESWHYVT2RMYDVZI6YLG4Y',
        fee:            '0.001',
        amount:         '1',
        note:           'string',
        fromPrivateKey: '72TCV5BRQPBMSAFPYO3CPWVDBYWNGAYNMTW5QHENOMQF7I6QLNMJWCJZ7A3V5YKD7QD6ZZPEHG2PV2ZVVEDDO6BCRGXWIL3DIUMSUCI'
    }
);
```
