export class Rate {
  // used to identify pair in batch calls
  batchId?: string

  // crypto currency/fiat
  _id: string

  // the amount of basePair that can be exchanged for 1 _id (crypto currency/fiat)
  value: string

  // fiat
  basePair: string

  // timestamp of rate information from source
  timestamp: number

  // source of rate
  source: string
}

export class RateBatchDto {
  // fiat
  basePair: string

  // crypto currency/fiat
  currency: string

  // used to identify pair in batch calls
  batchId?: string
}
