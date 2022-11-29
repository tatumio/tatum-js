import { PublicKey, PublicKeyInitData, Transaction, TransactionInstruction } from '@solana/web3.js'
import {
  ASSOCIATED_TOKEN_PROGRAM_ID,
  createAssociatedTokenAccountInstruction,
  getAccount,
  getAssociatedTokenAddress,
  NATIVE_MINT,
  TOKEN_PROGRAM_ID,
} from '@solana/spl-token'
import { SolanaWeb3 } from './solana.web3'
import {
  createBuyInstruction,
  createCreateAuctionHouseInstruction,
  createExecuteSaleInstruction,
  createSellInstruction,
  createUpdateAuctionHouseInstruction,
} from '@metaplex-foundation/mpl-auction-house'
import BN from 'bn.js'
import { TOKEN_METADATA_PROGRAM_ID } from '../schema/instructions'
import web3 from '@solana/web3.js'
import { BuyInstructionAccounts } from '@metaplex-foundation/mpl-auction-house/dist/src/generated/instructions/buy'
import { deserializeUnchecked } from 'borsh'
import {
  ExecuteSaleInstructionAccounts,
  ExecuteSaleInstructionArgs,
} from '@metaplex-foundation/mpl-auction-house/dist/src/generated/instructions/executeSale'
import { FromPrivateKeyOrSignatureId } from '@tatumio/shared-blockchain-abstract'

export const METADATA_REPLACE_CONST = new RegExp('\u0000', 'g')

export class CreatorStruct {
  address: web3.PublicKey
  verified: boolean
  share: number

  constructor(args: { address: web3.PublicKey; verified: boolean; share: number }) {
    this.address = args.address
    this.verified = args.verified
    this.share = args.share
  }
}

export enum MetadataKeyStruct {
  Uninitialized = 0,
  MetadataV1 = 4,
  EditionV1 = 1,
  MasterEditionV1 = 2,
  MasterEditionV2 = 6,
  EditionMarker = 7,
}

export class MasterEditionV2Struct {
  key: MetadataKeyStruct
  supply: BN
  maxSupply?: BN
  constructor(args: { key: MetadataKeyStruct; supply: BN; maxSupply?: BN }) {
    this.key = MetadataKeyStruct.MasterEditionV2
    this.supply = args.supply
    this.maxSupply = args.maxSupply
  }
}

export class EditionMarkerStruct {
  key: MetadataKeyStruct
  ledger: number[]
  constructor(args: { key: MetadataKeyStruct; ledger: number[] }) {
    this.key = MetadataKeyStruct.EditionMarker
    this.ledger = args.ledger
  }
}

export class EditionStruct {
  key: MetadataKeyStruct
  parent: web3.PublicKey
  edition: BN
  constructor(args: { key: MetadataKeyStruct; parent: web3.PublicKey; edition: BN }) {
    this.key = MetadataKeyStruct.EditionV1
    this.parent = args.parent
    this.edition = args.edition
  }
}

export class DataStruct {
  name: string
  symbol: string
  uri: string
  sellerFeeBasisPoints: number
  creators: CreatorStruct[] | null
  constructor(args: {
    name: string
    symbol: string
    uri: string
    sellerFeeBasisPoints: number
    creators: CreatorStruct[] | null
  }) {
    this.name = args.name
    this.symbol = args.symbol
    this.uri = args.uri
    this.sellerFeeBasisPoints = args.sellerFeeBasisPoints
    this.creators = args.creators
  }
}

export class MetadataStruct {
  key: MetadataKeyStruct
  updateAuthority: web3.PublicKey
  mint: web3.PublicKey
  data: DataStruct
  primarySaleHappened: boolean
  isMutable: boolean
  masterEdition?: web3.PublicKey
  edition?: web3.PublicKey
  constructor(args: {
    updateAuthority: web3.PublicKey
    mint: web3.PublicKey
    data: DataStruct
    primarySaleHappened: boolean
    isMutable: boolean
    masterEdition?: web3.PublicKey
  }) {
    this.key = MetadataKeyStruct.MetadataV1
    this.updateAuthority = args.updateAuthority
    this.mint = args.mint
    this.data = args.data
    this.primarySaleHappened = args.primarySaleHappened
    this.isMutable = args.isMutable
  }
}

