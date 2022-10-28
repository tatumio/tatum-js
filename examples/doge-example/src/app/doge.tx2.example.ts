import { TatumDogeSDK } from '@tatumio/doge'
import { TransactionHash } from '@tatumio/api-client'

/**
 * @deprecated Replace it with API key from https://tatum.io/
 */
export const REPLACE_ME_WITH_TATUM_API_KEY = process.env['TATUM_API_KEY'] as string
/**
 * @deprecated Generate mnemonic for test from
 * curl --location --request GET 'https://api-eu1.tatum.io/v3/bitcoin/wallet'
 * and place mnemonic value
 */
export const REPLACE_ME_WITH_MNEMONIC = process.env['MNEMONIC'] as string

const dogeSDK = TatumDogeSDK({ apiKey: REPLACE_ME_WITH_TATUM_API_KEY })
const REPLACE_ME = undefined

export async function dogeTransaction2Example() {
  console.log('Running DOGE transaction example')

  const mnemonicToUse = REPLACE_ME_WITH_MNEMONIC
  if (valueNotFilled(mnemonicToUse, 'mnemonic')) return

  const options = { testnet: true }

  // Generate new wallet
  // https://apidoc.tatum.io/tag/Dogecoin#operation/DogeGenerateWallet
  const { mnemonic, xpub } = await dogeSDK.wallet.generateWallet(mnemonicToUse, options)
  console.log('Your mnemonic: ', mnemonic)
  console.log('Your xpub: ', xpub)

  // Generate addresses by derivation indexes from xpub.
  // We will send from 0-index address to 1-index
  // https://apidoc.tatum.io/tag/Dogecoin#operation/DogeGenerateAddress
  const address0 = dogeSDK.wallet.generateAddressFromXPub(xpub, 0, options)
  const address1 = dogeSDK.wallet.generateAddressFromXPub(xpub, 1, options)
  console.log('Your 0-index address: ', address0)

  // Generate private keys by derivation indexes from mnemonic
  // https://apidoc.tatum.io/tag/Dogecoin#operation/DogeGenerateAddressPrivateKey
  const privateKey0 = await dogeSDK.wallet.generatePrivateKeyFromMnemonic(mnemonic, 0, options)
  const privateKey1 = await dogeSDK.wallet.generatePrivateKeyFromMnemonic(mnemonic, 1, options)

  // FUND YOUR ADDRESS WITH DOGE FROM https://testnet-faucet.com/doge-testnet/
  console.log(`Please fund address ${address0} from https://testnet-faucet.com/doge-testnet/`)

  // FIND YOUR TX IN EXPLORER BY ADDRESS LINK. Fill tx id and output index to code to proceed
  console.log(
    `Find faucet tx id by link, most likely it waits for confirmation: https://blockexplorer.one/dogecoin/testnet/address/${address0}/unconfirmed`,
  )

  const txIdFromFaucet = REPLACE_ME
  if (valueNotFilled(txIdFromFaucet, 'txIdFromFaucet')) return

  // Find corresponding vout from faucet transaction data
  const faucetTx = await dogeSDK.blockchain.getTransaction(txIdFromFaucet)
  const foundOutput = faucetTx.vout.find((voutEntry) => {
    return voutEntry.scriptPubKey.addresses.includes(address0)
  })
  if (valueNotFilled(txIdFromFaucet, 'txIdFromFaucet')) return

  // Send transaction
  // https://apidoc.tatum.io/tag/Dogecoin#operation/DogeTransferBlockchain
  const sentTxHash = (await dogeSDK.blockchain.sendTransaction({
    fromUTXO: [
      {
        txHash: faucetTx.hash,
        index: foundOutput.n,
        privateKey: privateKey0,
        address: address0,
        value: foundOutput.value.toFixed(8),
      },
    ],
    to: [
      {
        address: address1,
        value: 1,
      },
    ],
    fee: '0.1',
    changeAddress: address0,
  })) as TransactionHash

  console.log(
    `Transaction sent. Will be available soon at: https://blockexplorer.one/dogecoin/testnet/tx/${sentTxHash.txId}`,
  )
}

export function valueNotFilled(value: unknown, fieldName: string) {
  if (value === undefined) {
    console.error(`Please replace field '${fieldName}' with correct value. See code`)
    return true
  }
  return false
}
