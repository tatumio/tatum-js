import {
  Keypair,
  LAMPORTS_PER_SOL,
  PublicKey,
  Signer,
  SystemProgram,
  Transaction,
  TransactionInstruction,
} from '@solana/web3.js'
import {
  ApiServices,
  BurnNftSolana,
  BurnNftSolanaKMS,
  ChainDeploySolanaSpl,
  ChainDeploySolanaSplKMS,
  ChainTransferSolanaSpl,
  ChainTransferSolanaSplKMS,
  CustodialManagedWalletsService,
  MintNftSolana,
  MintNftSolanaKMS,
  SignatureId,
  SolanaService,
  TransferNftSolana,
  TransferNftSolanaKMS,
  TransferSolanaBlockchain,
  TransferSolanaBlockchainKMS,
  VerifySolanaNFT,
  VerifySolanaNFTKMS,
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
  createBurnNftInstruction,
  createCreateMasterEditionV3Instruction,
  createCreateMetadataAccountV3Instruction,
  createVerifySizedCollectionItemInstruction,
} from '@metaplex-foundation/mpl-token-metadata'
import BigNumber from 'bignumber.js'
import { SdkError, SdkErrorCode, WithoutChain } from '@tatumio/shared-abstract-sdk'
import { Blockchain } from '@tatumio/shared-core'

export type FeePayerSignatureId = {
  feePayer: string
  feePayerSignatureId: string
}

export type SolanaFromPrivateKeyOrSignatureId<
  T extends { fromPrivateKey?: string; feePayerPrivateKey?: string; feePayer?: string },
> = Omit<T, 'fromPrivateKey' | 'feePayerPrivateKey' | 'feePayer'> &
  Partial<SignatureId & { index: number }> &
  Partial<FeePayerSignatureId> &
  Partial<Pick<T, 'fromPrivateKey'>> &
  Partial<Pick<T, 'feePayerPrivateKey' | 'feePayer'>>

export type TransferSolana = SolanaFromPrivateKeyOrSignatureId<TransferSolanaBlockchain>
export type TransferSolanaNft = WithoutChain<FromPrivateKeyOrSignatureId<TransferNftSolana>>
export type TransferSolanaSpl = WithoutChain<SolanaFromPrivateKeyOrSignatureId<ChainTransferSolanaSpl>>
export type CreateSolanaSpl = WithoutChain<SolanaFromPrivateKeyOrSignatureId<ChainDeploySolanaSpl>>
export type MintSolanaNft = WithoutChain<SolanaFromPrivateKeyOrSignatureId<MintNftSolana>>
export type BurnSolanaNft = WithoutChain<SolanaFromPrivateKeyOrSignatureId<BurnNftSolana>>
export type CreateSolanaNftCollection = WithoutChain<SolanaFromPrivateKeyOrSignatureId<MintNftSolana>>
export type VerifySolanaNft = WithoutChain<SolanaFromPrivateKeyOrSignatureId<VerifySolanaNFT>>

const findMetadataProgramAddress = async (account: PublicKey, isEdition = false) => {
  const seeds = [Buffer.from('metadata'), TOKEN_METADATA_PROGRAM_ID.toBuffer(), account.toBuffer()]
  if (isEdition) {
    seeds.push(Buffer.from('edition'))
  }
  return (await PublicKey.findProgramAddress(seeds, TOKEN_METADATA_PROGRAM_ID))[0]
}

export const FEE_PAYER = 'DSpHmb7hLnetoybammcJBJiyqMVR3pDhCuW6hqVg9eBF'

const getFeePayer = (externalFeePayer: boolean, from: PublicKey, feePayer?: string) => {
  if (externalFeePayer) {
    return new PublicKey(FEE_PAYER)
  }
  return feePayer ? new PublicKey(feePayer) : from
}

