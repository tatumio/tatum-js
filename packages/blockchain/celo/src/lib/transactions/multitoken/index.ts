import { EvmBasedBlockchain } from '@tatumio/shared-core'
import BigNumber from 'bignumber.js'
import { Erc1155 } from '@tatumio/shared-blockchain-evm-based'
import { BroadcastFunction } from '@tatumio/shared-blockchain-abstract'
import { CeloWallet } from '@celo-tools/celo-ethers-wrapper'
import Web3 from 'web3'
import {
  celoUtils,
  ChainBurnMultiTokenBatchCelo,
  ChainBurnMultiTokenCelo,
  ChainDeployMultiTokenCelo,
  ChainMintMultiTokenCelo,
  ChainMintMultiTokenBatchCelo,
  ChainTransferMultiTokenBatchCelo,
  ChainTransferMultiTokenCelo,
  CeloTransactionConfig,
} from '../../utils/celo.utils'

const deployMultiTokenTransaction = async (
  body: ChainDeployMultiTokenCelo,
  provider?: string,
  testnet?: boolean,
) => {
  const { fromPrivateKey, uri, feeCurrency, nonce, signatureId } = body

  const celoProvider = celoUtils.getProvider(provider)
  const network = await celoProvider.ready
  const feeCurrencyContractAddress = celoUtils.getFeeCurrency(feeCurrency, testnet)

  const contract = new new Web3().eth.Contract(Erc1155.abi as any)
  const deploy = contract.deploy({
    data: Erc1155.bytecode,
    arguments: [uri],
  })

  if (signatureId) {
    return JSON.stringify({
      chainId: network.chainId,
      feeCurrency: feeCurrencyContractAddress,
      nonce,
      gasLimit: '0',
      data: deploy.encodeABI(),
    })
  }

  const wallet = new CeloWallet(fromPrivateKey as string, celoProvider)
  const { txCount, gasPrice, from } = await celoUtils.obtainWalletInformation(
    wallet,
    feeCurrencyContractAddress,
  )

  const tx: CeloTransactionConfig = {
    chainId: network.chainId,
    feeCurrency: feeCurrencyContractAddress,
    nonce: nonce || txCount,
    gasLimit: '0',
    gasPrice,
    data: deploy.encodeABI(),
    from,
  }

  return await celoUtils.prepareSignedTransactionAbstraction(wallet, tx)
}

const mintMultiTokenTransaction = async (
  body: ChainMintMultiTokenCelo,
  provider?: string,
  testnet?: boolean,
) => {
  const { fromPrivateKey, to, tokenId, contractAddress, feeCurrency, data, amount, nonce, signatureId } = body

  const celoProvider = celoUtils.getProvider(provider)
  const network = await celoProvider.ready

  if (contractAddress && feeCurrency) {
    const feeCurrencyContractAddress = celoUtils.getFeeCurrency(feeCurrency, testnet)
    const contract = new new Web3().eth.Contract(Erc1155.abi as any, contractAddress.trim())

    if (signatureId) {
      return JSON.stringify({
        chainId: network.chainId,
        feeCurrency: feeCurrencyContractAddress,
        nonce,
        to: contractAddress.trim(),
        gasLimit: '0',
        data: contract.methods
          .mint(to.trim(), tokenId, `0x${new BigNumber(amount).toString(16)}`, data ? data : '0x0')
          .encodeABI(),
      })
    }

    const wallet = new CeloWallet(fromPrivateKey as string, celoProvider)
    const { txCount, gasPrice, from } = await celoUtils.obtainWalletInformation(
      wallet,
      feeCurrencyContractAddress,
    )

    const tx: CeloTransactionConfig = {
      chainId: network.chainId,
      feeCurrency: feeCurrencyContractAddress,
      to: contractAddress.trim(),
      data: contract.methods
        .mint(to.trim(), tokenId, `0x${new BigNumber(amount).toString(16)}`, data ? data : '0x0')
        .encodeABI(),
      nonce: nonce || txCount,
      gasLimit: '0',
      gasPrice,
      from,
    }

    return await celoUtils.prepareSignedTransactionAbstraction(wallet, tx)
  }
  throw new Error('Contract address and fee currency should not be empty')
}