export const NFT_METADATA_SCHEMA = new Map<any, any>([
  [
    MasterEditionV2Struct,
    {
      kind: 'struct',
      fields: [
        ['key', 'u8'],
        ['supply', 'u64'],
        ['maxSupply', { kind: 'option', type: 'u64' }],
      ],
    },
  ],
  [
    EditionStruct,
    {
      kind: 'struct',
      fields: [
        ['key', 'u8'],
        ['parent', [32]],
        ['edition', 'u64'],
      ],
    },
  ],
  [
    DataStruct,
    {
      kind: 'struct',
      fields: [
        ['name', 'string'],
        ['symbol', 'string'],
        ['uri', 'string'],
        ['sellerFeeBasisPoints', 'u16'],
        ['creators', { kind: 'option', type: [CreatorStruct] }],
      ],
    },
  ],
  [
    CreatorStruct,
    {
      kind: 'struct',
      fields: [
        ['address', [32]],
        ['verified', 'u8'],
        ['share', 'u8'],
      ],
    },
  ],
  [
    MetadataStruct,
    {
      kind: 'struct',
      fields: [
        ['key', 'u8'],
        ['updateAuthority', [32]],
        ['mint', [32]],
        ['data', DataStruct],
        ['primarySaleHappened', 'u8'],
        ['isMutable', 'u8'],
      ],
    },
  ],
  [
    EditionMarkerStruct,
    {
      kind: 'struct',
      fields: [
        ['key', 'u8'],
        ['ledger', [31]],
      ],
    },
  ],
])

export const AUCTION_HOUSE = 'auction_house'
export const AUCTION_HOUSE_PROGRAM_ID = new PublicKey('hausS13jsjafwWwGqZTUQRmWyvyxn9EQpqMwV1PBBmk')
export const FEE_PAYER = 'fee_payer'
export const TREASURY = 'treasury'

export const getAuctionHouseFeeAcct = async (auctionHouse: PublicKey): Promise<[PublicKey, number]> => {
  return await PublicKey.findProgramAddress(
    [Buffer.from(AUCTION_HOUSE), auctionHouse.toBuffer(), Buffer.from(FEE_PAYER)],
    AUCTION_HOUSE_PROGRAM_ID,
  )
}

export const getAuctionHouseTreasuryAcct = async (auctionHouse: PublicKey): Promise<[PublicKey, number]> => {
  return await PublicKey.findProgramAddress(
    [Buffer.from(AUCTION_HOUSE), auctionHouse.toBuffer(), Buffer.from(TREASURY)],
    AUCTION_HOUSE_PROGRAM_ID,
  )
}

export const getAuctionHouse = async (
  creator: PublicKey,
  treasuryMint: PublicKey,
): Promise<[PublicKey, number]> => {
  return PublicKey.findProgramAddress(
    [Buffer.from(AUCTION_HOUSE), creator.toBuffer(), treasuryMint.toBuffer()],
    AUCTION_HOUSE_PROGRAM_ID,
  )
}

export const getAuctionHouseTradeState = (
  auctionHouse: PublicKey,
  wallet: PublicKey,
  tokenAccount: PublicKey,
  treasuryMint: PublicKey,
  tokenMint: PublicKey,
  tokenSize: BN,
  buyPrice: BN,
): Promise<[PublicKey, number]> => {
  return PublicKey.findProgramAddress(
    [
      Buffer.from(AUCTION_HOUSE),
      wallet.toBuffer(),
      auctionHouse.toBuffer(),
      tokenAccount.toBuffer(),
      treasuryMint.toBuffer(),
      tokenMint.toBuffer(),
      buyPrice.toBuffer('le', 8),
      tokenSize.toBuffer('le', 8),
    ],
    AUCTION_HOUSE_PROGRAM_ID,
  )
}

