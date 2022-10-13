export const xdcUtil = {
  toHex: (address: string) => {
    return `0x${address.substring(3)}`
  },
  fromHex: (address: string) => {
    return `xdc${address.substring(2)}`
  },
}
