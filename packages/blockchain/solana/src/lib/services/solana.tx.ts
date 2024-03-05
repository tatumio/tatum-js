import { LAMPORTS_PER_SOL, PublicKey, SystemProgram, Transaction } from '@solana/web3.js'
import { SolanaService, TransferSolanaBlockchainKMS } from '@tatumio/api-client'
import { SolanaWeb3 } from './solana.web3'
import BigNumber from 'bignumber.js'
import { SdkError, SdkErrorCode } from '@tatumio/shared-abstract-sdk'
import { solanaUtils, TransferSolana } from './solana.utils'
import { solanaSplService } from './solana.spl'
import { solanaNftService } from './solana.nft'
import { solanaMarketPlaceService } from '@tatumio/solana'

const transferSignedTransaction = async (
  body: TransferSolana,
  web3: SolanaWeb3,
  provider?: string,
  externalFeePayer = false,
): Promise<{ txData: string } | { txId: string }> => {
  const connection = web3.getClient(provider)
  const from = new PublicKey(body.from)
  const feePayerKey = solanaUtils.getFeePayer(externalFeePayer, from, body.feePayer)

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
      lamports: BigInt(new BigNumber(body.amount).multipliedBy(LAMPORTS_PER_SOL).toFixed()),
    }),
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

  return await solanaUtils.sendTransactionWithConfirm(connection, transaction, signers)
}

export const solanaTxService = (args: { web3: SolanaWeb3 }) => {
  return {
    spl: solanaSplService(args),
    nft: solanaNftService(args),
    marketplace: solanaMarketPlaceService(args),
    native: {
      // TODO - refactor to separate prepare/send func
      prepareOrSend: {
        /**
         * Transfer SOL from account to another account.
         * @param body body of the request
         * @param provider optional URL of the Solana cluster
         */
        transferSignedTransaction: async (body: TransferSolana, provider?: string) =>
          transferSignedTransaction(body, args.web3, provider),
      },
      send: {
        /**
         * Transfer SOL from account to another account.
         * @param body body of the request
         * @param provider optional URL of the Solana cluster
         * @param externalFeePayer if this is set to true, feePayer and feePayerPrivateKey are ignored and fee is paid externally using <a href="https://apidoc.tatum.io/tag/Custodial-managed-wallets#operation/CustodialTransferManagedAddress">https://apidoc.tatum.io/tag/Custodial-managed-wallets#operation/CustodialTransferManagedAddress</a>
         */
        transferSignedTransaction: async (
          body: TransferSolana,
          provider?: string,
          externalFeePayer = false,
        ) => {
          if (solanaUtils.isUsingKms(body)) {
            return SolanaService.solanaBlockchainTransfer(body as TransferSolanaBlockchainKMS)
          }
          return transferSignedTransaction(body, args.web3, provider, externalFeePayer)
        },
      },
    },
  }
}
