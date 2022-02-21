import { TatumAlgoSDK } from '@tatumio/algo'
import { DeployNftKMS } from '@tatumio/api-client'
import { REPLACE_ME_WITH_TATUM_API_KEY } from '@tatumio/shared-testing-common'

const algoSDK = TatumAlgoSDK({ apiKey: REPLACE_ME_WITH_TATUM_API_KEY })

export async function algoTxWithPrivateKeyExample(): Promise<void> {
  const preparedDeployTrc10Transaction = await algoSDK.transaction.prepare.signedTransaction({
    amount: '10',
    privateKey:
      '72TCV5BRQPBMSAFPYO3CPWVDBYWNGAYNMTW5QHENOMQF7I6QLNMJWCJZ7A3V5YKD7QD6ZZPEHG2PV2ZVVEDDO6BCRGXWIL3DIUMSUCI',
    address: 'TYMwiDu22V6XG3yk6W9cTVBz48okKLRczh',
    account: 'TCrmdJmvDUPy8qSTgoVStF51yWm6VUh5yQ',
  })

  const sentDeployTrc10Transaction = await algoSDK.transaction.send.signedTransaction({
    amount: '10',
    privateKey:
      '72TCV5BRQPBMSAFPYO3CPWVDBYWNGAYNMTW5QHENOMQF7I6QLNMJWCJZ7A3V5YKD7QD6ZZPEHG2PV2ZVVEDDO6BCRGXWIL3DIUMSUCI',
    address: 'TYMwiDu22V6XG3yk6W9cTVBz48okKLRczh',
    account: 'TCrmdJmvDUPy8qSTgoVStF51yWm6VUh5yQ',
  })

  const preparedDeployNFTTransaction = await algoSDK.erc721.prepare.createNFTSignedTransaction({
    fromPrivateKey:
      '72TCV5BRQPBMSAFPYO3CPWVDBYWNGAYNMTW5QHENOMQF7I6QLNMJWCJZ7A3V5YKD7QD6ZZPEHG2PV2ZVVEDDO6BCRGXWIL3DIUMSUCI',
    name: 'SomeArt',
    symbol: 'ERC_SYMBOL',
    url: 'google.com',
  })

  const sentDeployNFTTransaction = await algoSDK.erc721.send.createNFTSignedTransaction({
    fromPrivateKey:
      '72TCV5BRQPBMSAFPYO3CPWVDBYWNGAYNMTW5QHENOMQF7I6QLNMJWCJZ7A3V5YKD7QD6ZZPEHG2PV2ZVVEDDO6BCRGXWIL3DIUMSUCI',
    name: 'SomeArt',
    symbol: 'ERC_SYMBOL',
    url: 'google.com',
  })

  const preparedTransferSignedTransaction = await algoSDK.erc721.prepare.transferNFTSignedTransaction({
    fromPrivateKey:
      '72TCV5BRQPBMSAFPYO3CPWVDBYWNGAYNMTW5QHENOMQF7I6QLNMJWCJZ7A3V5YKD7QD6ZZPEHG2PV2ZVVEDDO6BCRGXWIL3DIUMSUCI',
    contractAddress: '0x687422eEA2cB73B5d3e242bA5456b782919AFc85',
    to: 'TYMwiDu22V6XG3yk6W9cTVBz48okKLRczh',
    tokenId: '453453',
  })

  const sentTransferSignedTransaction = await algoSDK.erc721.send.transferNFTSignedTransaction({
    fromPrivateKey:
      '72TCV5BRQPBMSAFPYO3CPWVDBYWNGAYNMTW5QHENOMQF7I6QLNMJWCJZ7A3V5YKD7QD6ZZPEHG2PV2ZVVEDDO6BCRGXWIL3DIUMSUCI',
    contractAddress: '0x687422eEA2cB73B5d3e242bA5456b782919AFc85',
    to: 'TYMwiDu22V6XG3yk6W9cTVBz48okKLRczh',
    tokenId: '453453',
  })

  const preparedMintSignedTransaction = await algoSDK.erc721.prepare.burnNFTSignedTransaction({
    fromPrivateKey:
      '72TCV5BRQPBMSAFPYO3CPWVDBYWNGAYNMTW5QHENOMQF7I6QLNMJWCJZ7A3V5YKD7QD6ZZPEHG2PV2ZVVEDDO6BCRGXWIL3DIUMSUCI',
    contractAddress: '0x687422eEA2cB73B5d3e242bA5456b782919AFc85',
    tokenId: '453453',
  })

  const sentMintSignedTransaction = await algoSDK.erc721.send.burnNFTSignedTransaction({
    fromPrivateKey:
      '72TCV5BRQPBMSAFPYO3CPWVDBYWNGAYNMTW5QHENOMQF7I6QLNMJWCJZ7A3V5YKD7QD6ZZPEHG2PV2ZVVEDDO6BCRGXWIL3DIUMSUCI',
    contractAddress: '0x687422eEA2cB73B5d3e242bA5456b782919AFc85',
    tokenId: '453453',
  })
}

