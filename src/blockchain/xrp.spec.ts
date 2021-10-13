
const getUrl = (address: string, min?: number, marker?: string) => {
    return `/v3/xrp/account/tx/${address}${min ? `?min=${min}${marker ? `&marker=${marker}` : ''}` : marker ? `?marker=${marker}` : ''}`
}
const testAddress = 'rPT1Sjq2YGrBMTttX4GZHjKu9dyfzbpAYe'
const min = 100000
const maker = 'testMaker'

describe('Test XRP URL', () => {
    it('XRP URL with only address', async () => {
        const url = getUrl(testAddress);
        expect(url).toBe(`/v3/xrp/account/tx/${testAddress}`)
    })

    it('XRP URL with address and min', async () => {
        const url = getUrl(testAddress, min);
        expect(url).toBe(`/v3/xrp/account/tx/${testAddress}?min=${min}`)
    })

    it('XRP URL with address and maker', async () => {
        const url = getUrl(testAddress, undefined, maker);
        expect(url).toBe(`/v3/xrp/account/tx/${testAddress}?marker=${maker}`)
    })

    it('XRP URL with address min and maker', async () => {
        const url = getUrl(testAddress, min, maker);
        expect(url).toBe(`/v3/xrp/account/tx/${testAddress}?min=${min}&marker=${maker}`)
    })
})