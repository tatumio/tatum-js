import { bchWalletExample } from './app/bch.wallet.example'
import { bchBlockchainExample } from './app/bch.blockchain.example'
import { bchVirtualAccountExample } from './app/bch.virtualAccount.example'
import { exchangeRateExample } from './app/bch.root.example'
import { bchTransactionsExample } from './app/bch.tx.example'

const examples = async () => {
    console.log(`Running bchWalletExample`)
    await bchWalletExample()

    console.log(`Running bchBlockchainExample`)
    await bchBlockchainExample()

    console.log(`Running bchVirtualAccountExample`)
    await bchVirtualAccountExample()

    console.log(`Running exchangeRateExample`)
    await exchangeRateExample()

    console.log(`Running bchTransactionsExample`)
    await bchTransactionsExample()
}

void examples()