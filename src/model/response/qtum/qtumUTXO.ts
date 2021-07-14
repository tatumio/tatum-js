export interface QtumRUTXO {
    address: string
    txid: string
    hash: string // txid

    pos: number // vout (insight)
    /**
     * Public key that controls this UXTO, as hex string.
     */
    scriptPubKey: string

    amount: number
    value: number // satoshi (insight)

    isStake: boolean
    confirmations: number
  }
  export interface QtumIUTXO {
    address: string
    txid: string
    vout: number

    /**
     * Public key that controls this UXTO, as hex string.
     */
    scriptPubKey: string

    amount: number
    satoshis: number

    isStake: boolean
    height: number
    confirmations: number
  }
