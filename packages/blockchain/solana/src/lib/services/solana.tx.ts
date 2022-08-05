import { Keypair, LAMPORTS_PER_SOL, PublicKey, SystemProgram, Transaction } from '@solana/web3.js'
import {
  ChainDeploySolanaSpl,
  ChainTransferSolanaSpl,
  MintNftSolana,
  TransferNftSolana,
  TransferSolanaBlockchain,
} from '@tatumio/api-client'
import { FromPrivateKeyOrSignatureId } from '@tatumio/shared-blockchain-abstract'
import { SolanaWeb3 } from './solana.web3'
import {
  createInitializeMintInstruction,
  createMintToInstruction,
  createTransferInstruction,
  getAccount,
  getAssociatedTokenAddress,
  getMinimumBalanceForRentExemptMint,
  MINT_SIZE,
  MintLayout,
  TOKEN_PROGRAM_ID,
} from '@solana/spl-token'
import {
  createAssociatedTokenAccountInstruction,
  SPL_ASSOCIATED_TOKEN_ACCOUNT_PROGRAM_ID,
  TOKEN_METADATA_PROGRAM_ID,
} from '../schema/instructions'
import {
  createCreateMasterEditionV3Instruction,
  createCreateMetadataAccountV3Instruction,
  createVerifySizedCollectionItemInstruction,
} from '@metaplex-foundation/mpl-token-metadata'
import BigNumber from 'bignumber.js'

export type TransferSolana = FromPrivateKeyOrSignatureId<TransferSolanaBlockchain>
export type TransferSolanaNft = FromPrivateKeyOrSignatureId<TransferNftSolana>
export type TransferSolanaSpl = FromPrivateKeyOrSignatureId<ChainTransferSolanaSpl>
export type CreateSolanaSpl = FromPrivateKeyOrSignatureId<ChainDeploySolanaSpl>
export type MintSolanaNft = FromPrivateKeyOrSignatureId<MintNftSolana>
export type CreateSolanaNftCollection = FromPrivateKeyOrSignatureId<MintNftSolana>

const findMetadataProgramAddress = async (account: PublicKey, isEdition = false) => {
  const seeds = [Buffer.from('metadata'), TOKEN_METADATA_PROGRAM_ID.toBuffer(), account.toBuffer()]
  if (isEdition) {
    seeds.push(Buffer.from('edition'))
  }
  return (
    await PublicKey.findProgramAddress(
      seeds,
      TOKEN_METADATA_PROGRAM_ID,
    )
  )[0]
}

const send = async (
  body: TransferSolana,
  web3: SolanaWeb3,
  provider?: string,
  feePayer?: string,
  feePayerPrivateKey?: string,
): Promise<{ txData: string } | { txId: string }> => {
  const fromPubkey = new PublicKey(body.from)
  const connection = web3.getClient(provider)

  const transaction = new Transaction({ feePayer: feePayer ? new PublicKey(feePayer) : fromPubkey })
  transaction.add(
    SystemProgram.transfer({
      fromPubkey: fromPubkey,
      toPubkey: new PublicKey(body.to),
      lamports: new BigNumber(body.amount).multipliedBy(LAMPORTS_PER_SOL).toNumber(),
    }),
  )

  if (body.signatureId) {
    transaction.recentBlockhash = '7WyEshBZcZwEbJsvSeGgCkSNMxxxFAym3x7Cuj6UjAUE'
    return { txData: transaction.compileMessage().serialize().toString('hex') }
  }

  const signers = [web3.generateKeyPair(body.fromPrivateKey)]
  if (feePayerPrivateKey) {
    signers.push(web3.generateKeyPair(feePayerPrivateKey))
  }

  return {
    txId: await connection.sendTransaction(transaction, signers),
  }
}

