import { HarmonyAddress } from '@harmony-js/crypto'

export const oneUtils = {
  /**
   * Convert address to hex
   * one1ahxmc89vgaukfqne7dhj6qc8zvgd3hkqf5nygk -> 0xedcdbc1cac4779648279f36f2d03071310d8dec0
   */
  toHex: (address?: string): string | undefined => {
    return address?.startsWith('one') ? new HarmonyAddress(address).basicHex : address
  },
  /**
   * Convert address from hex to bech32
   * 0xedcdbc1cac4779648279f36f2d03071310d8dec0 -> one1ahxmc89vgaukfqne7dhj6qc8zvgd3hkqf5nygk
   */
  fromHex: (address?: string): string | undefined => {
    return address?.startsWith('0x') ? new HarmonyAddress(address).bech32 : address
  },
}