const mintMultiTokenBatchTransaction = async (
  body: ChainMintMultiTokenBatchCelo,
  provider?: string,
  testnet?: boolean,
) => {
  const { fromPrivateKey, to, tokenId, contractAddress, amounts, data, feeCurrency, nonce, signatureId } =
    body

  const celoProvider = celoUtils.getProvider(provider)
  const network = await celoProvider.ready
  const feeCurrencyContractAddress = celoUtils.getFeeCurrency(feeCurrency, testnet)
  const contract = new new Web3().eth.Contract(Erc1155.abi as any, contractAddress.trim())
  const amts = amounts.map((amts) => amts.map((amt) => `0x${new BigNumber(amt).toString(16)}`))

  if (signatureId) {
    return JSON.stringify({
      chainId: network.chainId,
      feeCurrency: feeCurrencyContractAddress,
      nonce,
      gasLimit: '0',
      to: contractAddress.trim(),
      data: contract.methods
        .mintBatch(
          to.map((t) => t.trim()),
          tokenId,
          amts,
          data ? data : '0x0',
        )
        .encodeABI(),
    })
  }

  const wallet = new CeloWallet(fromPrivateKey as string, celoProvider)
  const { txCount, gasPrice, from } = await celoUtils.obtainWalletInformation(
    wallet,
    feeCurrencyContractAddress,
  )

  const tx: CeloTransactionConfig = {
    chainId: network.chainId,
    feeCurrency: feeCurrencyContractAddress,
    nonce: nonce || txCount,
    gasLimit: '0',
    to: contractAddress.trim(),
    gasPrice,
    data: contract.methods
      .mintBatch(
        to.map((t) => t.trim()),
        tokenId,
        amts,
        data ? data : '0x0',
      )
      .encodeABI(),
    from,
  }

  return await celoUtils.prepareSignedTransactionAbstraction(wallet, tx)
}

const transferMultiTokenTransaction = async (
  body: ChainTransferMultiTokenCelo,
  provider?: string,
  testnet?: boolean,
) => {
  const { fromPrivateKey, to, tokenId, contractAddress, feeCurrency, nonce, amount, data, signatureId } = body

  const celoProvider = celoUtils.getProvider(provider)
  const network = await celoProvider.ready
  const feeCurrencyContractAddress = celoUtils.getFeeCurrency(feeCurrency, testnet)
  const contract = new new Web3().eth.Contract(Erc1155.abi as any, contractAddress.trim())

  if (signatureId) {
    return JSON.stringify({
      chainId: network.chainId,
      feeCurrency: feeCurrencyContractAddress,
      gasLimit: '0',
      nonce,
      to: contractAddress.trim(),
      data: contract.methods
        // TODO: remove ! when type will be fixed
        .safeTransfer(to.trim(), tokenId, `0x${new BigNumber(amount!).toString(16)}`, data ? data : '0x0')
        .encodeABI(),
    })
  }

  const wallet = new CeloWallet(fromPrivateKey as string, celoProvider)
  const { txCount, gasPrice, from } = await celoUtils.obtainWalletInformation(
    wallet,
    feeCurrencyContractAddress,
  )

  const tx: CeloTransactionConfig = {
    chainId: network.chainId,
    feeCurrency: feeCurrencyContractAddress,
    nonce: nonce || txCount,
    gasLimit: '0',
    to: contractAddress.trim(),
    gasPrice,
    data: contract.methods
      // TODO: remove ! when type will be fixed
      .safeTransfer(to.trim(), tokenId, `0x${new BigNumber(amount!).toString(16)}`, data ? data : '0x0')
      .encodeABI(),
    from,
  }
  return await celoUtils.prepareSignedTransactionAbstraction(wallet, tx)
}

