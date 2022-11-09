import { Blockchain, EvmBasedBlockchain } from '@tatumio/shared-core'
import BigNumber from 'bignumber.js'
import { Erc1155, EvmBasedSdkError, evmBasedUtils } from '@tatumio/shared-blockchain-evm-based'
import { BroadcastFunction } from '@tatumio/shared-blockchain-abstract'
import { CeloWallet } from '@celo-tools/celo-ethers-wrapper'
import Web3 from 'web3'
import {
  CeloTransactionConfig,
  celoUtils,
  ChainBurnMultiTokenBatchCelo,
  ChainBurnMultiTokenCelo,
  ChainDeployMultiTokenCelo,
  ChainMintMultiTokenBatchCelo,
  ChainMintMultiTokenCelo,
  ChainTransferMultiTokenBatchCelo,
  ChainTransferMultiTokenCelo,
} from '../../utils/celo.utils'
import { SdkErrorCode } from '@tatumio/shared-abstract-sdk'
import {
  ApiServices,
  BurnMultiTokenBatchKMSCelo,
  BurnMultiTokenKMSCelo,
  DeployMultiTokenCeloKMS,
  MintMultiTokenBatchKMSCelo,
  MintMultiTokenKMSCelo,
  TransferMultiTokenBatchKMSCelo,
  TransferMultiTokenKMSCelo,
} from '@tatumio/api-client'