export const getAuctionHouseProgramAsSigner = async (): Promise<[PublicKey, number]> => {
  return await PublicKey.findProgramAddress(
    [Buffer.from(AUCTION_HOUSE), Buffer.from('signer')],
    AUCTION_HOUSE_PROGRAM_ID,
  )
}

export const getMetadataAccount = (tokenMint: PublicKey): Promise<[PublicKey, number]> => {
  return PublicKey.findProgramAddress(
    [Buffer.from('metadata'), TOKEN_METADATA_PROGRAM_ID.toBuffer(), tokenMint.toBuffer()],
    TOKEN_METADATA_PROGRAM_ID,
  )
}

export const getAuctionHouseEscrow = (
  auctionHouse: PublicKey,
  wallet: PublicKey,
): Promise<[PublicKey, number]> => {
  return PublicKey.findProgramAddress(
    [Buffer.from(AUCTION_HOUSE), auctionHouse.toBuffer(), wallet.toBuffer()],
    AUCTION_HOUSE_PROGRAM_ID,
  )
}

// export const findListingReceiptAddress = (sellerTradeState) => {
//   return PublicKey.findProgramAddress(
//     [Buffer.from('listing_receipt'), sellerTradeState.toBuffer()],
//     AUCTION_HOUSE_PROGRAM_ID,
//   )
// }

const getFeePayer = (externalFeePayer: boolean, from: PublicKey, feePayer?: string) => {
  if (externalFeePayer) {
    return new PublicKey(FEE_PAYER)
  }
  return feePayer ? new PublicKey(feePayer) : from
}

export const parseNftMetadata = (buffer: Buffer): MetadataStruct => {
  const metadata = deserializeUnchecked(NFT_METADATA_SCHEMA, MetadataStruct, buffer) as MetadataStruct
  metadata.data.name = metadata.data.name.replace(METADATA_REPLACE_CONST, '')
  metadata.data.uri = metadata.data.uri.replace(METADATA_REPLACE_CONST, '')
  metadata.data.symbol = metadata.data.symbol.replace(METADATA_REPLACE_CONST, '')
  return metadata
}

export interface CreateAuctionHouseParams {
  marketplaceFee: number
  canChangeSalePrice?: boolean
  requiresSignOff?: boolean
  treasuryWithdrawalDestination?: PublicKeyInitData
  feeWithdrawalDestination?: PublicKeyInitData
  treasuryMint?: PublicKeyInitData

  fromPrivateKey: string
  from: string
}

export type CreateAuctionHouse = FromPrivateKeyOrSignatureId<CreateAuctionHouseParams>

const createAuctionHouse = async (params: CreateAuctionHouse, web3: SolanaWeb3) => {
  const connection = web3.getClient()
  const from = new PublicKey(params.from)
  const feePayerKey = getFeePayer(false, from)
  const transaction = new Transaction({ feePayer: feePayerKey })

  const {
    marketplaceFee,
    canChangeSalePrice = false,
    requiresSignOff = false,
    treasuryWithdrawalDestination,
    feeWithdrawalDestination,
    treasuryMint,
  } = params

  const twdKey = treasuryWithdrawalDestination ? new PublicKey(treasuryWithdrawalDestination) : from

  const fwdKey = feeWithdrawalDestination ? new PublicKey(feeWithdrawalDestination) : from

  const tMintKey = treasuryMint ? new PublicKey(treasuryMint) : NATIVE_MINT

  const twdAta = tMintKey.equals(NATIVE_MINT) ? twdKey : await getAssociatedTokenAddress(tMintKey, twdKey)

  const [auctionHouse, bump] = await getAuctionHouse(from, tMintKey)

  const [feeAccount, feePayerBump] = await getAuctionHouseFeeAcct(auctionHouse)

  const [treasuryAccount, treasuryBump] = await getAuctionHouseTreasuryAcct(auctionHouse)

  transaction.add(
    createCreateAuctionHouseInstruction(
      {
        treasuryMint: tMintKey,
        payer: from,
        authority: from,
        feeWithdrawalDestination: fwdKey,
        treasuryWithdrawalDestination: twdAta,
        treasuryWithdrawalDestinationOwner: twdKey,
        auctionHouse,
        auctionHouseFeeAccount: feeAccount,
        auctionHouseTreasury: treasuryAccount,
      },
      {
        bump,
        feePayerBump,
        treasuryBump,
        sellerFeeBasisPoints: marketplaceFee,
        requiresSignOff,
        canChangeSalePrice,
      },
    ),
  )

  const signers = [web3.generateKeyPair(params.fromPrivateKey)]
  return {
    txId: await connection.sendTransaction(transaction, signers),
    contractAddress: auctionHouse.toBase58(),
    feeAccount: feeAccount.toBase58(),
    treasuryAccount: treasuryAccount.toBase58(),
  }
}