const transferNft = async (
  body: TransferSolanaNft,
  web3: SolanaWeb3,
  provider?: string,
  feePayer?: string,
  feePayerPrivateKey?: string,
) => {
  const connection = web3.getClient(provider)
  const from = new PublicKey(body.from as string)
  const transaction = new Transaction({ feePayer: feePayer ? new PublicKey(feePayer) : from })
  const walletAddress = new PublicKey(body.to)

  const mint = new PublicKey(body.contractAddress)

  const toTokenAccountAddress = (
    await PublicKey.findProgramAddress(
      [new PublicKey(body.to).toBuffer(), TOKEN_PROGRAM_ID.toBuffer(), mint.toBuffer()],
      SPL_ASSOCIATED_TOKEN_ACCOUNT_PROGRAM_ID,
    )
  )[0]
  const fromTokenAddress = await getAssociatedTokenAddress(mint, from)
  transaction.add(
    createAssociatedTokenAccountInstruction(toTokenAccountAddress, from, walletAddress, mint),
    createTransferInstruction(fromTokenAddress, toTokenAccountAddress, from, 1, [], TOKEN_PROGRAM_ID),
  )

  if (body.signatureId) {
    transaction.recentBlockhash = '7WyEshBZcZwEbJsvSeGgCkSNMxxxFAym3x7Cuj6UjAUE'
    return { txData: transaction.compileMessage().serialize().toString('hex') }
  }

  const signers = [web3.generateKeyPair(body.fromPrivateKey)]
  if (feePayerPrivateKey) {
    signers.push(web3.generateKeyPair(feePayerPrivateKey))
  }
  return {
    txId: await connection.sendTransaction(transaction, signers),
  }
}

const transferSplToken = async (
  body: TransferSolanaSpl,
  web3: SolanaWeb3,
  provider?: string,
  feePayer?: string,
  feePayerPrivateKey?: string,
) => {
  const connection = web3.getClient(provider)
  const from = new PublicKey(body.from as string)
  const transaction = new Transaction({ feePayer: feePayer ? new PublicKey(feePayer) : from })
  const mint = new PublicKey(body.contractAddress)
  const to = new PublicKey(body.to)

  const fromTokenAddress = await getAssociatedTokenAddress(mint, from)
  const toTokenAccountAddress = await getAssociatedTokenAddress(mint, to)
  try {
    await getAccount(connection, toTokenAccountAddress)
  } catch (e) {
    transaction.add(createAssociatedTokenAccountInstruction(toTokenAccountAddress, from, to, mint))
  }

  transaction.add(
    createTransferInstruction(
      fromTokenAddress,
      toTokenAccountAddress,
      from,
      new BigNumber(body.amount).multipliedBy(10 ** body.digits).toNumber(),
      [],
      TOKEN_PROGRAM_ID,
    ),
  )

  if (body.signatureId) {
    transaction.recentBlockhash = '7WyEshBZcZwEbJsvSeGgCkSNMxxxFAym3x7Cuj6UjAUE'
    return { txData: transaction.compileMessage().serialize().toString('hex') }
  }

  const signers = [web3.generateKeyPair(body.fromPrivateKey)]
  if (feePayerPrivateKey) {
    signers.push(web3.generateKeyPair(feePayerPrivateKey))
  }
  return {
    txId: await connection.sendTransaction(transaction, signers),
  }
}

