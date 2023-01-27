import { CeloWallet } from '@celo-tools/celo-ethers-wrapper'
import {
  ApiServices,
  ApproveCeloErc20KMS,
  ChainBurnCeloErc20KMS,
  ChainDeployCeloErc20KMS,
  ChainMintCeloErc20KMS,
  ChainTransferCeloErc20TokenKMS,
  OpenAPI,
  TATUM_API_CONSTANTS,
} from '@tatumio/api-client'
import { amountUtils, SdkErrorCode, toHexString } from '@tatumio/shared-abstract-sdk'
import { BroadcastFunction } from '@tatumio/shared-blockchain-abstract'
import { Erc20Token, evmBasedUtils, EvmBasedWeb3 } from '@tatumio/shared-blockchain-evm-based'
import BigNumber from 'bignumber.js'
import Web3 from 'web3'
import {
  CeloTransactionConfig,
  celoUtils,
  ChainApproveErc20Celo,
  ChainBurnErc20Celo,
  ChainDeployErc20Celo,
  ChainMintErc20Celo,
  ChainTransferErc20Celo,
} from '../../utils/celo.utils'
import { Blockchain } from '@tatumio/shared-core'

const prepareDeploySignedTransaction = async (
  body: ChainDeployErc20Celo,
  provider?: string,
  testnet?: boolean,
) => {
  const { fromPrivateKey, name, symbol, supply, address, digits, nonce, fee, signatureId, totalCap } = body

  const { celoProvider, network, feeCurrencyContractAddress, contract } = await celoUtils.initErc20Contract(
    body,
    provider,
    testnet,
  )

  const deploy = contract.deploy({
    data: Erc20Token.bytecode,
    arguments: [
      name,
      symbol,
      address,
      digits,
      toHexString(new BigNumber(totalCap || supply).multipliedBy(new BigNumber(10).pow(digits))),
      toHexString(new BigNumber(supply).multipliedBy(new BigNumber(10).pow(digits))),
    ],
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

  return celoUtils.prepareSignedTransactionAbstraction(wallet, tx)
}

const prepareMintSignedTransaction = async (
  body: ChainMintErc20Celo,
  provider?: string,
  testnet?: boolean,
) => {
  const { fromPrivateKey, amount, to, contractAddress, nonce, fee, signatureId } = body

  const { celoProvider, network, feeCurrencyContractAddress, contract } = await celoUtils.initErc20Contract(
    body,
    provider,
    testnet,
    contractAddress.trim(),
  )

  const decimals = await contract.methods.decimals().call()

  if (signatureId) {
    return JSON.stringify({
      chainId: network.chainId,
      feeCurrency: feeCurrencyContractAddress,
      nonce,
      gasLimit: evmBasedUtils.gasLimitToHexWithFallback(fee?.gasLimit),
      gasPrice: evmBasedUtils.gasPriceWeiToHexWithFallback(fee?.gasPrice),
      to: contractAddress.trim(),
      data: contract.methods.mint(to.trim(), amountUtils.amountToHexString(amount, decimals)).encodeABI(),
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
    data: contract.methods.mint(to.trim(), amountUtils.amountToHexString(amount, decimals)).encodeABI(),
    from,
  }
  return celoUtils.prepareSignedTransactionAbstraction(wallet, tx)
}

const prepareTransferSignedTransaction = async (
  body: ChainTransferErc20Celo,
  provider?: string,
  testnet?: boolean,
) => {
  const { fromPrivateKey, to, amount, contractAddress, nonce, signatureId, fee } = body

  const { celoProvider, network, feeCurrencyContractAddress, contract } = await celoUtils.initErc20Contract(
    body,
    provider,
    testnet,
    contractAddress.trim(),
  )

  const decimals = await contract.methods.decimals().call()
  if (signatureId) {
    return JSON.stringify({
      chainId: network.chainId,
      feeCurrency: feeCurrencyContractAddress,
      nonce,
      gasLimit: evmBasedUtils.gasLimitToHexWithFallback(fee?.gasLimit),
      gasPrice: evmBasedUtils.gasPriceWeiToHexWithFallback(fee?.gasPrice),
      to: contractAddress.trim(),
      data: contract.methods.transfer(to.trim(), amountUtils.amountToHexString(amount, decimals)).encodeABI(),
    })
  }

  const wallet = new CeloWallet(fromPrivateKey as string, celoProvider)
  await celoUtils.checkErc20Balance(contract, wallet, amount)
  const { txCount, gasPrice, from } = await celoUtils.obtainWalletInformation(
    wallet,
    feeCurrencyContractAddress,
  )

  const tx: CeloTransactionConfig = {
    chainId: network.chainId,
    feeCurrency: feeCurrencyContractAddress,
    nonce: nonce || txCount,
    gasLimit: evmBasedUtils.gasLimitToHexWithFallback(fee?.gasLimit),
    to: contractAddress.trim(),
    gasPrice: evmBasedUtils.gasPriceWeiToHexWithFallback(fee?.gasPrice, gasPrice),
    data: contract.methods.transfer(to.trim(), amountUtils.amountToHexString(amount, decimals)).encodeABI(),
    from,
  }
  return celoUtils.prepareSignedTransactionAbstraction(wallet, tx)
}

const prepareBurnSignedTransaction = async (
  body: ChainBurnErc20Celo,
  provider?: string,
  testnet?: boolean,
) => {
  const { fromPrivateKey, amount, contractAddress, nonce, fee, signatureId } = body

  const { celoProvider, network, feeCurrencyContractAddress, contract } = await celoUtils.initErc20Contract(
    body,
    provider,
    testnet,
    contractAddress.trim(),
  )

  const decimals = await contract.methods.decimals().call()
  if (signatureId) {
    return JSON.stringify({
      chainId: network.chainId,
      feeCurrency: feeCurrencyContractAddress,
      nonce,
      gasLimit: evmBasedUtils.gasLimitToHexWithFallback(fee?.gasLimit),
      gasPrice: evmBasedUtils.gasPriceWeiToHexWithFallback(fee?.gasPrice),
      to: contractAddress.trim(),
      data: contract.methods.burn(amountUtils.amountToHexString(amount, decimals)).encodeABI(),
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
    data: contract.methods.burn(amountUtils.amountToHexString(amount, decimals)).encodeABI(),
    from,
  }
  return celoUtils.prepareSignedTransactionAbstraction(wallet, tx)
}

const prepareApproveSignedTransaction = async (
  body: ChainApproveErc20Celo,
  provider?: string,
  testnet?: boolean,
) => {
  const { fromPrivateKey, amount, spender, contractAddress, nonce, fee, signatureId } = body

  const { celoProvider, network, feeCurrencyContractAddress, contract } = await celoUtils.initErc20Contract(
    body,
    provider,
    testnet,
    contractAddress.trim(),
  )

  const decimals = await contract.methods.decimals().call()

  if (signatureId) {
    return JSON.stringify({
      chainId: network.chainId,
      feeCurrency: feeCurrencyContractAddress,
      nonce,
      gasLimit: evmBasedUtils.gasLimitToHexWithFallback(fee?.gasLimit),
      gasPrice: evmBasedUtils.gasPriceWeiToHexWithFallback(fee?.gasPrice),
      to: contractAddress.trim(),
      data: contract.methods
        .approve(spender.trim(), amountUtils.amountToHexString(amount, decimals))
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
      .approve(spender.trim(), amountUtils.amountToHexString(amount, decimals))
      .encodeABI(),
    from,
  }
  return celoUtils.prepareSignedTransactionAbstraction(wallet, tx)
}

export const erc20 = (args: { broadcastFunction: BroadcastFunction; web3: EvmBasedWeb3 }) => {
  return {
    decimals: async (contractAddress: string, provider?: string) => {
      const web3Client = args.web3.getClient(provider)

      // TODO: any type
      return new web3Client.eth.Contract(Erc20Token.abi as any, contractAddress).methods.decimals().call()
    },
    prepare: {
      /**
       * Prepare a signed Celo deploy erc20 transaction with the private key locally. Nothing is broadcasted to the blockchain.
       * @returns raw transaction data in hex, to be broadcasted to blockchain.
       */
      deploySignedTransaction: async (body: ChainDeployErc20Celo, provider?: string, testnet?: boolean) =>
        evmBasedUtils.tryCatch(
          () => prepareDeploySignedTransaction(body, provider, testnet),
          SdkErrorCode.EVM_ERC20_CANNOT_PREPARE_DEPLOY_TX,
        ),
      /**
       * Prepare a signed Celo mint erc20 transaction with the private key locally. Nothing is broadcasted to the blockchain.
       * @returns raw transaction data in hex, to be broadcasted to blockchain.
       */
      mintSignedTransaction: async (body: ChainMintErc20Celo, provider?: string, testnet?: boolean) =>
        evmBasedUtils.tryCatch(
          () => prepareMintSignedTransaction(body, provider, testnet),
          SdkErrorCode.EVM_ERC20_CANNOT_PREPARE_MINT_TX,
        ),
      /**
       * Prepare a signed Celo transfer erc20 transaction with the private key locally. Nothing is broadcasted to the blockchain.
       * @returns raw transaction data in hex, to be broadcasted to blockchain.
       */
      transferSignedTransaction: async (body: ChainTransferErc20Celo, provider?: string, testnet?: boolean) =>
        evmBasedUtils.tryCatch(
          () => prepareTransferSignedTransaction(body, provider, testnet),
          SdkErrorCode.EVM_ERC20_CANNOT_PREPARE_TRANSFER_TX,
        ),
      /**
       * Prepare a signed Celo burn erc20 transaction with the private key locally. Nothing is broadcasted to the blockchain.
       * @returns raw transaction data in hex, to be broadcasted to blockchain.
       */
      burnSignedTransaction: async (body: ChainBurnErc20Celo, provider?: string, testnet?: boolean) =>
        evmBasedUtils.tryCatch(
          () => prepareBurnSignedTransaction(body, provider, testnet),
          SdkErrorCode.EVM_ERC20_CANNOT_PREPARE_BURN_TX,
        ),
      /**
       * Prepare approve ERC20 signed transaction..
       * @returns raw transaction data in hex, to be broadcasted to blockchain.
       */
      approveSignedTransaction: async (body: ChainApproveErc20Celo, provider?: string, testnet?: boolean) =>
        evmBasedUtils.tryCatch(
          () => prepareApproveSignedTransaction(body, provider, testnet),
          SdkErrorCode.EVM_ERC20_CANNOT_PREPARE_APPROVE_TX,
        ),
    },
    send: {
      /**
       * Send Celo or cUsd transaction to the blockchain. This method broadcasts signed transaction to the blockchain.
       * This operation is irreversible.
       * @param testnet mainnet or testnet version
       * @param body content of the transaction to broadcast
       * @param provider url of the Celo Server to connect to. If not set, default public server will be used.
       * @returns transaction id of the transaction in the blockchain
       */
      deploySignedTransaction: async (body: ChainDeployErc20Celo, provider?: string, testnet?: boolean) => {
        if (body.signatureId) {
          return ApiServices.fungibleToken.erc20Deploy({
            ...body,
            chain: Blockchain.CELO,
          } as ChainDeployCeloErc20KMS)
        }
        return args.broadcastFunction({
          txData: await prepareDeploySignedTransaction(body, provider, testnet),
        })
      },
      /**
       * Send Mint Celo or cUsd transaction to the blockchain. This method broadcasts signed transaction to the blockchain.
       * This operation is irreversible.
       * @param testnet mainnet or testnet version
       * @param body content of the transaction to broadcast
       * @param provider url of the Celo Server to connect to. If not set, default public server will be used.
       * @returns transaction id of the transaction in the blockchain
       */
      mintSignedTransaction: async (body: ChainMintErc20Celo, provider?: string, testnet?: boolean) => {
        if (body.signatureId) {
          return ApiServices.fungibleToken.erc20Mint({
            ...body,
            chain: Blockchain.CELO,
          } as ChainMintCeloErc20KMS)
        }
        return args.broadcastFunction({
          txData: await prepareMintSignedTransaction(body, provider, testnet),
        })
      },
      /**
       * Send Celo or cUsd transaction to the blockchain. This method broadcasts signed transaction to the blockchain.
       * This operation is irreversible.
       * @param testnet mainnet or testnet version
       * @param body content of the transaction to broadcast
       * @param provider url of the Celo Server to connect to. If not set, default public server will be used.
       * @returns transaction id of the transaction in the blockchain
       */
      transferSignedTransaction: async (
        body: ChainTransferErc20Celo,
        provider?: string,
        testnet?: boolean,
      ) => {
        if (body.signatureId) {
          return ApiServices.fungibleToken.erc20Transfer({
            ...body,
            chain: Blockchain.CELO,
          } as ChainTransferCeloErc20TokenKMS)
        }
        return args.broadcastFunction({
          txData: await prepareTransferSignedTransaction(body, provider, testnet),
        })
      },
      /**
       * Send Burn Celo or cUsd transaction to the blockchain. This method broadcasts signed transaction to the blockchain.
       * This operation is irreversible.
       * @param testnet mainnet or testnet version
       * @param body content of the transaction to broadcast
       * @param provider url of the Celo Server to connect to. If not set, default public server will be used.
       * @returns transaction id of the transaction in the blockchain
       */
      burnSignedTransaction: async (body: ChainBurnErc20Celo, provider?: string, testnet?: boolean) => {
        if (body.signatureId) {
          return ApiServices.fungibleToken.erc20Burn({
            ...body,
            chain: Blockchain.CELO,
          } as ChainBurnCeloErc20KMS)
        }
        return args.broadcastFunction({
          txData: await prepareBurnSignedTransaction(body, provider, testnet),
        })
      },
      /**
       * Send approve erc20 transaction to the blockchain. This method broadcasts signed transaction to the blockchain.
       * This operation is irreversible.
       * @param testnet mainnet or testnet version
       * @param body content of the transaction to broadcast
       * @param provider url of the Celo Server to connect to. If not set, default public server will be used.
       * @returns transaction id of the transaction in the blockchain
       */
      approveSignedTransaction: async (body: ChainApproveErc20Celo, provider?: string, testnet?: boolean) => {
        if (body.signatureId) {
          return ApiServices.fungibleToken.erc20Approve({
            ...body,
            chain: Blockchain.CELO,
          } as ApproveCeloErc20KMS)
        }
        return args.broadcastFunction({
          txData: await prepareApproveSignedTransaction(body, provider, testnet),
        })
      },
    },
  }
}