export interface UpdateAuctionHouseParams {
  marketplaceFee?: number
  canChangeSalePrice?: boolean
  requiresSignOff?: boolean
  treasuryWithdrawalDestination?: PublicKeyInitData
  feeWithdrawalDestination?: PublicKeyInitData
  treasuryMint?: PublicKeyInitData

  fromPrivateKey: string
  from: string
}

export type UpdateAuctionHouse = FromPrivateKeyOrSignatureId<UpdateAuctionHouseParams>

export const updateAuctionHouse = async (params: UpdateAuctionHouse, web3: SolanaWeb3) => {
  const connection = web3.getClient()
  const from = new PublicKey(params.from)
  const feePayerKey = getFeePayer(false, from)
  const transaction = new Transaction({ feePayer: feePayerKey })

  const {
    marketplaceFee,
    canChangeSalePrice,
    requiresSignOff,
    treasuryWithdrawalDestination,
    feeWithdrawalDestination,
    treasuryMint,
  } = params

  const twdKey = treasuryWithdrawalDestination ? new PublicKey(treasuryWithdrawalDestination) : from

  const fwdKey = feeWithdrawalDestination ? new PublicKey(feeWithdrawalDestination) : from

  const tMintKey = treasuryMint ? new PublicKey(treasuryMint) : NATIVE_MINT

  const twdAta = tMintKey.equals(NATIVE_MINT) ? twdKey : await getAssociatedTokenAddress(tMintKey, twdKey)

  const [auctionHouse] = await getAuctionHouse(from, tMintKey)

  transaction.add(
    createUpdateAuctionHouseInstruction(
      {
        treasuryMint: tMintKey,
        payer: from,
        authority: from,
        newAuthority: from,
        feeWithdrawalDestination: fwdKey,
        treasuryWithdrawalDestination: twdAta,
        treasuryWithdrawalDestinationOwner: twdKey,
        auctionHouse,
      },
      {
        sellerFeeBasisPoints: marketplaceFee,
        requiresSignOff,
        canChangeSalePrice,
      },
    ),
  )

  const signers = [web3.generateKeyPair(params.fromPrivateKey)]
  return {
    txId: await connection.sendTransaction(transaction, signers),
  }
}

export interface PostParams {
  authority: string
  treasuryMint: string
  authorityPrivateKey?: string

  nftAddress: string
  nftAccountAddress: string
  fromPrivateKey: string
  from: string

  price: string
}

export type SellParams = FromPrivateKeyOrSignatureId<PostParams>