const signAndBroadcastAsExternalFeePayer = async (
  web3: SolanaWeb3,
  transaction: Transaction,
  signers: Signer[],
) => {
  const { blockhash, lastValidBlockHeight } = await web3.getClient().getLatestBlockhash('finalized')
  transaction.recentBlockhash = blockhash
  transaction.lastValidBlockHeight = lastValidBlockHeight
  transaction.partialSign(...signers)
  const txData = transaction.serialize({ requireAllSignatures: false }).toString('hex')
  return CustodialManagedWalletsService.custodialTransferManagedAddress({
    walletIds: [],
    txData,
    chain: 'SOL',
  })
}

const send = async (
  body: TransferSolana,
  web3: SolanaWeb3,
  provider?: string,
  externalFeePayer = false,
): Promise<{ txData: string } | { txId: string }> => {
  const connection = web3.getClient(provider)
  const from = new PublicKey(body.from)
  const feePayerKey = getFeePayer(externalFeePayer, from, body.feePayer)

  const balance = await connection.getBalance(from)
  if (new BigNumber(body.amount).isGreaterThan(balance)) {
    throw new SdkError({
      code: SdkErrorCode.INSUFFICIENT_FUNDS,
      originalError: {
        name: SdkErrorCode.INSUFFICIENT_FUNDS,
        message: `Insufficient funds to create transaction from sender account ${from} -> available balance is ${balance}, required balance is ${body.amount}.`,
      },
    })
  }

  const transaction = new Transaction({ feePayer: feePayerKey })
  transaction.add(
    SystemProgram.transfer({
      fromPubkey: from,
      toPubkey: new PublicKey(body.to),
      lamports: new BigNumber(body.amount).multipliedBy(LAMPORTS_PER_SOL).toNumber(),
    }),
  )

  if (body.signatureId) {
    transaction.recentBlockhash = '7WyEshBZcZwEbJsvSeGgCkSNMxxxFAym3x7Cuj6UjAUE'
    return { txData: transaction.compileMessage().serialize().toString('hex') }
  }

  const signers = [web3.generateKeyPair(body.fromPrivateKey)]
  if (externalFeePayer) {
    return signAndBroadcastAsExternalFeePayer(web3, transaction, signers)
  } else if (body.feePayerPrivateKey) {
    signers.push(web3.generateKeyPair(body.feePayerPrivateKey))
  }

  return {
    txId: await connection.sendTransaction(transaction, signers),
  }
}

const transferNft = async (
  body: TransferSolanaNft,
  web3: SolanaWeb3,
  provider?: string,
  externalFeePayer = false,
) => {
  const connection = web3.getClient(provider)
  const from = new PublicKey(body.from)
  const feePayerKey = getFeePayer(externalFeePayer, from, body.feePayer)
  const transaction = new Transaction({ feePayer: feePayerKey })
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
    createAssociatedTokenAccountInstruction(toTokenAccountAddress, feePayerKey, walletAddress, mint),
    createTransferInstruction(fromTokenAddress, toTokenAccountAddress, from, 1, [], TOKEN_PROGRAM_ID),
  )

  if (body.signatureId) {
    transaction.recentBlockhash = '7WyEshBZcZwEbJsvSeGgCkSNMxxxFAym3x7Cuj6UjAUE'
    return { txData: transaction.compileMessage().serialize().toString('hex') }
  }

  const signers = [web3.generateKeyPair(body.fromPrivateKey)]
  if (externalFeePayer) {
    return signAndBroadcastAsExternalFeePayer(web3, transaction, signers)
  } else if (body.feePayerPrivateKey) {
    signers.push(web3.generateKeyPair(body.feePayerPrivateKey))
  }
  return {
    txId: await connection.sendTransaction(transaction, signers),
  }
}