const createSplToken = async (
  body: CreateSolanaSpl,
  web3: SolanaWeb3,
  provider?: string,
  feePayer?: string,
  feePayerPrivateKey?: string,
) => {
  const connection = web3.getClient(provider)
  const payer = new PublicKey(feePayer || body.from)
  const transaction = new Transaction({ feePayer: payer })
  const lamports = await getMinimumBalanceForRentExemptMint(connection)

  const mint = Keypair.generate()
  transaction.add(
    SystemProgram.createAccount({
      fromPubkey: payer,
      newAccountPubkey: mint.publicKey,
      space: MINT_SIZE,
      lamports,
      programId: TOKEN_PROGRAM_ID,
    }),
    createInitializeMintInstruction(mint.publicKey, body.digits, payer, payer, TOKEN_PROGRAM_ID),
  )
  const userTokenAccountAddress = (
    await PublicKey.findProgramAddress(
      [new PublicKey(body.address).toBuffer(), TOKEN_PROGRAM_ID.toBuffer(), mint.publicKey.toBuffer()],
      SPL_ASSOCIATED_TOKEN_ACCOUNT_PROGRAM_ID,
    )
  )[0]
  transaction.add(
    createAssociatedTokenAccountInstruction(
      userTokenAccountAddress,
      payer,
      new PublicKey(body.address),
      mint.publicKey,
    ),
    createMintToInstruction(
      mint.publicKey,
      userTokenAccountAddress,
      payer,
      new BigNumber(body.supply).multipliedBy(10 ** body.digits).toNumber(),
      [],
      TOKEN_PROGRAM_ID,
    ),
  )
  if (body.signatureId) {
    transaction.recentBlockhash = '7WyEshBZcZwEbJsvSeGgCkSNMxxxFAym3x7Cuj6UjAUE'
    return { txData: transaction.compileMessage().serialize().toString('hex') }
  }

  const signers = [web3.generateKeyPair(feePayerPrivateKey || body.fromPrivateKey), mint]
  return {
    txId: await connection.sendTransaction(transaction, signers),
    contractAddress: mint.publicKey.toBase58(),
  }
}

const mintNft = async (
  body: MintSolanaNft,
  web3: SolanaWeb3,
  provider?: string,
  feePayer?: string,
  feePayerPrivateKey?: string,
  collectionVerifierPrivateKey?: string) => {
  const connection = web3.getClient(provider)
  const from = new PublicKey(body.from)
  const feePayerAccount = feePayer ? new PublicKey(feePayer) : from
  const transaction = new Transaction({ feePayer: feePayerAccount })
  const mintRent = await connection.getMinimumBalanceForRentExemption(MintLayout.span)
  const mint = Keypair.generate()
  const instructions = []
  instructions.push(
    SystemProgram.createAccount({
      fromPubkey: from,
      newAccountPubkey: mint.publicKey,
      lamports: mintRent,
      space: MintLayout.span,
      programId: TOKEN_PROGRAM_ID,
    }),
    createInitializeMintInstruction(mint.publicKey, 0, from, null, TOKEN_PROGRAM_ID),
  )

  const userTokenAccountAddress = (
    await PublicKey.findProgramAddress(
      [new PublicKey(body.to).toBuffer(), TOKEN_PROGRAM_ID.toBuffer(), mint.publicKey.toBuffer()],
      SPL_ASSOCIATED_TOKEN_ACCOUNT_PROGRAM_ID,
    )
  )[0]

  instructions.push(
    createAssociatedTokenAccountInstruction(
      userTokenAccountAddress,
      from,
      new PublicKey(body.to),
      mint.publicKey,
    ),
  )

  const metadataAccount = await findMetadataProgramAddress(mint.publicKey)

  const collectionAccount = body.metadata.collection ? new PublicKey(body.metadata.collection) : null
  instructions.push(
    createMintToInstruction(mint.publicKey, userTokenAccountAddress, from, 1, [], TOKEN_PROGRAM_ID),
    createCreateMetadataAccountV3Instruction({
      metadata: metadataAccount,
      mint: mint.publicKey,
      mintAuthority: from,
      updateAuthority: from,
      payer: feePayerAccount,
    }, {
      createMetadataAccountArgsV3: {
        data: {
          name: body.metadata.name,
          collection: body.metadata.collection ?
            { key: collectionAccount, verified: false } : null,
          creators: body.metadata.creators?.map(c => ({
            address: new PublicKey(c.address),
            verified: c.address === body.from ? true : c.verified,
            share: c.share,
          })),
          sellerFeeBasisPoints: body.metadata.sellerFeeBasisPoints,
          symbol: body.metadata.symbol,
          uri: body.metadata.uri,
          uses: null,
        },
        isMutable: body.metadata.mutable === undefined ? true : body.metadata.mutable,
        collectionDetails: {
          size: 0,
          __kind: 'V1',
        },
      },
    }),
  )

  const editionAccount = await findMetadataProgramAddress(mint.publicKey, true)

  instructions.push(
    createCreateMasterEditionV3Instruction({
      metadata: metadataAccount,
      edition: editionAccount,
      mint: mint.publicKey,
      mintAuthority: from,
      payer: feePayerAccount,
      updateAuthority: from,
    }, { createMasterEditionArgs: { maxSupply: 0 } }),
  )

  if (body.metadata.collection && collectionVerifierPrivateKey) {
    const collectionMetadataAccount = await findMetadataProgramAddress(collectionAccount)
    const collectionMasterEditionAccount = await findMetadataProgramAddress(collectionAccount, true)

    instructions.push(createVerifySizedCollectionItemInstruction({
      metadata: metadataAccount,
      collectionAuthority: web3.generateKeyPair(collectionVerifierPrivateKey).publicKey,
      payer: feePayerAccount,
      collectionMint: collectionAccount,
      collection: collectionMetadataAccount,
      collectionMasterEditionAccount,
    }))
  }
  transaction.add(...instructions)

  if (body.signatureId) {
    transaction.recentBlockhash = '7WyEshBZcZwEbJsvSeGgCkSNMxxxFAym3x7Cuj6UjAUE'
    return {
      txData: transaction.compileMessage().serialize().toString('hex'),
      mintPK: Buffer.from(mint.secretKey).toString('hex'),
    }
  }

  const wallet = web3.generateKeyPair(body.fromPrivateKey as string)
  const signers = [mint, wallet]
  if (feePayerPrivateKey) {
    signers.push(web3.generateKeyPair(feePayerPrivateKey))
  }
  if (collectionVerifierPrivateKey) {
    signers.push(web3.generateKeyPair(collectionVerifierPrivateKey))
  }
  return {
    txId: await connection.sendTransaction(transaction, [wallet, ...signers]),
    nftAddress: mint.publicKey.toBase58(),
    nftAccountAddress: userTokenAccountAddress.toBase58(),
  }
}