const transferMultiTokenBatchTransaction = async (
  body: ChainTransferMultiTokenBatchCelo,
  provider?: string,
  testnet?: boolean,
) => {
  const { fromPrivateKey, to, tokenId, contractAddress, feeCurrency, nonce, amounts, data, signatureId } =
    body

  const celoProvider = celoUtils.getProvider(provider)
  const network = await celoProvider.ready
  const feeCurrencyContractAddress = celoUtils.getFeeCurrency(feeCurrency, testnet)
  const amts = amounts.map((amt) => `0x${new BigNumber(amt).toString(16)}`)
  const contract = new new Web3().eth.Contract(Erc1155.abi as any, contractAddress.trim())

  if (signatureId) {
    return JSON.stringify({
      chainId: network.chainId,
      feeCurrency: feeCurrencyContractAddress,
      gasLimit: '0',
      nonce,
      to: contractAddress.trim(),
      data: contract.methods
        .safeBatchTransfer(
          to.trim(),
          tokenId.map((token) => token.trim()),
          amts,
          data ? data : '0x0',
        )
        .encodeABI(),
    })
  }

  const wallet = new CeloWallet(fromPrivateKey as string, celoProvider)
  const { txCount, gasPrice, from } = await celoUtils.obtainWalletInformation(
    wallet,
    feeCurrencyContractAddress,
  )

  const tx: CeloTransactionConfig = {
    chainId: network.chainId,
    feeCurrency: feeCurrencyContractAddress,
    nonce: nonce || txCount,
    gasLimit: '0',
    to: contractAddress.trim(),
    gasPrice,
    data: contract.methods
      .safeBatchTransfer(
        to.trim(),
        tokenId.map((token) => token.trim()),
        amts,
        data ? data : '0x0',
      )
      .encodeABI(),
    from,
  }
  return await celoUtils.prepareSignedTransactionAbstraction(wallet, tx)
}

const burnMultiTokenTransaction = async (
  body: ChainBurnMultiTokenCelo,
  provider?: string,
  testnet?: boolean,
) => {
  const { fromPrivateKey, tokenId, account, amount, contractAddress, feeCurrency, nonce, signatureId } = body

  const celoProvider = celoUtils.getProvider(provider)
  const network = await celoProvider.ready
  const feeCurrencyContractAddress = celoUtils.getFeeCurrency(feeCurrency, testnet)
  const contract = new new Web3().eth.Contract(Erc1155.abi as any, contractAddress.trim())

  if (signatureId) {
    return JSON.stringify({
      chainId: network.chainId,
      feeCurrency: feeCurrencyContractAddress,
      nonce,
      gasLimit: '0',
      to: contractAddress.trim(),
      data: contract.methods.burn(account, tokenId, amount).encodeABI(),
    })
  }

  const wallet = new CeloWallet(fromPrivateKey as string, celoProvider)
  const { txCount, gasPrice, from } = await celoUtils.obtainWalletInformation(
    wallet,
    feeCurrencyContractAddress,
  )

  const tx: CeloTransactionConfig = {
    chainId: network.chainId,
    feeCurrency: feeCurrencyContractAddress,
    nonce: nonce || txCount,
    gasLimit: '0',
    to: contractAddress.trim(),
    gasPrice,
    data: contract.methods.burn(account, tokenId, amount).encodeABI(),
    from,
  }
  return await celoUtils.prepareSignedTransactionAbstraction(wallet, tx)
}

const burnMultiTokenBatchTransaction = async (
  body: ChainBurnMultiTokenBatchCelo,
  provider?: string,
  testnet?: boolean,
) => {
  const { fromPrivateKey, tokenId, account, amounts, contractAddress, feeCurrency, nonce, signatureId } = body

  const celoProvider = celoUtils.getProvider(provider)
  const network = await celoProvider.ready
  const feeCurrencyContractAddress = celoUtils.getFeeCurrency(feeCurrency, testnet)
  const contract = new new Web3().eth.Contract(Erc1155.abi as any, contractAddress.trim())

  if (signatureId) {
    return JSON.stringify({
      chainId: network.chainId,
      feeCurrency: feeCurrencyContractAddress,
      nonce,
      gasLimit: '0',
      to: contractAddress.trim(),
      data: contract.methods.burnBatch(account, tokenId, amounts).encodeABI(),
    })
  }

  const wallet = new CeloWallet(fromPrivateKey as string, celoProvider)
  const { txCount, gasPrice, from } = await celoUtils.obtainWalletInformation(
    wallet,
    feeCurrencyContractAddress,
  )

  const tx: CeloTransactionConfig = {
    chainId: network.chainId,
    feeCurrency: feeCurrencyContractAddress,
    nonce: nonce || txCount,
    gasLimit: '0',
    to: contractAddress.trim(),
    gasPrice,
    data: contract.methods.burnBatch(account, tokenId, amounts).encodeABI(),
    from,
  }
  return await celoUtils.prepareSignedTransactionAbstraction(wallet, tx)
}