const post = async (body: SellParams, web3: SolanaWeb3) => {
  const { authorityPrivateKey, nftAddress, nftAccountAddress, fromPrivateKey, price } = body

  const connection = web3.getClient()
  const from = new PublicKey(body.from)
  const feePayerKey = getFeePayer(false, from)
  const transaction = new Transaction({ feePayer: feePayerKey })

  const publicKey = new PublicKey(body.from)

  const buyerPrice = price
  const authority = new PublicKey(body.authority)
  const treasuryMint = new PublicKey(body.treasuryMint)
  const tokenMint = new PublicKey(nftAddress)
  const [metadata, bump] = await getMetadataAccount(tokenMint)

  const associatedTokenAccount = new PublicKey(nftAccountAddress)

  const [auctionHouse] = await getAuctionHouse(authority, treasuryMint)
  const [feeAccount] = await getAuctionHouseFeeAcct(auctionHouse)

  const [sellerTradeState, tradeStateBump] = await getAuctionHouseTradeState(
    auctionHouse,
    publicKey,
    associatedTokenAccount,
    treasuryMint,
    tokenMint,
    new BN(1),
    new BN(price),
  )

  const [freeTradeState, freeTradeBump] = await getAuctionHouseTradeState(
    auctionHouse,
    publicKey,
    associatedTokenAccount,
    treasuryMint,
    tokenMint,
    new BN(1),
    new BN(0),
  )

  const [programAsSigner, programAsSignerBump] = await getAuctionHouseProgramAsSigner()

  const sellInstructionArgs = {
    tradeStateBump,
    freeTradeStateBump: freeTradeBump,
    programAsSignerBump: programAsSignerBump,
    buyerPrice: new BN(buyerPrice),
    tokenSize: new BN(1),
  }

  const sellInstructionAccounts = {
    wallet: publicKey,
    tokenAccount: associatedTokenAccount,
    metadata: metadata,
    authority: authority,
    auctionHouse: auctionHouse,
    auctionHouseFeeAccount: feeAccount,
    sellerTradeState: sellerTradeState,
    freeSellerTradeState: freeTradeState,
    programAsSigner: programAsSigner,
  }

  const sellInstruction = createSellInstruction(sellInstructionAccounts, sellInstructionArgs)

  transaction.add(sellInstruction)

  // const [receipt, receiptBump] = await findListingReceiptAddress(sellerTradeState)
  //
  // const printListingReceiptInstruction = createPrintListingReceiptInstruction(
  //   {
  //     receipt,
  //     bookkeeper: publicKey,
  //     instruction: SYSVAR_INSTRUCTIONS_PUBKEY,
  //   },
  //   {
  //     receiptBump,
  //   },
  // )

  const signers = [web3.generateKeyPair(fromPrivateKey)]

  if (authorityPrivateKey) {
    signers.push(web3.generateKeyPair(authorityPrivateKey))
  }

  return {
    txId: await connection.sendTransaction(transaction, signers),
  }
}

export interface BuyParams {
  authority: string
  treasuryMint: string
  authorityPrivateKey?: string

  seller: string

  nftAddress: string
  nftAccountAddress: string

  fromPrivateKey: string
  from: string

  price: string
}

export type BuyType = FromPrivateKeyOrSignatureId<BuyParams>

export const treasuryMintIsNative = (treasuryMint: PublicKey) => {
  return treasuryMint.equals(NATIVE_MINT)
}

export const safeAwaitCall = <T>(promise: Promise<T>, callback?: any) => {
  return promise
    .then((data) => {
      return { result: data, error: undefined }
    })
    .catch((error: Error) => {
      return { result: undefined, error: error }
    })
    .finally(() => {
      if (callback && typeof callback === 'function') {
        callback()
      }
    })
}

const generateCreationInstructions = async (
  web3: SolanaWeb3,
  payer: PublicKey,
  addresses: string[],
  mint: PublicKey,
): Promise<TransactionInstruction[] | null> => {
  const connection = web3.getClient()

  const ix: TransactionInstruction[] = []
  for (const addr of addresses) {
    const addrPubKey = new PublicKey(addr)
    const tokenAddress = await getAssociatedTokenAddress(mint, addrPubKey)

    const tokenAccountRes = await safeAwaitCall(getAccount(connection, tokenAddress))

    const tokenAccount = tokenAccountRes.result

    if (!tokenAccount || !tokenAccount.isInitialized) {
      ix.push(
        createAssociatedTokenAccountInstruction(
          payer,
          tokenAddress,
          addrPubKey,
          mint,
          TOKEN_PROGRAM_ID,
          ASSOCIATED_TOKEN_PROGRAM_ID,
        ),
      )
    }
  }
  return ix
}

