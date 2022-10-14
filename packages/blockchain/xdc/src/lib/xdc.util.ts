import _ from 'lodash'

export const xdcUtil = {
  toHex: (address: string) => {
    if (address.startsWith('xdc')) return `0x${_.trimStart(address, 'xdc')}`
    return address
  },
  fromHex: (address: string) => {
    if (address.startsWith('0x')) return `xdc${_.trimStart(address, '0x')}`
    return address
  },
}
