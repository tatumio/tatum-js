import { SolanaWeb3 } from './solana.web3'
import {
  ApiServices,
  BurnNftSolanaKMS,
  MintNftSolanaKMS,
  TransferNftSolanaKMS,
  VerifySolanaNFTKMS,
} from '@tatumio/api-client'
import { Blockchain } from '@tatumio/shared-core'
import { Keypair, PublicKey, SystemProgram, Transaction, TransactionInstruction } from '@solana/web3.js'
import {
  createInitializeMintInstruction,
  createMintToInstruction,
  createTransferInstruction,
  getAssociatedTokenAddress,
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
import {
  BurnSolanaNft,
  CreateSolanaNftCollection,
  MintSolanaNft,
  solanaUtils,
  TransferSolanaNft,
  VerifySolanaNft,
} from './solana.utils'

const findMetadataProgramAddress = async (account: PublicKey, isEdition = false) => {
  const seeds = [Buffer.from('metadata'), TOKEN_METADATA_PROGRAM_ID.toBuffer(), account.toBuffer()]
  if (isEdition) {
    seeds.push(Buffer.from('edition'))
  }
  return (await PublicKey.findProgramAddress(seeds, TOKEN_METADATA_PROGRAM_ID))[0]
}

const transferSignedTransaction = async (
  body: TransferSolanaNft,
  web3: SolanaWeb3,
  provider?: string,
  externalFeePayer = false,
) => {
  const connection = web3.getClient(provider)
  const from = new PublicKey(body.from)
  const feePayerKey = solanaUtils.getFeePayer(externalFeePayer, from, body.feePayer)
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
    return solanaUtils.signAndBroadcastAsExternalFeePayer(web3, transaction, signers)
  } else if (body.feePayerPrivateKey) {
    signers.push(web3.generateKeyPair(body.feePayerPrivateKey))
  }
  return {
    txId: await connection.sendTransaction(transaction, signers),
  }
}

const mintSignedTransaction = async (
  body: MintSolanaNft,
  web3: SolanaWeb3,
  provider?: string,
  externalFeePayer = false,
) => {
  const connection = web3.getClient(provider)
  const from = new PublicKey(body.from)
  const feePayerKey = solanaUtils.getFeePayer(externalFeePayer, from, body.feePayer)
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
    createInitializeMintInstruction(mint.publicKey, 0, from, from, TOKEN_PROGRAM_ID),
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
    const response = await solanaUtils.signAndBroadcastAsExternalFeePayer(web3, transaction, signers)
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

const burnSignedTransaction = async (
  body: BurnSolanaNft,
  web3: SolanaWeb3,
  provider?: string,
  externalFeePayer = false,
) => {
  const connection = web3.getClient(provider)
  const from = new PublicKey(body.from)
  const feePayerKey = solanaUtils.getFeePayer(externalFeePayer, from, body.feePayer)
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

  if (body.signatureId) {
    transaction.recentBlockhash = '7WyEshBZcZwEbJsvSeGgCkSNMxxxFAym3x7Cuj6UjAUE'
    return { txData: transaction.compileMessage().serialize().toString('hex') }
  }

  const signers = [web3.generateKeyPair(body.fromPrivateKey as string)]
  if (externalFeePayer) {
    return solanaUtils.signAndBroadcastAsExternalFeePayer(web3, transaction, signers)
  } else if (body.feePayerPrivateKey) {
    signers.push(web3.generateKeyPair(body.feePayerPrivateKey))
  }
  return {
    txId: await connection.sendTransaction(transaction, signers),
  }
}

const verifySignedTransaction = async (
  body: VerifySolanaNft,
  web3: SolanaWeb3,
  provider?: string,
  externalFeePayer = false,
) => {
  const connection = web3.getClient(provider)
  const nftMintKey = new PublicKey(body.nftAddress)
  const collectionAccount = new PublicKey(body.collectionAddress)
  const from = new PublicKey(body.from)
  const feePayerKey = solanaUtils.getFeePayer(externalFeePayer, from, body.feePayer)
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
    return solanaUtils.signAndBroadcastAsExternalFeePayer(web3, transaction, signers)
  } else if (body.feePayerPrivateKey) {
    signers.push(web3.generateKeyPair(body.feePayerPrivateKey))
  }
  return {
    txId: await connection.sendTransaction(transaction, signers),
  }
}