export const multiToken = (args: {
  blockchain: EvmBasedBlockchain
  broadcastFunction: BroadcastFunction
}) => {
  return {
    prepare: {
      /**
       * Prepare a signed Celo mint multiple tokens transaction with the private key locally. Nothing is broadcasted to the blockchain.
       * @returns raw transaction data in hex, to be broadcasted to blockchain.
       */
      mintMultiTokenTransaction: async (
        body: ChainMintMultiTokenCelo,
        provider?: string,
        testnet?: boolean,
      ) => mintMultiTokenTransaction(body, provider, testnet),
      /**
       * Prepare a signed Celo mint multiple tokens batch transaction with the private key locally. Nothing is broadcasted to the blockchain.
       * @returns raw transaction data in hex, to be broadcasted to blockchain.
       */
      mintMultiTokenBatchTransaction: async (
        body: ChainMintMultiTokenBatchCelo,
        provider?: string,
        testnet?: boolean,
      ) => mintMultiTokenBatchTransaction(body, provider, testnet),
      /**
       * Prepare a signed Celo transfer multiple tokens transaction with the private key locally. Nothing is broadcasted to the blockchain.
       * @returns raw transaction data in hex, to be broadcasted to blockchain.
       */
      transferMultiTokenTransaction: async (
        body: ChainTransferMultiTokenCelo,
        provider?: string,
        testnet?: boolean,
      ) => transferMultiTokenTransaction(body, provider, testnet),
      /**
       * Prepare a signed Celo batch transfer multiple tokens transaction with the private key locally. Nothing is broadcasted to the blockchain.
       * @returns raw transaction data in hex, to be broadcasted to blockchain.
       */
      transferMultiTokenBatchTransaction: async (
        body: ChainTransferMultiTokenBatchCelo,
        provider?: string,
        testnet?: boolean,
      ) => transferMultiTokenBatchTransaction(body, provider, testnet),
      /**
       * Prepare a signed Celo burn multiple tokens transaction with the private key locally. Nothing is broadcasted to the blockchain.
       * @returns raw transaction data in hex, to be broadcasted to blockchain.
       */
      burnMultiTokenTransaction: async (
        body: ChainBurnMultiTokenCelo,
        provider?: string,
        testnet?: boolean,
      ) => burnMultiTokenTransaction(body, provider, testnet),
      /**
       * Prepare a signed Celo burn multiple tokens batch transaction with the private key locally. Nothing is broadcasted to the blockchain.
       * @returns raw transaction data in hex, to be broadcasted to blockchain.
       */
      burnMultiTokenBatchTransaction: async (
        body: ChainBurnMultiTokenBatchCelo,
        provider?: string,
        testnet?: boolean,
      ) => burnMultiTokenBatchTransaction(body, provider, testnet),
      /**
       * Prepare a signed Celo deploy multi token transaction with the private key locally. Nothing is broadcasted to the blockchain.
       * @returns raw transaction data in hex, to be broadcasted to blockchain.
       */
      deployMultiTokenTransaction: async (
        body: ChainDeployMultiTokenCelo,
        provider?: string,
        testnet?: boolean,
      ) => deployMultiTokenTransaction(body, provider, testnet),
      send: {
        /**
         * Send Celo mint multiple tokens transaction to the blockchain. This method broadcasts signed transaction to the blockchain.
         * This operation is irreversible.
         * @param testnet mainnet or testnet version
         * @param body content of the transaction to broadcast
         * @param provider url of the Celo Server to connect to. If not set, default public server will be used.
         * @returns transaction id of the transaction in the blockchain
         */
        mintMultiTokenTransaction: async (
          body: ChainMintMultiTokenCelo,
          provider?: string,
          testnet?: boolean,
        ) =>
          await args.broadcastFunction({
            txData: (await mintMultiTokenTransaction(body, provider, testnet)) as string,
            signatureId: body.signatureId,
          }),
        /**
         * Send Celo mint multiple tokens batch transaction to the blockchain. This method broadcasts signed transaction to the blockchain.
         * This operation is irreversible.
         * @param testnet mainnet or testnet version
         * @param body content of the transaction to broadcast
         * @param provider url of the Celo Server to connect to. If not set, default public server will be used.
         * @returns transaction id of the transaction in the blockchain
         */
        mintMultiTokenBatchTransaction: async (
          body: ChainMintMultiTokenBatchCelo,
          provider?: string,
          testnet?: boolean,
        ) =>
          await args.broadcastFunction({
            txData: (await mintMultiTokenBatchTransaction(body, provider, testnet)) as string,
            signatureId: body.signatureId,
          }),
        /**
         * Send Celo transfer multiple tokens transaction to the blockchain. This method broadcasts signed transaction to the blockchain.
         * This operation is irreversible.
         * @param testnet mainnet or testnet version
         * @param body content of the transaction to broadcast
         * @param provider url of the Celo Server to connect to. If not set, default public server will be used.
         * @returns transaction id of the transaction in the blockchain
         */
        transferMultiTokenTransaction: async (
          body: ChainTransferMultiTokenCelo,
          provider?: string,
          testnet?: boolean,
        ) =>
          await args.broadcastFunction({
            txData: (await transferMultiTokenTransaction(body, provider, testnet)) as string,
            signatureId: body.signatureId,
          }),
        /**
         * Send Celo transfer multiple tokens batch transaction to the blockchain. This method broadcasts signed transaction to the blockchain.
         * This operation is irreversible.
         * @param testnet mainnet or testnet version
         * @param body content of the transaction to broadcast
         * @param provider url of the Celo Server to connect to. If not set, default public server will be used.
         * @returns transaction id of the transaction in the blockchain
         */
        transferMultiTokenBatchTransaction: async (
          body: ChainTransferMultiTokenBatchCelo,
          provider?: string,
          testnet?: boolean,
        ) =>
          await args.broadcastFunction({
            txData: (await transferMultiTokenBatchTransaction(body, provider, testnet)) as string,
            signatureId: body.signatureId,
          }),
        /**
         * Send Celo burn multiple tokens transaction to the blockchain. This method broadcasts signed transaction to the blockchain.
         * This operation is irreversible.
         * @param testnet mainnet or testnet version
         * @param body content of the transaction to broadcast
         * @param provider url of the Celo Server to connect to. If not set, default public server will be used.
         * @returns transaction id of the transaction in the blockchain
         */
        burnMultiTokenTransaction: async (
          body: ChainBurnMultiTokenCelo,
          provider?: string,
          testnet?: boolean,
        ) =>
          await args.broadcastFunction({
            txData: (await burnMultiTokenTransaction(body, provider, testnet)) as string,
            signatureId: body.signatureId,
          }),
        /**
         * Send Celo burn multiple tokens batch transaction to the blockchain. This method broadcasts signed transaction to the blockchain.
         * This operation is irreversible.
         * @param testnet mainnet or testnet version
         * @param body content of the transaction to broadcast
         * @param provider url of the Celo Server to connect to. If not set, default public server will be used.
         * @returns transaction id of the transaction in the blockchain
         */
        burnMultiTokenBatchTransaction: async (
          body: ChainBurnMultiTokenBatchCelo,
          provider?: string,
          testnet?: boolean,
        ) =>
          await args.broadcastFunction({
            txData: (await burnMultiTokenBatchTransaction(body, provider, testnet)) as string,
            signatureId: body.signatureId,
          }),

        /**
         * Send Celo deploy multiple tokens transaction to the blockchain. This method broadcasts signed transaction to the blockchain.
         * This operation is irreversible.
         * @param testnet mainnet or testnet version
         * @param body content of the transaction to broadcast
         * @param provider url of the Celo Server to connect to. If not set, default public server will be used.
         * @returns transaction id of the transaction in the blockchain
         */
        deployMultiTokenTransaction: async (
          body: ChainDeployMultiTokenCelo,
          provider?: string,
          testnet?: boolean,
        ) =>
          await args.broadcastFunction({
            txData: (await deployMultiTokenTransaction(body, provider, testnet)) as string,
            signatureId: body.signatureId,
          }),
      },
    },
  }
}
