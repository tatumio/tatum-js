import { TatumFlowSDK } from '@tatumio/flow'
import { REPLACE_ME_WITH_TATUM_API_KEY } from '@tatumio/shared-testing'

const flowSDK = TatumFlowSDK({ apiKey: REPLACE_ME_WITH_TATUM_API_KEY })

export const flowTxExample = async () => {
  const { txId } = await flowSDK.transaction.sendTransaction(true, {
    account: 'GBRPYHIL2CI3FNQ4BXLFMNDLFJUNPU2HY3ZMFSHONUCEOASW7QC7OX2H',
    amount: '10000',
    to: 'GBRPYHIL2CI3FNQ4BXLFMNDLFJUNPU2HY3ZMFSHONUCEOASW7QC7OX2H',
    currency: 'FLOW',
  })

  await flowSDK.transaction.sendCustomTransaction(true, {
    transaction: '3b4351560d3b454a4c1ae2485074b0786093058bfe2b28d436584311b1e433a4',
    args: [{ value: '', type: '' }],
    account: 'GBRPYHIL2CI3FNQ4BXLFMNDLFJUNPU2HY3ZMFSHONUCEOASW7QC7OX2H',
  })

  const signed = flowSDK.transaction.sign(
    'cTmS2jBWXgFaXZ2xG9jhn67TiyTshnMp3UedamzEhGm6BZV1vLgQ',
    Buffer.from('some message'),
  )

  const signer = flowSDK.transaction.getSigner(
    'cTmS2jBWXgFaXZ2xG9jhn67TiyTshnMp3UedamzEhGm6BZV1vLgQ',
    'GBRPYHIL2CI3FNQ4BXLFMNDLFJUNPU2HY3ZMFSHONUCEOASW7QC7OX2H',
  )

  const apiSigner = flowSDK.transaction.getApiSigner(true)

  const tx = await flowSDK.transaction.createAccountFromPublicKey(
    true,
    '968c3ce11e871cb2b7161b282655ee5fcb051f3c04894705d771bf11c6fbebfc6556ab8a0c04f45ea56281312336d0668529077c9d66891a6cad3db877acbe90',
    '0x955cd3f17b2fd8ad',
    'cTmS2jBWXgFaXZ2xG9jhn67TiyTshnMp3UedamzEhGm6BZV1vLgQ',
  )

  const tx2 = await flowSDK.transaction.addPublicKeyToAccount(
    true,
    '968c3ce11e871cb2b7161b282655ee5fcb051f3c04894705d771bf11c6fbebfc6556ab8a0c04f45ea56281312336d0668529077c9d66891a6cad3db877acbe90',
    '0x955cd3f17b2fd8ad',
    'cTmS2jBWXgFaXZ2xG9jhn67TiyTshnMp3UedamzEhGm6BZV1vLgQ',
  )

  const tx3 = await flowSDK.transaction.getNftMetadata(false, '0x955cd3f17b2fd8ad', 'id', 'tokenType')

  const tx4 = flowSDK.transaction.getNftTokenByAddress(false, '0x955cd3f17b2fd8ad', 'tokenType')

  const tx5 = flowSDK.transaction.sendNftMintToken(false, {
    account: '0xc1b45bc27b9c61c3',
    to: '0xc1b45bc27b9c61c3',
    url: 'https://my_token_data.com',
    contractAddress: '17a50dad-bcb1-4f3d-ae2c-ea2bfb04419f',
  })

  const tx6 = flowSDK.transaction.sendNftMintMultipleToken(false, {
    account: '0xc1b45bc27b9c61c3',
    to: ['0xc1b45bc27b9c61c3', '0xc1b45bc27b9c61c4'],
    url: ['https://my_token_data.com', 'https://my_token_data2.com'],
    contractAddress: '17a50dad-bcb1-4f3d-ae2c-ea2bfb04419f',
  })

  const tx7 = flowSDK.transaction.sendNftTransferToken(false, {
    account: '0xc1b45bc27b9c61c3',
    contractAddress: '17a50dad-bcb1-4f3d-ae2c-ea2bfb04419f',
    to: '0xc1b45bc27b9c61c3',
    tokenId: '100000',
  })

  const tx8 = flowSDK.transaction.sendNftBurnToken(false, {
    account: '0xc1b45bc27b9c61c3',
    contractAddress: '17a50dad-bcb1-4f3d-ae2c-ea2bfb04419f',
    tokenId: '100000',
  })
}
