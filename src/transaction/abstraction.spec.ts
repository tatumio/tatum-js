import { Currency } from '../model'
import { sendTransaction } from './abstraction'

describe('Abstraction ETH erc20', () => {
    it('should send erc20 abstraction - currency and contractAddress', async () => {
       await sendTransaction(true, Currency.ETH, {
           amount: '10',
           to: '0xc6c02b874bf5efad3a0deeee72a56a50d81b6a61',
           currency: Currency.BAT,
           contractAddress: "0xd683f13658bBFf28cFda4a432d3533640D138d6E",
           fromPrivateKey: "0xf4e94a6e04e61c9fd03362a2c39175aef88f73bd2054e1853f59dd619f87e38b"
       });
    })

    it('should send erc20 abstraction - currency', async () => {
        await sendTransaction(true, Currency.ETH, {
            amount: '10',
            to: '0xc6c02b874bf5efad3a0deeee72a56a50d81b6a61',
            currency: Currency.BAT,
            fromPrivateKey: "0xf4e94a6e04e61c9fd03362a2c39175aef88f73bd2054e1853f59dd619f87e38b"
        });
    })

    it('should send erc20 abstraction - contractAddress', async () => {
        const tx = await sendTransaction(true, Currency.ETH, {
            amount: '10',
            to: '0xc6c02b874bf5efad3a0deeee72a56a50d81b6a61',
            contractAddress: "0xd683f13658bBFf28cFda4a432d3533640D138d6E",
            fromPrivateKey: "0xf4e94a6e04e61c9fd03362a2c39175aef88f73bd2054e1853f59dd619f87e38b",
            digits: 18
        });
        expect(tx).toHaveProperty('txId')
    })
})

describe('Abstraction MATIC erc20', () => {
    it('should send erc20 abstraction - currency and contractAddress', async () => {
        await sendTransaction(true, Currency.MATIC, {
            amount: '10',
            to: '0xc6c02b874bf5efad3a0deeee72a56a50d81b6a61',
            currency: Currency.BAT,
            contractAddress: "0xd683f13658bBFf28cFda4a432d3533640D138d6E",
            fromPrivateKey: "0xf4e94a6e04e61c9fd03362a2c39175aef88f73bd2054e1853f59dd619f87e38b"
        })
    })

    it('should send erc20 abstraction - currency', async () => {
        await sendTransaction(true, Currency.MATIC, {
            amount: '10',
            to: '0xc6c02b874bf5efad3a0deeee72a56a50d81b6a61',
            currency: Currency.BAT,
            fromPrivateKey: "0xb430f39045afbc872ee16d40b74067aeb65b847e396c37661d66992de7e959c4"
        });
    })

    it('should send erc20 abstraction - contractAddress', async () => {
        const tx = await sendTransaction(true, Currency.MATIC, {
            amount: '10',
            to: '0xc6c02b874bf5efad3a0deeee72a56a50d81b6a61',
            contractAddress: "0xFe00cF02cA45CFB5e333c72aD643301Cf8D053EF",
            fromPrivateKey: "0xb430f39045afbc872ee16d40b74067aeb65b847e396c37661d66992de7e959c4",
            digits: 18
        });
        expect(tx).toHaveProperty('txId')
    })
})

describe('Abstraction ONE erc20', () => {
    it('should send erc20 abstraction - currency and contractAddress', async () => {
        await sendTransaction(true, Currency.ONE, {
            amount: '10',
            to: '0xc6c02b874bf5efad3a0deeee72a56a50d81b6a61',
            currency: Currency.BAT,
            contractAddress: "0xd683f13658bBFf28cFda4a432d3533640D138d6E",
            fromPrivateKey: "0xf4e94a6e04e61c9fd03362a2c39175aef88f73bd2054e1853f59dd619f87e38b"
        })
    })

    it('should send erc20 abstraction - currency', async () => {
        await sendTransaction(true, Currency.ONE, {
            amount: '10',
            to: '0xc6c02b874bf5efad3a0deeee72a56a50d81b6a61',
            currency: Currency.BAT,
            fromPrivateKey: "0xb430f39045afbc872ee16d40b74067aeb65b847e396c37661d66992de7e959c4"
        });
    })

    it('should send erc20 abstraction - contractAddress', async () => {
        const tx = await sendTransaction(true, Currency.ONE, {
            amount: '10',
            to: '0xc6c02b874bf5efad3a0deeee72a56a50d81b6a61',
            contractAddress: "0xf05d27b1f5efa55dc5db09cd42d1684b1fec0576",
            fromPrivateKey: "0xd251c50f6f7474e5eac05c632e5f9551d75ae91eaeb9798b7ab1dc3fe50faefc",
            digits: 18
        });
        expect(tx).toHaveProperty('txId')
    })
})

