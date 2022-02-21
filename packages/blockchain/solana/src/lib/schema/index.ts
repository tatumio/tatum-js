import { PublicKey } from '@solana/web3.js'
import BN from 'bn.js'
import { BinaryReader, BinaryWriter, deserializeUnchecked } from 'borsh'
// @ts-ignore
import base58 from 'bs58'

export class SolanaNftMetadataCreator {
  public address: string

  public verified: number

  public share: number

  constructor(_address: string, _verified: number, _share: number) {
    this.address = _address
    this.verified = _verified
    this.share = _share
  }
}

export class SolanaNftMetadata {
  public name: string

  public symbol: string

  public uri: string

  public sellerFeeBasisPoints: number

  public creators: SolanaNftMetadataCreator[] | null

  constructor(
    name: string,
    symbol: string,
    uri: string,
    sellerFeeBasisPoints: number,
    creators: SolanaNftMetadataCreator[] | null = null,
  ) {
    this.name = name
    this.symbol = symbol
    this.uri = uri
    this.sellerFeeBasisPoints = sellerFeeBasisPoints
    this.creators = creators
  }
}

type StringPublicKey = string

export enum MetadataKey {
  Uninitialized = 0,
  MetadataV1 = 4,
  EditionV1 = 1,
  MasterEditionV1 = 2,
  MasterEditionV2 = 6,
  EditionMarker = 7,
}

export class CreateMetadataArgs {
  instruction = 0
  data: SolanaNftMetadata
  isMutable: boolean

  constructor(args: { data: SolanaNftMetadata; isMutable: boolean }) {
    this.data = args.data
    this.isMutable = args.isMutable
  }
}

export class UpdateMetadataArgs {
  instruction = 1
  data: SolanaNftMetadata | null
  // Not used by this app, just required for instruction
  updateAuthority: StringPublicKey | null
  primarySaleHappened: boolean | null

  constructor(args: {
    data?: SolanaNftMetadata
    updateAuthority?: string
    primarySaleHappened: boolean | null
  }) {
    this.data = args.data ? args.data : null
    this.updateAuthority = args.updateAuthority ? args.updateAuthority : null
    this.primarySaleHappened = args.primarySaleHappened
  }
}

export class CreateMasterEditionArgs {
  instruction = 10
  maxSupply: BN | null

  constructor(args: { maxSupply: BN | null }) {
    this.maxSupply = args.maxSupply
  }
}

export class Metadata {
  key: MetadataKey
  updateAuthority: StringPublicKey
  mint: StringPublicKey
  data: SolanaNftMetadata
  primarySaleHappened: boolean
  isMutable: boolean
  editionNonce: number | null

  // set lazy
  masterEdition?: StringPublicKey
  edition?: StringPublicKey

  constructor(args: {
    updateAuthority: StringPublicKey
    mint: StringPublicKey
    data: SolanaNftMetadata
    primarySaleHappened: boolean
    isMutable: boolean
    editionNonce: number | null
  }) {
    this.key = MetadataKey.MetadataV1
    this.updateAuthority = args.updateAuthority
    this.mint = args.mint
    this.data = args.data
    this.primarySaleHappened = args.primarySaleHappened
    this.isMutable = args.isMutable
    this.editionNonce = args.editionNonce ?? null
  }
}

// TODO: add types
export const METADATA_SCHEMA = new Map<any, any>([
  [
    CreateMetadataArgs,
    {
      kind: 'struct',
      fields: [
        ['instruction', 'u8'],
        ['data', SolanaNftMetadata],
        ['isMutable', 'u8'], // bool
      ],
    },
  ],
  [
    CreateMasterEditionArgs,
    {
      kind: 'struct',
      fields: [
        ['instruction', 'u8'],
        ['maxSupply', { kind: 'option', type: 'u64' }],
      ],
    },
  ],
  [
    UpdateMetadataArgs,
    {
      kind: 'struct',
      fields: [
        ['instruction', 'u8'],
        ['data', { kind: 'option', type: SolanaNftMetadata }],
        ['updateAuthority', { kind: 'option', type: 'pubkeyAsString' }],
        ['primarySaleHappened', { kind: 'option', type: 'u8' }],
      ],
    },
  ],
  [
    SolanaNftMetadata,
    {
      kind: 'struct',
      fields: [
        ['name', 'string'],
        ['symbol', 'string'],
        ['uri', 'string'],
        ['sellerFeeBasisPoints', 'u16'],
        ['creators', { kind: 'option', type: [SolanaNftMetadataCreator] }],
      ],
    },
  ],
  [
    SolanaNftMetadataCreator,
    {
      kind: 'struct',
      fields: [
        ['address', 'pubkeyAsString'],
        ['verified', 'u8'],
        ['share', 'u8'],
      ],
    },
  ],
  [
    Metadata,
    {
      kind: 'struct',
      fields: [
        ['key', 'u8'],
        ['updateAuthority', 'pubkeyAsString'],
        ['mint', 'pubkeyAsString'],
        ['data', SolanaNftMetadata],
        ['primarySaleHappened', 'u8'], // bool
        ['isMutable', 'u8'], // bool
        ['editionNonce', { kind: 'option', type: 'u8' }],
      ],
    },
  ],
])

// eslint-disable-next-line no-control-regex
const METADATA_REPLACE = new RegExp('\u0000', 'g')

export const decodeMetadata = (buffer: Buffer): Metadata => {
  const metadata = deserializeUnchecked(METADATA_SCHEMA, Metadata, buffer) as Metadata
  metadata.data.name = metadata.data.name.replace(METADATA_REPLACE, '')
  metadata.data.uri = metadata.data.uri.replace(METADATA_REPLACE, '')
  metadata.data.symbol = metadata.data.symbol.replace(METADATA_REPLACE, '')
  return metadata
}

// TODO: move to separate file
export const extendBorsh = () => {
  ;(BinaryReader.prototype as any).readPubkey = function () {
    const reader = this as unknown as BinaryReader
    const array = reader.readFixedArray(32)
    return new PublicKey(array)
  }
  ;(BinaryWriter.prototype as any).writePubkey = function (value: PublicKey) {
    const writer = this as unknown as BinaryWriter
    writer.writeFixedArray(value.toBuffer())
  }
  ;(BinaryReader.prototype as any).readPubkeyAsString = function () {
    const reader = this as unknown as BinaryReader
    const array = reader.readFixedArray(32)
    return base58.encode(array) as StringPublicKey
  }
  ;(BinaryWriter.prototype as any).writePubkeyAsString = function (value: StringPublicKey) {
    const writer = this as unknown as BinaryWriter
    writer.writeFixedArray(base58.decode(value))
  }
}

extendBorsh()
