import { HarmonyAddress } from '@harmony-js/crypto'

export const oneUtils = {
  transformAddress: (address?: string): string | undefined => {
    return address?.startsWith('one') ? new HarmonyAddress(address).basicHex : address
  },
}