describe('Abstraction CELO erc20', () => {
    it('should send erc20 abstraction - no address and currency', async () => {
        const tx = await sendTransaction(true, Currency.CELO, {
            amount: '10',
            to: '0xc6c02b874bf5efad3a0deeee72a56a50d81b6a61',
            fromPrivateKey: "0x89f09a62c9601d660dcdbeab15fbecfc07933971465fab3ba9fe1354035d805d",
            digits: 18
        });
        console.log(tx)
        expect(tx).toHaveProperty('txId')
    })

    it('should send erc20 abstraction - currency and contractAddress', async () => {
        await sendTransaction(true, Currency.CELO, {
            amount: '10',
            to: '0xc6c02b874bf5efad3a0deeee72a56a50d81b6a61',
            currency: Currency.BAT,
            contractAddress: "0xd683f13658bBFf28cFda4a432d3533640D138d6E",
            fromPrivateKey: "0xf4e94a6e04e61c9fd03362a2c39175aef88f73bd2054e1853f59dd619f87e38b"
        })
    })

    it('should send erc20 abstraction - currency', async () => {
        await sendTransaction(true, Currency.CELO, {
            amount: '10',
            to: '0xc6c02b874bf5efad3a0deeee72a56a50d81b6a61',
            currency: Currency.BAT,
            fromPrivateKey: "0xb430f39045afbc872ee16d40b74067aeb65b847e396c37661d66992de7e959c4"
        });
    })

    it('should send erc20 abstraction - contractAddress', async () => {
        const tx = await sendTransaction(true, Currency.CELO, {
            amount: '10',
            to: '0xc6c02b874bf5efad3a0deeee72a56a50d81b6a61',
            contractAddress: "0x0D5F97aB26CA8acE6bd0e8BfE6e688844f44bB55",
            fromPrivateKey: "0x89f09a62c9601d660dcdbeab15fbecfc07933971465fab3ba9fe1354035d805d",
            digits: 18
        });
        console.log(tx)
        expect(tx).toHaveProperty('txId')
    })
})

describe('Abstraction BSC erc20', () => {
    it('should send erc20 abstraction - no address and currency', async () => {
        const tx = await sendTransaction(true, Currency.BSC, {
            amount: '10',
            to: '0xc6c02b874bf5efad3a0deeee72a56a50d81b6a61',
            fromPrivateKey: "0x89f09a62c9601d660dcdbeab15fbecfc07933971465fab3ba9fe1354035d805d",
            digits: 18
        });
        console.log(tx)
        expect(tx).toHaveProperty('txId')
    })

    it('should send erc20 abstraction - currency and contractAddress', async () => {
        await sendTransaction(true, Currency.BSC, {
            amount: '10',
            to: '0xc6c02b874bf5efad3a0deeee72a56a50d81b6a61',
            currency: Currency.BAT,
            contractAddress: "0xd683f13658bBFf28cFda4a432d3533640D138d6E",
            fromPrivateKey: "0xf4e94a6e04e61c9fd03362a2c39175aef88f73bd2054e1853f59dd619f87e38b"
        })
    })

    it('should send erc20 abstraction - currency', async () => {
        await sendTransaction(true, Currency.BSC, {
            amount: '10',
            to: '0xc6c02b874bf5efad3a0deeee72a56a50d81b6a61',
            currency: Currency.BETH,
            fromPrivateKey: "0xb430f39045afbc872ee16d40b74067aeb65b847e396c37661d66992de7e959c4"
        });
    })

    it('should send erc20 abstraction - contractAddress', async () => {
        const tx = await sendTransaction(true, Currency.BSC, {
            amount: '10',
            to: '0xc6c02b874bf5efad3a0deeee72a56a50d81b6a61',
            contractAddress: "0x97F2Ffb3E50957Ad615807455277a680fbB08976",
            fromPrivateKey: "0xd7dd4afa18d8a857930b55e5605553a67a9937efdd37150b51ea1681db050236",
            digits: 18
        });
        console.log(tx)
        expect(tx).toHaveProperty('txId')
    })
})

describe('Abstraction TRON erc20', () => {
    it('should send erc20 abstraction - no address and currency', async () => {
        const tx = await sendTransaction(true, Currency.TRON, {
            "fromPrivateKey": "D2AB51BC2CF28D7569D0BA40920776101E4A8DA8A927AC98814CEB6CF09C9D31",
            "to":"TShwo3ZXzn8SzmkEV8uLfo5gL19idHajkC",
            "amount": "0.0001"
        });
        console.log(tx)
        expect(tx).toHaveProperty('txId')
    })
})