const verifyNftInCollection = async (
  nftMintAddress: string,
  collectionAddress: string,
  web3: SolanaWeb3,
  feePayer: string,
  feePayerPrivateKey: string,
  collectionVerifierPrivateKey: string,
  isSignedExternally = false,
  provider?: string,
) => {
  const connection = web3.getClient(provider)
  const feePayerAccount = new PublicKey(feePayer)
  const nftMintKey = new PublicKey(nftMintAddress)
  const collectionAccount = new PublicKey(collectionAddress)
  const transaction = new Transaction({ feePayer: feePayerAccount })
  const instructions = []

  const metadataAccount = await findMetadataProgramAddress(nftMintKey)
  const collectionMetadataAccount = await findMetadataProgramAddress(collectionAccount)
  const collectionMasterEditionAccount = await findMetadataProgramAddress(collectionAccount, true)

  instructions.push(createVerifySizedCollectionItemInstruction({
    metadata: metadataAccount,
    collectionAuthority: web3.generateKeyPair(collectionVerifierPrivateKey).publicKey,
    payer: feePayerAccount,
    collectionMint: collectionAccount,
    collection: collectionMetadataAccount,
    collectionMasterEditionAccount,
  }))
  transaction.add(...instructions)

  if (isSignedExternally) {
    transaction.recentBlockhash = '7WyEshBZcZwEbJsvSeGgCkSNMxxxFAym3x7Cuj6UjAUE'
    return {
      txData: transaction.compileMessage().serialize().toString('hex'),
    }
  }

  const signers = [web3.generateKeyPair(feePayerPrivateKey), web3.generateKeyPair(collectionVerifierPrivateKey)]
  return {
    txId: await connection.sendTransaction(transaction, signers),
  }
}

