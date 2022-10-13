export const xdcUtil = {
  toHex: (address: string) => {
    if (address.startsWith('xdc')) return `0x${address.substring(3)}`
    return address
  },
  fromHex: (address: string) => {
    if (address.startsWith('0x')) return `xdc${address.substring(2)}`
    return address
  },
}
