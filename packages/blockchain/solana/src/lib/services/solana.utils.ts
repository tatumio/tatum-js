import {
  BurnNftSolana,
  ChainDeploySolanaSpl,
  ChainTransferSolanaSpl,
  CustodialManagedWalletsService,
  MintNftSolana,
  SignatureId,
  TransferNftSolana,
  TransferSolanaBlockchain,
  VerifySolanaNFT,
} from '@tatumio/api-client'
import { SdkErrorCode, WithoutChain } from '@tatumio/shared-abstract-sdk'
import { FromPrivateKeyOrSignatureId } from '@tatumio/shared-blockchain-abstract'
import { Connection, PublicKey, Signer, Transaction } from '@solana/web3.js'
import { SolanaWeb3 } from './solana.web3'
import { SolanaSdkError } from '../solana.sdk.errors'
import BN from 'bn.js'
// @ts-ignore
import { encode } from 'base-58'
import _ from 'lodash'

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

export const FEE_PAYER = 'DSpHmb7hLnetoybammcJBJiyqMVR3pDhCuW6hqVg9eBF'

export const solanaUtils = {
  valueOrNull: <T>(value: T | undefined): T | null => {
    return _.isUndefined(value) ? null : value
  },
  valueOrThrow: <T>(value: T | undefined | null): T => {
    if (_.isNil(value)) {
      throw new Error('Value is null or undefined')
    }
    return value
  },
  toBase58: (bytes: string | Buffer | PublicKey | BN | number | number[]): string => {
    if (Buffer.isBuffer(bytes)) {
      return encode(bytes)
    } else if (typeof bytes === 'object' && 'toBase58' in bytes) {
      return bytes.toBase58()
    } else if (BN.isBN(bytes)) {
      return encode(bytes.toArray())
    } else {
      return encode(new BN(bytes, 'be').toArray())
    }
  },
  safeAwait: <T>(promise: Promise<T>) => {
    return promise
      .then((data) => {
        return { result: data, error: undefined }
      })
      .catch((error: Error) => {
        return { result: undefined, error: error }
      })
  },
  getFeePayer: (externalFeePayer: boolean, from: PublicKey, feePayer?: string) => {
    if (externalFeePayer) {
      return new PublicKey(FEE_PAYER)
    }
    return feePayer ? new PublicKey(feePayer) : from
  },
  isUsingKms: <T extends { fromPrivateKey?: string; feePayerPrivateKey?: string; feePayer?: string }>(
    body: SolanaFromPrivateKeyOrSignatureId<T>,
  ) => {
    if (body.signatureId && body.feePayerPrivateKey) {
      throw new SolanaSdkError({ code: SdkErrorCode.SOLANA_KMS_COMBINATION })
    }

    if (body.fromPrivateKey && body.feePayerSignatureId) {
      throw new SolanaSdkError({ code: SdkErrorCode.SOLANA_KMS_COMBINATION })
    }

    return body.signatureId
  },
  signAndBroadcastAsExternalFeePayer: async (
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
  },
  sendTransactionWithConfirm: async (connection: Connection, transaction: Transaction, signers: Signer[]) => {
    const attempts = 11
    const txId = await connection.sendTransaction(transaction, signers)
    let confirmedTx
    for (let attempt = 1; attempt <= attempts; attempt++) {
      confirmedTx = await connection.getTransaction(txId, { commitment: 'confirmed' })
      if (confirmedTx && !confirmedTx.meta?.err) {
        return { txId }
      }
      await new Promise((r) => setTimeout(r, attempt * 1000))
    }

    if (confirmedTx && confirmedTx.meta?.err) {
      throw new Error(`Transaction ${txId} failed with error: ${confirmedTx.meta?.err}`)
    }

    throw new Error(
      `Transaction ${txId} not confirmed after ${attempts} attempts, please check the status of the transaction or try again.`,
    )
  },
}