export const solanaTxService = (args: { web3: SolanaWeb3 }) => {
  return {
    /**
     * Transfer SOL from account to another account.
     * @param body body of the request
     * @param provider optional URL of the Solana cluster
     * @param feePayer optional address of the account, which will cover fees
     * @param feePayerPrivateKey optional private key of the account which will cover fees
     */
    send: async (body: TransferSolana, provider?: string, feePayer?: string, feePayerPrivateKey?: string) =>
      send(body, args.web3, provider, feePayer, feePayerPrivateKey),
    /**
     * Transfer SPL token from account to another account.
     * @param body body of the request
     * @param provider optional URL of the Solana cluster
     * @param feePayer optional address of the account, which will cover fees
     * @param feePayerPrivateKey optional private key of the account which will cover fees
     */
    transferSplToken: async (
      body: TransferSolanaSpl,
      provider?: string,
      feePayer?: string,
      feePayerPrivateKey?: string,
    ) => transferSplToken(body, args.web3, provider, feePayer, feePayerPrivateKey),
    /**
     * Create SPL token.
     * @param body body of the request
     * @param provider optional URL of the Solana cluster
     * @param feePayer optional address of the account, which will cover fees
     * @param feePayerPrivateKey optional private key of the account which will cover fees
     */
    createSplToken: async (
      body: CreateSolanaSpl,
      provider?: string,
      feePayer?: string,
      feePayerPrivateKey?: string,
    ) => createSplToken(body, args.web3, provider, feePayer, feePayerPrivateKey),
    /**
     * Transfer NFT on Solana network.
     * @param body body of the request
     * @param provider optional URL of the Solana cluster
     * @param feePayer optional address of the account, which will cover fees
     * @param feePayerPrivateKey optional private key of the account which will cover fees
     */
    transferNft: async (
      body: TransferSolanaNft,
      provider?: string,
      feePayer?: string,
      feePayerPrivateKey?: string,
    ) => transferNft(body, args.web3, provider, feePayer, feePayerPrivateKey),
    /**
     * Mint new NFT on Solana. Fee is being paid by the minter or feePayer, if present
     * @param body body of the request
     * @param provider optional URL of the Solana cluster
     * @param feePayer optional address of the account, which will cover fees instead of minter
     * @param feePayerPrivateKey optional private key of the account which will cover fees
     * @param collectionVerifierPrivateKey optional private key of the account which can verify NFT minted inside collection - must be Update Authority of the NFT Collection
     */
    mintNft: async (body: MintSolanaNft, provider?: string, feePayer?: string, feePayerPrivateKey?: string, collectionVerifierPrivateKey?: string) =>
      mintNft(body, args.web3, provider, feePayer, feePayerPrivateKey, collectionVerifierPrivateKey),

    /**
     * Create new NFT Collection on Solana. Fee is being paid by the minter or feePayer, if present
     * @param body body of the request
     * @param provider optional URL of the Solana cluster
     * @param feePayer optional address of the account, which will cover fees instead of minter
     * @param feePayerPrivateKey optional private key of the account which will cover fees
     */
    createCollection: async (body: CreateSolanaNftCollection, provider?: string, feePayer?: string, feePayerPrivateKey?: string) =>
      mintNft(body, args.web3, provider, feePayer, feePayerPrivateKey),


    /**
     * Verify NFT inside collection. Fee is being paid by feePayer.
     * @param nftMintAddress address of the NFT to verify inside collection
     * @param collectionAddress address of the NFT Collection the NFT is added to
     * @param feePayer address of the feePayer
     * @param feePayerPrivateKey private key of the fee payer - ignored when isSignedExternally is set to true
     * @param collectionVerifierPrivateKey private key of the collectionVerifier authority - ignored when isSignedExternally is set to true
     * @param isSignedExternally is set to true, only unsigned transaction raw data are returned
     * @param provider optional URL of the Solana cluster
     */
    verifyNftInCollection: async (
      nftMintAddress: string,
      collectionAddress: string,
      feePayer: string,
      feePayerPrivateKey: string,
      collectionVerifierPrivateKey: string,
      isSignedExternally = false,
      provider?: string,
    ) => verifyNftInCollection(nftMintAddress, collectionAddress, args.web3, feePayer, feePayerPrivateKey, collectionVerifierPrivateKey, isSignedExternally, provider),
  }
}