export const buyAndExecuteSale = async (params: BuyType, web3: SolanaWeb3) => {
  const { authorityPrivateKey, seller, nftAddress, nftAccountAddress, fromPrivateKey, from, price } = params

  const connection = web3.getClient()

  const authority = new PublicKey(params.authority)
  const treasuryMint = new PublicKey(params.treasuryMint)
  const buyerPublicKey = new PublicKey(from)

  const feePayerKey = getFeePayer(false, buyerPublicKey)

  const tokenMint = new PublicKey(nftAddress)
  const [metadata] = await getMetadataAccount(tokenMint)

  const associatedTokenAccount = new PublicKey(nftAccountAddress)

  const [auctionHouse] = await getAuctionHouse(authority, treasuryMint)
  const [feeAccount] = await getAuctionHouseFeeAcct(auctionHouse)

  const [buyerEscrow, buyerEscrowBump] = await getAuctionHouseEscrow(auctionHouse, buyerPublicKey)

  const [buyTradeState, buyTradeStateBump] = await getAuctionHouseTradeState(
    auctionHouse,
    buyerPublicKey,
    associatedTokenAccount,
    treasuryMint,
    tokenMint,
    new BN(1),
    new BN(price),
  )

  const isNative = treasuryMintIsNative(treasuryMint)

  const sellerPublicKey = new PublicKey(seller)

  const [treasuryAccount, treasuryBump] = await getAuctionHouseTreasuryAcct(auctionHouse)

  const [sellTradeState, sellTradeStateBump] = await getAuctionHouseTradeState(
    auctionHouse,
    sellerPublicKey,
    associatedTokenAccount,
    treasuryMint,
    tokenMint,
    new BN(1),
    new BN(price),
  )

  const [freeTradeState, freeTradeStateBump] = await getAuctionHouseTradeState(
    auctionHouse,
    sellerPublicKey,
    associatedTokenAccount,
    treasuryMint,
    tokenMint,
    new BN(1),
    new BN(0),
  )
  const [programAsSigner, programAsSignerBump] = await getAuctionHouseProgramAsSigner()

  const transaction = new Transaction({ feePayer: feePayerKey })

  const paymentAccount = isNative
    ? buyerPublicKey
    : await getAssociatedTokenAddress(treasuryMint, buyerPublicKey)

  const buyInstructionArgs = {
    buyerPrice: new BN(price),
    tokenSize: new BN(1),
    tradeStateBump: buyTradeStateBump,
    escrowPaymentBump: buyerEscrowBump,
  }

  const buyInstructionAccounts: BuyInstructionAccounts = {
    wallet: buyerPublicKey,
    paymentAccount,
    transferAuthority: buyerPublicKey,
    treasuryMint,
    tokenAccount: associatedTokenAccount,
    metadata,
    escrowPaymentAccount: buyerEscrow,
    authority,
    auctionHouse,
    auctionHouseFeeAccount: feeAccount,
    buyerTradeState: buyTradeState,
  }

  const buyInstruction = createBuyInstruction(buyInstructionAccounts, buyInstructionArgs)

  const metadataObj = await connection.getAccountInfo(metadata)

  if (!metadataObj?.data) {
    throw new Error('WRONG NFT')
  }

  const metadataParsed: MetadataStruct = parseNftMetadata(Buffer.from(metadataObj.data))

  const remainingAccounts = [] as Array<{
    pubkey: web3.PublicKey
    isWritable: boolean
    isSigner: boolean
  }>

  const accountsRequireTokenSet = new Set<string>()

  if (metadataParsed && metadataParsed.data && metadataParsed.data.creators) {
    for (let creator of metadataParsed.data.creators) {
      const creatorPublicKey = new PublicKey(creator.address)

      remainingAccounts.push({
        pubkey: creatorPublicKey,
        isWritable: true,
        isSigner: false,
      })

      if (!isNative) {
        const associatedTokenAddress = await getAssociatedTokenAddress(treasuryMint, creatorPublicKey)
        remainingAccounts.push({
          pubkey: associatedTokenAddress,
          isWritable: true,
          isSigner: false,
        })
        accountsRequireTokenSet.add(creatorPublicKey.toString())
      }
    }
  }

  const sellerPaymentReceiptAccount = isNative
    ? sellerPublicKey
    : await getAssociatedTokenAddress(treasuryMint, sellerPublicKey)

  if (!isNative) {
    accountsRequireTokenSet.add(sellerPublicKey.toString())
  }

  const allTokenInstructions: TransactionInstruction[] = []

  const treasuryMintTokenInstructions = await generateCreationInstructions(
    web3,
    buyerPublicKey,
    Array.from(accountsRequireTokenSet.values()),
    treasuryMint,
  )
  if (treasuryMintTokenInstructions) {
    allTokenInstructions.push(...treasuryMintTokenInstructions)
  }

  const buyerReceiptTokenAccount = await getAssociatedTokenAddress(tokenMint, buyerPublicKey)

  if (!isNative) {
    const tokenMintInstructions = await generateCreationInstructions(
      web3,
      buyerPublicKey,
      [buyerPublicKey.toString()],
      tokenMint,
    )
    if (tokenMintInstructions) {
      allTokenInstructions.push(...tokenMintInstructions)
    }
  }

  const executeSellInstructionArgs: ExecuteSaleInstructionArgs = {
    escrowPaymentBump: buyerEscrowBump,
    freeTradeStateBump: freeTradeStateBump,
    programAsSignerBump: programAsSignerBump,
    buyerPrice: new BN(price),
    tokenSize: new BN(1),
  }

  const executeSellInstructionAccounts: ExecuteSaleInstructionAccounts = {
    buyer: buyerPublicKey,
    seller: sellerPublicKey,
    tokenAccount: associatedTokenAccount,
    tokenMint: tokenMint,
    metadata,
    treasuryMint,
    escrowPaymentAccount: buyerEscrow,
    sellerPaymentReceiptAccount,
    buyerReceiptTokenAccount,
    authority,
    auctionHouse,
    auctionHouseFeeAccount: feeAccount,
    auctionHouseTreasury: treasuryAccount,
    buyerTradeState: buyTradeState,
    sellerTradeState: sellTradeState,
    freeTradeState: freeTradeState,
    programAsSigner: programAsSigner,
    anchorRemainingAccounts: remainingAccounts,
  }

  const executeSaleInstruction = createExecuteSaleInstruction(
    executeSellInstructionAccounts,
    executeSellInstructionArgs,
  )

  transaction.add(buyInstruction)
  transaction.add(executeSaleInstruction)

  const signers = [web3.generateKeyPair(fromPrivateKey)]

  if (authorityPrivateKey) {
    signers.push(web3.generateKeyPair(authorityPrivateKey))
  }

  return {
    txId: await connection.sendTransaction(transaction, signers),
  }
}

export const solanaMarketPlaceService = (args: { web3: SolanaWeb3 }) => {
  return {
    getAuctionHouse: async (authority: string, treasuryMint: string) => {
      const [auctionHouse] = await getAuctionHouse(new PublicKey(authority), new PublicKey(treasuryMint))
      return auctionHouse
    },
    getAuctionHouseFeeAcct: async (ah: string) => {
      const [feeAcc] = await getAuctionHouseFeeAcct(new PublicKey(ah))
      return feeAcc
    },
    getAuctionHouseTreasuryAcct: async (ah: string) => {
      const [treasuryAcct] = await getAuctionHouseTreasuryAcct(new PublicKey(ah))
      return treasuryAcct
    },
    send: {
      deploySignedTransaction: async (params: CreateAuctionHouse) => {
        return createAuctionHouse(params, args.web3)
      },
      updateSignedTransaction: async (params: UpdateAuctionHouse) => {
        return updateAuctionHouse(params, args.web3)
      },
      sellSignedTransaction: async (params: SellParams) => {
        return post(params, args.web3)
      },
      buySignedTransaction: async (params: BuyType) => {
        return buyAndExecuteSale(params, args.web3)
      },
    },
  }
}