const deployMultiTokenTransaction = async (
  body: ChainDeployMultiTokenCelo,
  provider?: string,
  testnet?: boolean,
) => {
  const { fromPrivateKey, uri, feeCurrency, fee, nonce, signatureId } = body

  const celoProvider = celoUtils.getProvider(provider)
  const network = await celoProvider.ready
  const feeCurrencyContractAddress = celoUtils.getFeeCurrency(feeCurrency, testnet)

  const contract = new new Web3().eth.Contract(Erc1155.abi as any)
  const deploy = contract.deploy({
    data: Erc1155.bytecode,
    arguments: [uri, body.publicMint ?? false],
  })

  if (signatureId) {
    return JSON.stringify({
      chainId: network.chainId,
      feeCurrency: feeCurrencyContractAddress,
      nonce,
      gasLimit: evmBasedUtils.gasLimitToHexWithFallback(fee?.gasLimit),
      gasPrice: evmBasedUtils.gasPriceWeiToHexWithFallback(fee?.gasPrice),
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
    gasLimit: evmBasedUtils.gasLimitToHexWithFallback(fee?.gasLimit),
    gasPrice: evmBasedUtils.gasPriceWeiToHexWithFallback(fee?.gasPrice, gasPrice),
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
  const { fromPrivateKey, to, tokenId, contractAddress, feeCurrency, fee, data, amount, nonce, signatureId } =
    body

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
        gasLimit: evmBasedUtils.gasLimitToHexWithFallback(fee?.gasLimit),
        gasPrice: evmBasedUtils.gasPriceWeiToHexWithFallback(fee?.gasPrice),
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
      gasLimit: evmBasedUtils.gasLimitToHexWithFallback(fee?.gasLimit),
      gasPrice: evmBasedUtils.gasPriceWeiToHexWithFallback(fee?.gasPrice, gasPrice),
      from,
    }

    return await celoUtils.prepareSignedTransactionAbstraction(wallet, tx)
  }
  throw new EvmBasedSdkError({ code: SdkErrorCode.CELO_MISSING_CONTRACT_ADDRESS })
}

const mintMultiTokenBatchTransaction = async (
  body: ChainMintMultiTokenBatchCelo,
  provider?: string,
  testnet?: boolean,
) => {
  const {
    fromPrivateKey,
    to,
    tokenId,
    contractAddress,
    amounts,
    data,
    feeCurrency,
    fee,
    nonce,
    signatureId,
  } = body
  if (contractAddress && feeCurrency) {
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
        gasLimit: evmBasedUtils.gasLimitToHexWithFallback(fee?.gasLimit),
        gasPrice: evmBasedUtils.gasPriceWeiToHexWithFallback(fee?.gasPrice),
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
      gasLimit: evmBasedUtils.gasLimitToHexWithFallback(fee?.gasLimit),
      gasPrice: evmBasedUtils.gasPriceWeiToHexWithFallback(fee?.gasPrice, gasPrice),
      to: contractAddress.trim(),
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
  throw new EvmBasedSdkError({ code: SdkErrorCode.CELO_MISSING_CONTRACT_ADDRESS })
}

const transferMultiTokenTransaction = async (
  body: ChainTransferMultiTokenCelo,
  provider?: string,
  testnet?: boolean,
) => {
  const { fromPrivateKey, to, tokenId, contractAddress, feeCurrency, fee, nonce, amount, data, signatureId } =
    body
  if (contractAddress && feeCurrency) {
    const celoProvider = celoUtils.getProvider(provider)
    const network = await celoProvider.ready
    const feeCurrencyContractAddress = celoUtils.getFeeCurrency(feeCurrency, testnet)
    const contract = new new Web3().eth.Contract(Erc1155.abi as any, contractAddress.trim())

    if (signatureId) {
      return JSON.stringify({
        chainId: network.chainId,
        feeCurrency: feeCurrencyContractAddress,
        gasLimit: evmBasedUtils.gasLimitToHexWithFallback(fee?.gasLimit),
        gasPrice: evmBasedUtils.gasPriceWeiToHexWithFallback(fee?.gasPrice),
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
      gasLimit: evmBasedUtils.gasLimitToHexWithFallback(fee?.gasLimit),
      gasPrice: evmBasedUtils.gasPriceWeiToHexWithFallback(fee?.gasPrice, gasPrice),
      to: contractAddress.trim(),
      data: contract.methods
        // TODO: remove ! when type will be fixed
        .safeTransfer(to.trim(), tokenId, `0x${new BigNumber(amount!).toString(16)}`, data ? data : '0x0')
        .encodeABI(),
      from,
    }
    return await celoUtils.prepareSignedTransactionAbstraction(wallet, tx)
  }
  throw new EvmBasedSdkError({ code: SdkErrorCode.CELO_MISSING_CONTRACT_ADDRESS })
}

const transferMultiTokenBatchTransaction = async (
  body: ChainTransferMultiTokenBatchCelo,
  provider?: string,
  testnet?: boolean,
) => {
  const {
    fromPrivateKey,
    to,
    tokenId,
    contractAddress,
    feeCurrency,
    fee,
    nonce,
    amounts,
    data,
    signatureId,
  } = body

  if (contractAddress && feeCurrency) {
    const celoProvider = celoUtils.getProvider(provider)
    const network = await celoProvider.ready
    const feeCurrencyContractAddress = celoUtils.getFeeCurrency(feeCurrency, testnet)
    const amts = amounts.map((amt) => `0x${new BigNumber(amt).toString(16)}`)
    const contract = new new Web3().eth.Contract(Erc1155.abi as any, contractAddress.trim())

    if (signatureId) {
      return JSON.stringify({
        chainId: network.chainId,
        feeCurrency: feeCurrencyContractAddress,
        gasLimit: evmBasedUtils.gasLimitToHexWithFallback(fee?.gasLimit),
        gasPrice: evmBasedUtils.gasPriceWeiToHexWithFallback(fee?.gasPrice),
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
      gasLimit: evmBasedUtils.gasLimitToHexWithFallback(fee?.gasLimit),
      gasPrice: evmBasedUtils.gasPriceWeiToHexWithFallback(fee?.gasPrice, gasPrice),
      to: contractAddress.trim(),
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
  throw new EvmBasedSdkError({ code: SdkErrorCode.CELO_MISSING_CONTRACT_ADDRESS })
}

const burnMultiTokenTransaction = async (
  body: ChainBurnMultiTokenCelo,
  provider?: string,
  testnet?: boolean,
) => {
  const { fromPrivateKey, tokenId, account, amount, contractAddress, feeCurrency, fee, nonce, signatureId } =
    body
  if (contractAddress && feeCurrency) {
    const celoProvider = celoUtils.getProvider(provider)
    const network = await celoProvider.ready
    const feeCurrencyContractAddress = celoUtils.getFeeCurrency(feeCurrency, testnet)
    const contract = new new Web3().eth.Contract(Erc1155.abi as any, contractAddress.trim())

    if (signatureId) {
      return JSON.stringify({
        chainId: network.chainId,
        feeCurrency: feeCurrencyContractAddress,
        nonce,
        gasLimit: evmBasedUtils.gasLimitToHexWithFallback(fee?.gasLimit),
        gasPrice: evmBasedUtils.gasPriceWeiToHexWithFallback(fee?.gasPrice),
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
      gasLimit: evmBasedUtils.gasLimitToHexWithFallback(fee?.gasLimit),
      gasPrice: evmBasedUtils.gasPriceWeiToHexWithFallback(fee?.gasPrice, gasPrice),
      to: contractAddress.trim(),
      data: contract.methods.burn(account, tokenId, amount).encodeABI(),
      from,
    }
    return await celoUtils.prepareSignedTransactionAbstraction(wallet, tx)
  }
  throw new EvmBasedSdkError({ code: SdkErrorCode.CELO_MISSING_CONTRACT_ADDRESS })
}

const burnMultiTokenBatchTransaction = async (
  body: ChainBurnMultiTokenBatchCelo,
  provider?: string,
  testnet?: boolean,
) => {
  const { fromPrivateKey, tokenId, account, amounts, contractAddress, feeCurrency, fee, nonce, signatureId } =
    body
  if (contractAddress && feeCurrency) {
    const celoProvider = celoUtils.getProvider(provider)
    const network = await celoProvider.ready
    const feeCurrencyContractAddress = celoUtils.getFeeCurrency(feeCurrency, testnet)
    const contract = new new Web3().eth.Contract(Erc1155.abi as any, contractAddress.trim())

    if (signatureId) {
      return JSON.stringify({
        chainId: network.chainId,
        feeCurrency: feeCurrencyContractAddress,
        nonce,
        gasLimit: evmBasedUtils.gasLimitToHexWithFallback(fee?.gasLimit),
        gasPrice: evmBasedUtils.gasPriceWeiToHexWithFallback(fee?.gasPrice),
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
      gasLimit: evmBasedUtils.gasLimitToHexWithFallback(fee?.gasLimit),
      gasPrice: evmBasedUtils.gasPriceWeiToHexWithFallback(fee?.gasPrice, gasPrice),
      to: contractAddress.trim(),
      data: contract.methods.burnBatch(account, tokenId, amounts).encodeABI(),
      from,
    }
    return await celoUtils.prepareSignedTransactionAbstraction(wallet, tx)
  }
  throw new EvmBasedSdkError({ code: SdkErrorCode.CELO_MISSING_CONTRACT_ADDRESS })
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
      ) =>
        evmBasedUtils.tryCatch(
          () => mintMultiTokenTransaction(body, provider, testnet),
          SdkErrorCode.EVM_ERC1155_CANNOT_PREPARE_MINT_TX,
        ),
      /**
       * Prepare a signed Celo mint multiple tokens batch transaction with the private key locally. Nothing is broadcasted to the blockchain.
       * @returns raw transaction data in hex, to be broadcasted to blockchain.
       */
      mintMultiTokenBatchTransaction: async (
        body: ChainMintMultiTokenBatchCelo,
        provider?: string,
        testnet?: boolean,
      ) =>
        evmBasedUtils.tryCatch(
          () => mintMultiTokenBatchTransaction(body, provider, testnet),
          SdkErrorCode.EVM_ERC1155_CANNOT_PREPARE_MINT_BATCH_TX,
        ),
      /**
       * Prepare a signed Celo transfer multiple tokens transaction with the private key locally. Nothing is broadcasted to the blockchain.
       * @returns raw transaction data in hex, to be broadcasted to blockchain.
       */
      transferMultiTokenTransaction: async (
        body: ChainTransferMultiTokenCelo,
        provider?: string,
        testnet?: boolean,
      ) =>
        evmBasedUtils.tryCatch(
          () => transferMultiTokenTransaction(body, provider, testnet),
          SdkErrorCode.EVM_ERC1155_CANNOT_PREPARE_TRANSFER_TX,
        ),
      /**
       * Prepare a signed Celo batch transfer multiple tokens transaction with the private key locally. Nothing is broadcasted to the blockchain.
       * @returns raw transaction data in hex, to be broadcasted to blockchain.
       */
      transferMultiTokenBatchTransaction: async (
        body: ChainTransferMultiTokenBatchCelo,
        provider?: string,
        testnet?: boolean,
      ) =>
        evmBasedUtils.tryCatch(
          () => transferMultiTokenBatchTransaction(body, provider, testnet),
          SdkErrorCode.EVM_ERC1155_CANNOT_PREPARE_TRANSFER_BATCH_TX,
        ),
      /**
       * Prepare a signed Celo burn multiple tokens transaction with the private key locally. Nothing is broadcasted to the blockchain.
       * @returns raw transaction data in hex, to be broadcasted to blockchain.
       */
      burnMultiTokenTransaction: async (
        body: ChainBurnMultiTokenCelo,
        provider?: string,
        testnet?: boolean,
      ) =>
        evmBasedUtils.tryCatch(
          () => burnMultiTokenTransaction(body, provider, testnet),
          SdkErrorCode.EVM_ERC1155_CANNOT_PREPARE_BURN_TX,
        ),
      /**
       * Prepare a signed Celo burn multiple tokens batch transaction with the private key locally. Nothing is broadcasted to the blockchain.
       * @returns raw transaction data in hex, to be broadcasted to blockchain.
       */
      burnMultiTokenBatchTransaction: async (
        body: ChainBurnMultiTokenBatchCelo,
        provider?: string,
        testnet?: boolean,
      ) =>
        evmBasedUtils.tryCatch(
          () => burnMultiTokenBatchTransaction(body, provider, testnet),
          SdkErrorCode.EVM_ERC1155_CANNOT_PREPARE_BURN_BATCH_TX,
        ),
      /**
       * Prepare a signed Celo deploy multi token transaction with the private key locally. Nothing is broadcasted to the blockchain.
       * @returns raw transaction data in hex, to be broadcasted to blockchain.
       */
      deployMultiTokenTransaction: async (
        body: ChainDeployMultiTokenCelo,
        provider?: string,
        testnet?: boolean,
      ) =>
        evmBasedUtils.tryCatch(
          () => deployMultiTokenTransaction(body, provider, testnet),
          SdkErrorCode.EVM_ERC1155_CANNOT_PREPARE_DEPLOY_TX,
        ),
    },
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
      ) => {
        if (body.signatureId) {
          return ApiServices.multiToken.mintMultiToken({
            ...body,
            chain: Blockchain.CELO,
          } as MintMultiTokenKMSCelo)
        }
        return args.broadcastFunction({
          txData: (await mintMultiTokenTransaction(body, provider, testnet)) as string,
        })
      },
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
      ) => {
        if (body.signatureId) {
          return ApiServices.multiToken.mintMultiTokenBatch({
            ...body,
            chain: Blockchain.CELO,
          } as MintMultiTokenBatchKMSCelo)
        }
        return args.broadcastFunction({
          txData: (await mintMultiTokenBatchTransaction(body, provider, testnet)) as string,
        })
      },
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
      ) => {
        if (body.signatureId) {
          return ApiServices.multiToken.transferMultiToken({
            ...body,
            chain: Blockchain.CELO,
          } as TransferMultiTokenKMSCelo)
        }
        return args.broadcastFunction({
          txData: (await transferMultiTokenTransaction(body, provider, testnet)) as string,
        })
      },
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
      ) => {
        if (body.signatureId) {
          return ApiServices.multiToken.transferMultiTokenBatch({
            ...body,
            chain: Blockchain.CELO,
          } as TransferMultiTokenBatchKMSCelo)
        }
        return args.broadcastFunction({
          txData: (await transferMultiTokenBatchTransaction(body, provider, testnet)) as string,
        })
      },
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
      ) => {
        if (body.signatureId) {
          return ApiServices.multiToken.burnMultiToken({
            ...body,
            chain: Blockchain.CELO,
          } as BurnMultiTokenKMSCelo)
        }
        return args.broadcastFunction({
          txData: (await burnMultiTokenTransaction(body, provider, testnet)) as string,
        })
      },
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
      ) => {
        if (body.signatureId) {
          return ApiServices.multiToken.burnMultiTokenBatch({
            ...body,
            chain: Blockchain.CELO,
          } as BurnMultiTokenBatchKMSCelo)
        }
        return args.broadcastFunction({
          txData: (await burnMultiTokenBatchTransaction(body, provider, testnet)) as string,
        })
      },

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
      ) => {
        if (body.signatureId) {
          return ApiServices.multiToken.deployMultiToken({
            ...body,
            chain: Blockchain.CELO,
          } as DeployMultiTokenCeloKMS)
        }
        return args.broadcastFunction({
          txData: (await deployMultiTokenTransaction(body, provider, testnet)) as string,
        })
      },
    },
  }
}
