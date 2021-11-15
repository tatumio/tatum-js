import {generateAddressFromXPub, generatePrivateKeyFromMnemonic} from './address'

describe('Address tests', () => {

    it('should generate public key 1 for FLOW mainnet', () => {
        const address = generateAddressFromXPub('xpub6EVKqCYcoa9DXpjAACsdyQTUZ5tgx3DUyt5Yy8xx9kmVKMCsn3vtLictDQMjdEtpo5CpwVwipVxThFKwh49xNJ5Fy752ifnM5mwYy28AtVv', 1)
        expect(address).toBe('968c3ce11e871cb2b7161b282655ee5fcb051f3c04894705d771bf11c6fbebfc6556ab8a0c04f45ea56281312336d0668529077c9d66891a6cad3db877acbe90')
    })

    it('should generate private key 1 for FLOW mainnet', async () => {
        const privateKey = await generatePrivateKeyFromMnemonic('quantum tobacco key they maid mean crime youth chief jungle mind design broken tilt bus shoulder leaf good forward erupt split divert bread kitten', 1)
        expect(privateKey).toBe('37afa218d41d9cd6a2c6f2b96d9eaa3ad96c598252bc50e4d45d62f9356a51f8')
    })

})
