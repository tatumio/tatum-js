export const xdcUtil = {
  toHex: (address: string) => {
    if (!address?.startsWith('xdc')) return address

    return address?.trim()?.replace('xdc', '0x')
  },
  fromHex: (address: string) => {
    if (!address?.startsWith('0x')) return address

    return address?.trim()?.replace('0x', 'xdc')
  },
}