export const solanaNftService = (args: { web3: SolanaWeb3 }) => {
  return {
    // TODO - refactor to separate prepare/send func
    prepareOrSend: {
      /**
       * Transfer NFT on Solana network.
       * @param body body of the request
       * @param provider optional URL of the Solana cluster
       */
      transferSignedTransaction: async (body: TransferSolanaNft, provider?: string) =>
        transferSignedTransaction(body, args.web3, provider),
      /**
       * Mint new NFT on Solana. Fee is being paid by the minter or feePayer, if present
       * @param body body of the request
       * @param provider optional URL of the Solana cluster
       */
      mintSignedTransaction: async (body: MintSolanaNft, provider?: string) =>
        mintSignedTransaction(body, args.web3, provider),
      /**
       * Burn NFT on Solana. Fee is being paid by the minter or feePayer, if present
       * @param body body of the request
       * @param provider optional URL of the Solana cluster
       */
      burnSignedTransaction: async (body: BurnSolanaNft, provider?: string) =>
        burnSignedTransaction(body, args.web3, provider),
      /**
       * Create new NFT Collection on Solana. Fee is being paid by the minter or feePayer, if present
       * @param body body of the request
       * @param provider optional URL of the Solana cluster
       */
      mintCollectionSignedTransaction: async (body: CreateSolanaNftCollection, provider?: string) =>
        mintSignedTransaction(body, args.web3, provider),
      /**
       * Verify NFT inside collection. Fee is being paid by feePayer.
       * @param body body of the request
       * @param provider optional URL of the Solana cluster
       */
      verifySignedTransaction: async (body: VerifySolanaNft, provider?: string) =>
        verifySignedTransaction(body, args.web3, provider),
    },
    send: {
      /**
       * Transfer NFT on Solana network.
       * @param body body of the request
       * @param provider optional URL of the Solana cluster
       * @param externalFeePayer if this is set to true, feePayer and feePayerPrivateKey are ignored and fee is paid externally using <a href="https://apidoc.tatum.io/tag/Custodial-managed-wallets#operation/CustodialTransferManagedAddress">https://apidoc.tatum.io/tag/Custodial-managed-wallets#operation/CustodialTransferManagedAddress</a>
       */
      transferSignedTransaction: async (
        body: TransferSolanaNft,
        provider?: string,
        externalFeePayer = false,
      ) => {
        if (solanaUtils.isUsingKms(body)) {
          return ApiServices.nft.nftTransferErc721({
            ...body,
            chain: Blockchain.SOL,
          } as TransferNftSolanaKMS)
        }
        return transferSignedTransaction(body, args.web3, provider, externalFeePayer)
      },
      /**
       * Mint new NFT on Solana. Fee is being paid by the minter or feePayer, if present
       * @param body body of the request
       * @param provider optional URL of the Solana cluster
       * @param externalFeePayer if this is set to true, feePayer and feePayerPrivateKey are ignored and fee is paid externally using <a href="https://apidoc.tatum.io/tag/Custodial-managed-wallets#operation/CustodialTransferManagedAddress">https://apidoc.tatum.io/tag/Custodial-managed-wallets#operation/CustodialTransferManagedAddress</a>
       */
      mintSignedTransaction: async (body: MintSolanaNft, provider?: string, externalFeePayer = false) => {
        if (solanaUtils.isUsingKms(body)) {
          return ApiServices.nft.nftMintErc721({
            ...body,
            chain: Blockchain.SOL,
          } as MintNftSolanaKMS)
        }

        return mintSignedTransaction(body, args.web3, provider, externalFeePayer)
      },
      /**
       * Burn NFT on Solana. Fee is being paid by the minter or feePayer, if present
       * @param body body of the request
       * @param provider optional URL of the Solana cluster
       * @param externalFeePayer if this is set to true, feePayer and feePayerPrivateKey are ignored and fee is paid externally using <a href="https://apidoc.tatum.io/tag/Custodial-managed-wallets#operation/CustodialTransferManagedAddress">https://apidoc.tatum.io/tag/Custodial-managed-wallets#operation/CustodialTransferManagedAddress</a>
       */
      burnSignedTransaction: async (body: BurnSolanaNft, provider?: string, externalFeePayer = false) => {
        if (solanaUtils.isUsingKms(body)) {
          return ApiServices.nft.nftBurnErc721({
            ...body,
            chain: Blockchain.SOL,
          } as BurnNftSolanaKMS)
        }

        return burnSignedTransaction(body, args.web3, provider, externalFeePayer)
      },
      /**
       * Create new NFT Collection on Solana. Fee is being paid by the minter or feePayer, if present
       * @param body body of the request
       * @param provider optional URL of the Solana cluster
       * @param externalFeePayer if this is set to true, feePayer and feePayerPrivateKey are ignored and fee is paid externally using <a href="https://apidoc.tatum.io/tag/Custodial-managed-wallets#operation/CustodialTransferManagedAddress">https://apidoc.tatum.io/tag/Custodial-managed-wallets#operation/CustodialTransferManagedAddress</a>
       */
      mintCollectionSignedTransaction: async (
        body: CreateSolanaNftCollection,
        provider?: string,
        externalFeePayer = false,
      ) => {
        if (solanaUtils.isUsingKms(body)) {
          return ApiServices.nft.nftMintErc721({
            ...body,
            chain: Blockchain.SOL,
          } as MintNftSolanaKMS)
        }

        return mintSignedTransaction(body, args.web3, provider, externalFeePayer)
      },

      /**
       * Verify NFT inside collection. Fee is being paid by feePayer.
       * @param body body of the request
       * @param provider optional URL of the Solana cluster
       * @param externalFeePayer if this is set to true, feePayer and feePayerPrivateKey are ignored and fee is paid externally using <a href="https://apidoc.tatum.io/tag/Custodial-managed-wallets#operation/CustodialTransferManagedAddress">https://apidoc.tatum.io/tag/Custodial-managed-wallets#operation/CustodialTransferManagedAddress</a>
       */
      verifySignedTransaction: async (body: VerifySolanaNft, provider?: string, externalFeePayer = false) => {
        if (solanaUtils.isUsingKms(body)) {
          return ApiServices.nft.nftVerifyInCollection({
            ...body,
            chain: Blockchain.SOL,
          } as VerifySolanaNFTKMS)
        }
        return verifySignedTransaction(body, args.web3, provider, externalFeePayer)
      },
    },
  }
}