const transferSplToken = async (
  body: TransferSolanaSpl,
  web3: SolanaWeb3,
  provider?: string,
  externalFeePayer = false,
) => {
  const connection = web3.getClient(provider)
  const from = new PublicKey(body.from)
  const feePayerKey = getFeePayer(externalFeePayer, from, body.feePayer)
  const transaction = new Transaction({ feePayer: feePayerKey })
  const mint = new PublicKey(body.contractAddress)
  const to = new PublicKey(body.to)

  const fromTokenAddress = await getAssociatedTokenAddress(mint, from)
  const toTokenAccountAddress = await getAssociatedTokenAddress(mint, to)
  try {
    await getAccount(connection, toTokenAccountAddress)
  } catch (e) {
    transaction.add(createAssociatedTokenAccountInstruction(toTokenAccountAddress, feePayerKey, to, mint))
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
  if (externalFeePayer) {
    return signAndBroadcastAsExternalFeePayer(web3, transaction, signers)
  } else if (body.feePayerPrivateKey) {
    signers.push(web3.generateKeyPair(body.feePayerPrivateKey))
  }
  return {
    txId: await connection.sendTransaction(transaction, signers),
  }
}

const createSplToken = async (
  body: CreateSolanaSpl,
  web3: SolanaWeb3,
  provider?: string,
  externalFeePayer = false,
) => {
  const connection = web3.getClient(provider)
  const from = new PublicKey(body.from)
  const freezeAuthorityKey = body.freezeAuthority ? new PublicKey(body.freezeAuthority) : from
  const feePayerKey = getFeePayer(externalFeePayer, from, body.feePayer)
  const transaction = new Transaction({ feePayer: feePayerKey })
  const lamports = await getMinimumBalanceForRentExemptMint(connection)

  const mint = Keypair.generate()
  transaction.add(
    SystemProgram.createAccount({
      fromPubkey: feePayerKey,
      newAccountPubkey: mint.publicKey,
      space: MINT_SIZE,
      lamports,
      programId: TOKEN_PROGRAM_ID,
    }),
    createInitializeMintInstruction(mint.publicKey, body.digits, from, freezeAuthorityKey, TOKEN_PROGRAM_ID),
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
      feePayerKey,
      new PublicKey(body.address),
      mint.publicKey,
    ),
    createMintToInstruction(
      mint.publicKey,
      userTokenAccountAddress,
      from,
      new BigNumber(body.supply).multipliedBy(10 ** body.digits).toNumber(),
      [],
      TOKEN_PROGRAM_ID,
    ),
  )
  if (body.signatureId) {
    transaction.recentBlockhash = '7WyEshBZcZwEbJsvSeGgCkSNMxxxFAym3x7Cuj6UjAUE'
    return { txData: transaction.compileMessage().serialize().toString('hex') }
  }

  const signers = [web3.generateKeyPair(body.fromPrivateKey), mint]
  if (externalFeePayer) {
    const response = await signAndBroadcastAsExternalFeePayer(web3, transaction, signers)
    return { ...response, contractAddress: mint.publicKey.toBase58() }
  } else if (body.feePayerPrivateKey) {
    signers.push(web3.generateKeyPair(body.feePayerPrivateKey))
  }
  return {
    txId: await connection.sendTransaction(transaction, signers),
    contractAddress: mint.publicKey.toBase58(),
  }
}

const burnNft = async (
  body: BurnSolanaNft,
  web3: SolanaWeb3,
  provider?: string,
  externalFeePayer = false,
) => {
  const connection = web3.getClient(provider)
  const from = new PublicKey(body.from)
  const feePayerKey = getFeePayer(externalFeePayer, from, body.feePayer)
  const transaction = new Transaction({ feePayer: feePayerKey })
  const instructions: TransactionInstruction[] = []

  const mintKey = new PublicKey(body.contractAddress)
  const metadataAccount = await findMetadataProgramAddress(mintKey)
  const masterEditionAccount = await findMetadataProgramAddress(mintKey, true)
  const collectionMetadataAccount = body.collection
    ? await findMetadataProgramAddress(new PublicKey(body.collection))
    : undefined
  const userTokenAccountAddress = (
    await PublicKey.findProgramAddress(
      [from.toBuffer(), TOKEN_PROGRAM_ID.toBuffer(), mintKey.toBuffer()],
      SPL_ASSOCIATED_TOKEN_ACCOUNT_PROGRAM_ID,
    )
  )[0]

  instructions.push(
    createBurnNftInstruction({
      collectionMetadata: collectionMetadataAccount,
      masterEditionAccount: masterEditionAccount,
      metadata: metadataAccount,
      mint: mintKey,
      owner: from,
      splTokenProgram: TOKEN_PROGRAM_ID,
      tokenAccount: userTokenAccountAddress,
    }),
  )
  transaction.add(...instructions)
  const signers = [web3.generateKeyPair(body.fromPrivateKey as string)]
  if (externalFeePayer) {
    return signAndBroadcastAsExternalFeePayer(web3, transaction, signers)
  } else if (body.feePayerPrivateKey) {
    signers.push(web3.generateKeyPair(body.feePayerPrivateKey))
  }
  return {
    txId: await connection.sendTransaction(transaction, signers),
  }
}

