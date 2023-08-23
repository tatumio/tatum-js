import { tezosWeb } from './services/tezos.web'
import { tezosTzip } from './services/tezos.tzip'

export const TatumTezosSDK = () => ({
  nft: tezosTzip,
  tezosWeb: tezosWeb(),
})