export async function algoTxWithSignatureIdExample(): Promise<void> {
  const preparedDeployTrc10Transaction = await algoSDK.transaction.prepare.signedTransaction({
    amount: '10',
    address: 'TYMwiDu22V6XG3yk6W9cTVBz48okKLRczh',
    account: 'TCrmdJmvDUPy8qSTgoVStF51yWm6VUh5yQ',
    signatureId: '26d3883e-4e17-48b3-a0ee-09a3e484ac83',
    from: '687422eEA2cB73B5d3e242bA5456b782919AFc85',
  })

  const sentDeployTrc10Transaction = await algoSDK.transaction.send.signedTransaction({
    amount: '10',
    signatureId: '26d3883e-4e17-48b3-a0ee-09a3e484ac83',
    address: 'TYMwiDu22V6XG3yk6W9cTVBz48okKLRczh',
    account: 'TCrmdJmvDUPy8qSTgoVStF51yWm6VUh5yQ',
    from: '687422eEA2cB73B5d3e242bA5456b782919AFc85',
  })

  const preparedDeployNFTTransaction = await algoSDK.erc721.prepare.createNFTSignedTransaction({
    signatureId: '26d3883e-4e17-48b3-a0ee-09a3e484ac83',
    from: '687422eEA2cB73B5d3e242bA5456b782919AFc85',
    name: 'SomeArt',
    symbol: 'ERC_SYMBOL',
    url: 'google.com',
  })

  const sentDeployNFTTransaction = await algoSDK.erc721.send.createNFTSignedTransaction({
    signatureId: '26d3883e-4e17-48b3-a0ee-09a3e484ac83',
    from: '687422eEA2cB73B5d3e242bA5456b782919AFc85',
    name: 'SomeArt',
    symbol: 'ERC_SYMBOL',
    url: 'google.com',
  })

  const preparedTransferSignedTransaction = await algoSDK.erc721.prepare.transferNFTSignedTransaction({
    signatureId: '26d3883e-4e17-48b3-a0ee-09a3e484ac83',
    from: '687422eEA2cB73B5d3e242bA5456b782919AFc85',
    contractAddress: '0x687422eEA2cB73B5d3e242bA5456b782919AFc85',
    to: 'TYMwiDu22V6XG3yk6W9cTVBz48okKLRczh',
    tokenId: '453453',
  })

  const sentTransferSignedTransaction = await algoSDK.erc721.send.transferNFTSignedTransaction({
    signatureId: '26d3883e-4e17-48b3-a0ee-09a3e484ac83',
    from: '687422eEA2cB73B5d3e242bA5456b782919AFc85',
    contractAddress: '0x687422eEA2cB73B5d3e242bA5456b782919AFc85',
    to: 'TYMwiDu22V6XG3yk6W9cTVBz48okKLRczh',
    tokenId: '453453',
  })

  const preparedMintSignedTransaction = await algoSDK.erc721.prepare.burnNFTSignedTransaction({
    signatureId: '26d3883e-4e17-48b3-a0ee-09a3e484ac83',
    from: '687422eEA2cB73B5d3e242bA5456b782919AFc85',
    contractAddress: '0x687422eEA2cB73B5d3e242bA5456b782919AFc85',
    tokenId: '453453',
  })

  const sentMintSignedTransaction = await algoSDK.erc721.send.burnNFTSignedTransaction({
    signatureId: '26d3883e-4e17-48b3-a0ee-09a3e484ac83',
    from: '687422eEA2cB73B5d3e242bA5456b782919AFc85',
    contractAddress: '0x687422eEA2cB73B5d3e242bA5456b782919AFc85',
    tokenId: '453453',
  })
}
