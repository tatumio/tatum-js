import { SolanaWeb3 } from './solana.web3'
import { ApiServices, ChainDeploySolanaSplKMS, ChainTransferSolanaSplKMS } from '@tatumio/api-client'
import { Blockchain } from '@tatumio/shared-core'
import { Keypair, PublicKey, sendAndConfirmTransaction, SystemProgram, Transaction } from '@solana/web3.js'
import {
  createInitializeMintInstruction,
  createMintToInstruction,
  createTransferInstruction,
  getAccount,
  getAssociatedTokenAddress,
  getMinimumBalanceForRentExemptMint,
  MINT_SIZE,
  TOKEN_PROGRAM_ID,
} from '@solana/spl-token'
import {
  createAssociatedTokenAccountInstruction,
  SPL_ASSOCIATED_TOKEN_ACCOUNT_PROGRAM_ID,
} from '../schema/instructions'
import BigNumber from 'bignumber.js'
import { CreateSolanaSpl, solanaUtils, TransferSolanaSpl } from './solana.utils'

const transferSignedTransaction = async (
  body: TransferSolanaSpl,
  web3: SolanaWeb3,
  provider?: string,
  externalFeePayer = false,
) => {
  const connection = web3.getClient(provider)
  const from = new PublicKey(body.from)
  const feePayerKey = solanaUtils.getFeePayer(externalFeePayer, from, body.feePayer)
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
      BigInt(new BigNumber(body.amount).multipliedBy(10 ** body.digits).toFixed()),
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
    return solanaUtils.signAndBroadcastAsExternalFeePayer(web3, transaction, signers)
  } else if (body.feePayerPrivateKey) {
    signers.push(web3.generateKeyPair(body.feePayerPrivateKey))
  }
  return {
    txId: await sendAndConfirmTransaction(connection, transaction, signers),
  }
}

const deploySignedTransaction = async (
  body: CreateSolanaSpl,
  web3: SolanaWeb3,
  provider?: string,
  externalFeePayer = false,
) => {
  const connection = web3.getClient(provider)
  const from = new PublicKey(body.from)
  const freezeAuthorityKey = body.freezeAuthority ? new PublicKey(body.freezeAuthority) : from
  const feePayerKey = solanaUtils.getFeePayer(externalFeePayer, from, body.feePayer)
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
      BigInt(new BigNumber(body.supply).multipliedBy(10 ** body.digits).toFixed()),
      [],
      TOKEN_PROGRAM_ID,
    ),
  )
  if (body.signatureId) {
    transaction.recentBlockhash = '7WyEshBZcZwEbJsvSeGgCkSNMxxxFAym3x7Cuj6UjAUE'
    return {
      txData: transaction.compileMessage().serialize().toString('hex'),
      mintPK: Buffer.from(mint.secretKey).toString('hex'),
    }
  }

  const signers = [web3.generateKeyPair(body.fromPrivateKey), mint]
  if (externalFeePayer) {
    const response = await solanaUtils.signAndBroadcastAsExternalFeePayer(web3, transaction, signers)
    return { ...response, contractAddress: mint.publicKey.toBase58() }
  } else if (body.feePayerPrivateKey) {
    signers.push(web3.generateKeyPair(body.feePayerPrivateKey))
  }
  return {
    txId: await sendAndConfirmTransaction(connection, transaction, signers),
    contractAddress: mint.publicKey.toBase58(),
  }
}

export const solanaSplService = (args: { web3: SolanaWeb3 }) => {
  return {
    // TODO - refactor to separate prepare/send func
    prepareOrSend: {
      /**
       * Transfer SPL token from account to another account.
       * @param body body of the request
       * @param provider optional URL of the Solana cluster
       */
      transferSignedTransaction: async (body: TransferSolanaSpl, provider?: string) =>
        transferSignedTransaction(body, args.web3, provider),
      /**
       * Create SPL token.
       * @param body body of the request
       * @param provider optional URL of the Solana cluster
       */
      deploySignedTransaction: async (body: CreateSolanaSpl, provider?: string) =>
        deploySignedTransaction(body, args.web3, provider),
    },
    send: {
      /**
       * Transfer SPL token from account to another account.
       * @param body body of the request
       * @param provider optional URL of the Solana cluster
       * @param externalFeePayer if this is set to true, feePayer and feePayerPrivateKey are ignored and fee is paid externally using <a href="https://apidoc.tatum.io/tag/Custodial-managed-wallets#operation/CustodialTransferManagedAddress">https://apidoc.tatum.io/tag/Custodial-managed-wallets#operation/CustodialTransferManagedAddress</a>
       */
      transferSignedTransaction: async (
        body: TransferSolanaSpl,
        provider?: string,
        externalFeePayer = false,
      ) => {
        if (solanaUtils.isUsingKms(body)) {
          return ApiServices.fungibleToken.erc20Transfer({
            ...body,
            chain: Blockchain.SOL,
          } as ChainTransferSolanaSplKMS)
        }
        return transferSignedTransaction(body, args.web3, provider, externalFeePayer)
      },
      /**
       * Create SPL token.
       * @param body body of the request
       * @param provider optional URL of the Solana cluster
       * @param externalFeePayer if this is set to true, feePayer and feePayerPrivateKey are ignored and fee is paid externally using <a href="https://apidoc.tatum.io/tag/Custodial-managed-wallets#operation/CustodialTransferManagedAddress">https://apidoc.tatum.io/tag/Custodial-managed-wallets#operation/CustodialTransferManagedAddress</a>
       */
      deploySignedTransaction: async (body: CreateSolanaSpl, provider?: string, externalFeePayer = false) => {
        if (solanaUtils.isUsingKms(body)) {
          return ApiServices.fungibleToken.erc20Deploy({
            ...body,
            chain: Blockchain.SOL,
          } as ChainDeploySolanaSplKMS)
        }

        return deploySignedTransaction(body, args.web3, provider, externalFeePayer)
      },
    },
  }
}