const mintNft = async (
  body: MintSolanaNft,
  web3: SolanaWeb3,
  provider?: string,
  externalFeePayer = false,
) => {
  const connection = web3.getClient(provider)
  const from = new PublicKey(body.from)
  const freezeAuthorityKey = body.freezeAuthority ? new PublicKey(body.freezeAuthority) : from
  const feePayerKey = getFeePayer(externalFeePayer, from, body.feePayer)
  const transaction = new Transaction({ feePayer: feePayerKey })
  const mintRent = await connection.getMinimumBalanceForRentExemption(MintLayout.span)
  const mint = Keypair.generate()
  const instructions = []
  instructions.push(
    SystemProgram.createAccount({
      fromPubkey: feePayerKey,
      newAccountPubkey: mint.publicKey,
      lamports: mintRent,
      space: MintLayout.span,
      programId: TOKEN_PROGRAM_ID,
    }),
    createInitializeMintInstruction(mint.publicKey, 0, from, freezeAuthorityKey, TOKEN_PROGRAM_ID),
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
      feePayerKey,
      new PublicKey(body.to),
      mint.publicKey,
    ),
  )

  const metadataAccount = await findMetadataProgramAddress(mint.publicKey)

  const collectionAccount = body.metadata.collection ? new PublicKey(body.metadata.collection) : null
  instructions.push(
    createMintToInstruction(mint.publicKey, userTokenAccountAddress, from, 1, [], TOKEN_PROGRAM_ID),
    createCreateMetadataAccountV3Instruction(
      {
        metadata: metadataAccount,
        mint: mint.publicKey,
        mintAuthority: from,
        updateAuthority: from,
        payer: feePayerKey,
      },
      {
        createMetadataAccountArgsV3: {
          data: {
            name: body.metadata.name,
            collection: collectionAccount ? { key: collectionAccount, verified: false } : null,
            creators:
              body.metadata.creators?.map((c) => ({
                address: new PublicKey(c.address),
                verified: c.address === body.from ? true : c.verified,
                share: c.share,
              })) || null,
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
      },
    ),
  )

  const editionAccount = await findMetadataProgramAddress(mint.publicKey, true)

  instructions.push(
    createCreateMasterEditionV3Instruction(
      {
        metadata: metadataAccount,
        edition: editionAccount,
        mint: mint.publicKey,
        mintAuthority: from,
        payer: feePayerKey,
        updateAuthority: from,
      },
      { createMasterEditionArgs: { maxSupply: 0 } },
    ),
  )

  if (collectionAccount && body.collectionVerifierPrivateKey) {
    const collectionMetadataAccount = await findMetadataProgramAddress(collectionAccount)
    const collectionMasterEditionAccount = await findMetadataProgramAddress(collectionAccount, true)

    instructions.push(
      createVerifySizedCollectionItemInstruction({
        metadata: metadataAccount,
        collectionAuthority: web3.generateKeyPair(body.collectionVerifierPrivateKey).publicKey,
        payer: feePayerKey,
        collectionMint: collectionAccount,
        collection: collectionMetadataAccount,
        collectionMasterEditionAccount,
      }),
    )
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
  if (body.collectionVerifierPrivateKey) {
    signers.push(web3.generateKeyPair(body.collectionVerifierPrivateKey))
  }
  if (externalFeePayer) {
    const response = await signAndBroadcastAsExternalFeePayer(web3, transaction, signers)
    return {
      ...response,
      nftAddress: mint.publicKey.toBase58(),
      nftAccountAddress: userTokenAccountAddress.toBase58(),
    }
  } else if (body.feePayerPrivateKey) {
    signers.push(web3.generateKeyPair(body.feePayerPrivateKey))
  }
  return {
    txId: await connection.sendTransaction(transaction, [wallet, ...signers]),
    nftAddress: mint.publicKey.toBase58(),
    nftAccountAddress: userTokenAccountAddress.toBase58(),
  }
}

const verifyNftInCollection = async (
  body: VerifySolanaNft,
  web3: SolanaWeb3,
  provider?: string,
  externalFeePayer = false,
) => {
  const connection = web3.getClient(provider)
  const nftMintKey = new PublicKey(body.nftAddress)
  const collectionAccount = new PublicKey(body.collectionAddress)
  const from = new PublicKey(body.from)
  const feePayerKey = getFeePayer(externalFeePayer, from, body.feePayer)
  const transaction = new Transaction({ feePayer: feePayerKey })
  const instructions = []

  const metadataAccount = await findMetadataProgramAddress(nftMintKey)
  const collectionMetadataAccount = await findMetadataProgramAddress(collectionAccount)
  const collectionMasterEditionAccount = await findMetadataProgramAddress(collectionAccount, true)

  instructions.push(
    createVerifySizedCollectionItemInstruction({
      metadata: metadataAccount,
      collectionAuthority: body.fromPrivateKey
        ? web3.generateKeyPair(body.fromPrivateKey).publicKey
        : feePayerKey,
      payer: feePayerKey,
      collectionMint: collectionAccount,
      collection: collectionMetadataAccount,
      collectionMasterEditionAccount,
    }),
  )
  transaction.add(...instructions)

  if (body.signatureId) {
    transaction.recentBlockhash = '7WyEshBZcZwEbJsvSeGgCkSNMxxxFAym3x7Cuj6UjAUE'
    return {
      txData: transaction.compileMessage().serialize().toString('hex'),
    }
  }

  const signers = [web3.generateKeyPair(body.fromPrivateKey)]
  if (externalFeePayer) {
    return signAndBroadcastAsExternalFeePayer(web3, transaction, signers)
  } else if (body.feePayerPrivateKey) {
    signers.push(web3.generateKeyPair(body.feePayerPrivateKey))
  }
  return {
    txId: await connection.sendTransaction(transaction, signers),
  }
}

const isUsingKms = <T extends { fromPrivateKey?: string; feePayerPrivateKey?: string; feePayer?: string }>(
  body: SolanaFromPrivateKeyOrSignatureId<T>,
) => {
  return body.signatureId && (!body.feePayer || body.feePayerSignatureId)
}

export const solanaTxService = (args: { web3: SolanaWeb3 }) => {
  return {
    // TODO - refactor to separate prepare/send func
    prepareOrSend: {
      /**
       * Transfer SOL from account to another account.
       * @param body body of the request
       * @param provider optional URL of the Solana cluster
       */
      send: async (body: TransferSolana, provider?: string) => send(body, args.web3, provider),
      /**
       * Transfer SPL token from account to another account.
       * @param body body of the request
       * @param provider optional URL of the Solana cluster
       */
      transferSplToken: async (body: TransferSolanaSpl, provider?: string) =>
        transferSplToken(body, args.web3, provider),
      /**
       * Create SPL token.
       * @param body body of the request
       * @param provider optional URL of the Solana cluster
       */
      createSplToken: async (body: CreateSolanaSpl, provider?: string) =>
        createSplToken(body, args.web3, provider),
      /**
       * Transfer NFT on Solana network.
       * @param body body of the request
       * @param provider optional URL of the Solana cluster
       */
      transferNft: async (body: TransferSolanaNft, provider?: string) =>
        transferNft(body, args.web3, provider),
      /**
       * Mint new NFT on Solana. Fee is being paid by the minter or feePayer, if present
       * @param body body of the request
       * @param provider optional URL of the Solana cluster
       */
      mintNft: async (body: MintSolanaNft, provider?: string) => mintNft(body, args.web3, provider),
      /**
       * Burn NFT on Solana. Fee is being paid by the minter or feePayer, if present
       * @param body body of the request
       * @param provider optional URL of the Solana cluster
       */
      burnNft: async (body: BurnSolanaNft, provider?: string) => burnNft(body, args.web3, provider),
      /**
       * Create new NFT Collection on Solana. Fee is being paid by the minter or feePayer, if present
       * @param body body of the request
       * @param provider optional URL of the Solana cluster
       */
      createCollection: async (body: CreateSolanaNftCollection, provider?: string) =>
        mintNft(body, args.web3, provider),
      /**
       * Verify NFT inside collection. Fee is being paid by feePayer.
       * @param body body of the request
       * @param provider optional URL of the Solana cluster
       */
      verifyNftInCollection: async (body: VerifySolanaNft, provider?: string) =>
        verifyNftInCollection(body, args.web3, provider),
    },
    send: {
      /**
       * Transfer SOL from account to another account.
       * @param body body of the request
       * @param provider optional URL of the Solana cluster
       * @param externalFeePayer if this is set to true, feePayer and feePayerPrivateKey are ignored and fee is paid externally using <a href="https://apidoc.tatum.io/tag/Custodial-managed-wallets#operation/CustodialTransferManagedAddress">https://apidoc.tatum.io/tag/Custodial-managed-wallets#operation/CustodialTransferManagedAddress</a>
       */
      send: async (body: TransferSolana, provider?: string, externalFeePayer = false) => {
        if (isUsingKms(body)) {
          return SolanaService.solanaBlockchainTransfer(body as TransferSolanaBlockchainKMS)
        }
        return send(body, args.web3, provider, externalFeePayer)
      },
      /**
       * Transfer SPL token from account to another account.
       * @param body body of the request
       * @param provider optional URL of the Solana cluster
       * @param externalFeePayer if this is set to true, feePayer and feePayerPrivateKey are ignored and fee is paid externally using <a href="https://apidoc.tatum.io/tag/Custodial-managed-wallets#operation/CustodialTransferManagedAddress">https://apidoc.tatum.io/tag/Custodial-managed-wallets#operation/CustodialTransferManagedAddress</a>
       */
      transferSplToken: async (body: TransferSolanaSpl, provider?: string, externalFeePayer = false) => {
        if (isUsingKms(body)) {
          return ApiServices.fungibleToken.erc20Transfer({
            ...body,
            chain: Blockchain.SOL,
          } as ChainTransferSolanaSplKMS)
        }
        return transferSplToken(body, args.web3, provider, externalFeePayer)
      },
      /**
       * Create SPL token.
       * @param body body of the request
       * @param provider optional URL of the Solana cluster
       * @param externalFeePayer if this is set to true, feePayer and feePayerPrivateKey are ignored and fee is paid externally using <a href="https://apidoc.tatum.io/tag/Custodial-managed-wallets#operation/CustodialTransferManagedAddress">https://apidoc.tatum.io/tag/Custodial-managed-wallets#operation/CustodialTransferManagedAddress</a>
       */
      createSplToken: async (body: CreateSolanaSpl, provider?: string, externalFeePayer = false) => {
        if (isUsingKms(body)) {
          return ApiServices.fungibleToken.erc20Deploy({
            ...body,
            chain: Blockchain.SOL,
          } as ChainDeploySolanaSplKMS)
        }

        return createSplToken(body, args.web3, provider, externalFeePayer)
      },
      /**
       * Transfer NFT on Solana network.
       * @param body body of the request
       * @param provider optional URL of the Solana cluster
       * @param externalFeePayer if this is set to true, feePayer and feePayerPrivateKey are ignored and fee is paid externally using <a href="https://apidoc.tatum.io/tag/Custodial-managed-wallets#operation/CustodialTransferManagedAddress">https://apidoc.tatum.io/tag/Custodial-managed-wallets#operation/CustodialTransferManagedAddress</a>
       */
      transferNft: async (body: TransferSolanaNft, provider?: string, externalFeePayer = false) => {
        if (isUsingKms(body)) {
          return ApiServices.nft.nftTransferErc721({
            ...body,
            chain: Blockchain.SOL,
          } as TransferNftSolanaKMS)
        }
        return transferNft(body, args.web3, provider, externalFeePayer)
      },
      /**
       * Mint new NFT on Solana. Fee is being paid by the minter or feePayer, if present
       * @param body body of the request
       * @param provider optional URL of the Solana cluster
       * @param externalFeePayer if this is set to true, feePayer and feePayerPrivateKey are ignored and fee is paid externally using <a href="https://apidoc.tatum.io/tag/Custodial-managed-wallets#operation/CustodialTransferManagedAddress">https://apidoc.tatum.io/tag/Custodial-managed-wallets#operation/CustodialTransferManagedAddress</a>
       */
      mintNft: async (body: MintSolanaNft, provider?: string, externalFeePayer = false) => {
        if (isUsingKms(body)) {
          return ApiServices.nft.nftMintErc721({
            ...body,
            chain: Blockchain.SOL,
          } as MintNftSolanaKMS)
        }

        return mintNft(body, args.web3, provider, externalFeePayer)
      },
      /**
       * Burn NFT on Solana. Fee is being paid by the minter or feePayer, if present
       * @param body body of the request
       * @param provider optional URL of the Solana cluster
       * @param externalFeePayer if this is set to true, feePayer and feePayerPrivateKey are ignored and fee is paid externally using <a href="https://apidoc.tatum.io/tag/Custodial-managed-wallets#operation/CustodialTransferManagedAddress">https://apidoc.tatum.io/tag/Custodial-managed-wallets#operation/CustodialTransferManagedAddress</a>
       */
      burnNft: async (body: BurnSolanaNft, provider?: string, externalFeePayer = false) => {
        if (isUsingKms(body)) {
          return ApiServices.nft.nftBurnErc721({
            ...body,
            chain: Blockchain.SOL,
          } as BurnNftSolanaKMS)
        }

        return burnNft(body, args.web3, provider, externalFeePayer)
      },
      /**
       * Create new NFT Collection on Solana. Fee is being paid by the minter or feePayer, if present
       * @param body body of the request
       * @param provider optional URL of the Solana cluster
       * @param externalFeePayer if this is set to true, feePayer and feePayerPrivateKey are ignored and fee is paid externally using <a href="https://apidoc.tatum.io/tag/Custodial-managed-wallets#operation/CustodialTransferManagedAddress">https://apidoc.tatum.io/tag/Custodial-managed-wallets#operation/CustodialTransferManagedAddress</a>
       */
      createCollection: async (
        body: CreateSolanaNftCollection,
        provider?: string,
        externalFeePayer = false,
      ) => {
        if (isUsingKms(body)) {
          return ApiServices.nft.nftMintErc721({
            ...body,
            chain: Blockchain.SOL,
          } as MintNftSolanaKMS)
        }

        return mintNft(body, args.web3, provider, externalFeePayer)
      },

      /**
       * Verify NFT inside collection. Fee is being paid by feePayer.
       * @param body body of the request
       * @param provider optional URL of the Solana cluster
       * @param externalFeePayer if this is set to true, feePayer and feePayerPrivateKey are ignored and fee is paid externally using <a href="https://apidoc.tatum.io/tag/Custodial-managed-wallets#operation/CustodialTransferManagedAddress">https://apidoc.tatum.io/tag/Custodial-managed-wallets#operation/CustodialTransferManagedAddress</a>
       */
      verifyNftInCollection: async (body: VerifySolanaNft, provider?: string, externalFeePayer = false) => {
        if (isUsingKms(body)) {
          return ApiServices.nft.nftVerifyInCollection({
            ...body,
            chain: Blockchain.SOL,
          } as VerifySolanaNFTKMS)
        }
        return verifyNftInCollection(body, args.web3, provider, externalFeePayer)
      },
    },
  }
}
