export interface NeoAsset {
  version: number
  id: string
  type: string
  name: AssetName[]
  amount: string
  available: string
  precision: number
  owner: string
  admin: string
  issuer: string
  expiration: number
  frozen: boolean
}

export interface AssetName {
  lang: string
  name: string
}
