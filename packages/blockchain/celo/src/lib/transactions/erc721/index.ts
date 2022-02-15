import { EvmBasedBlockchain } from '@tatumio/shared-core'
import { MintNftCelo } from '@tatumio/api-client'
import BigNumber from 'bignumber.js'
import { Erc721_Provenance, Erc721Token } from '@tatumio/shared-blockchain-evm-based'
import { BroadcastFunction } from '@tatumio/shared-blockchain-abstract'
import { CeloWallet } from '@celo-tools/celo-ethers-wrapper'
import {
  CeloTransactionConfig,
  celoUtils,
  ChainBurnErc721Celo,
  ChainDeployErc721Celo,
  ChainMintErc721Celo,
  ChainMintMultipleNftCelo,
  ChainMintNftCelo,
  ChainTransferErc721Celo,
  ChainUpdateCashbackErc721Celo,
} from '../../utils/celo.utils'
import Web3 from 'web3'

const deploySignedTransaction = async (body: ChainDeployErc721Celo, provider?: string, testnet?: boolean) => {
  const { fromPrivateKey, name, symbol, feeCurrency, nonce, signatureId, provenance } = body

  const celoProvider = celoUtils.getProvider(provider)
  const network = await celoProvider.ready
  const feeCurrencyContractAddress = celoUtils.getFeeCurrency(feeCurrency, testnet)
  const contract = new new Web3().eth.Contract(provenance ? Erc721_Provenance.abi : (Erc721Token.abi as any))
  const deploy = contract.deploy({
    data: provenance ? Erc721_Provenance.bytecode : (Erc721Token.abi as any),
    arguments: [name, symbol],
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

const mintSignedTransaction = async (body: ChainMintErc721Celo, provider?: string, testnet?: boolean) => {
  const { contractAddress, nonce, signatureId, feeCurrency, to, tokenId, url, fromPrivateKey } = body

  const celoProvider = celoUtils.getProvider(provider)
  const network = await celoProvider.ready

  if (contractAddress && feeCurrency) {
    const feeCurrencyContractAddress = celoUtils.getFeeCurrency(feeCurrency, testnet)
    const contract = new new Web3().eth.Contract(Erc721Token.abi as any, contractAddress.trim())

    if (signatureId) {
      return JSON.stringify({
        chainId: network.chainId,
        feeCurrency: feeCurrencyContractAddress,
        nonce,
        to: contractAddress.trim(),
        gasLimit: '0',
        data: contract.methods.mintWithTokenURI(to.trim(), tokenId, url).encodeABI(),
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
      data: contract.methods.mintWithTokenURI(to.trim(), tokenId, url).encodeABI(),
      nonce: nonce || txCount,
      gasLimit: '0',
      gasPrice,
      from,
    }

    return await celoUtils.prepareSignedTransactionAbstraction(wallet, tx)
  }
  throw new Error('Contract address and fee currency should not be empty')
}

const mintMultipleSignedTransaction = async (
  body: ChainMintMultipleNftCelo,
  provider?: string,
  testnet?: boolean,
) => {
  const { fromPrivateKey, to, tokenId, contractAddress, url, feeCurrency, nonce, signatureId } = body

  const celoProvider = celoUtils.getProvider(provider)
  const network = await celoProvider.ready
  const feeCurrencyContractAddress = celoUtils.getFeeCurrency(feeCurrency, testnet)
  const contract = new new Web3().eth.Contract(Erc721Token.abi as any, contractAddress.trim())

  if (signatureId) {
    return JSON.stringify({
      chainId: network.chainId,
      feeCurrency: feeCurrencyContractAddress,
      nonce,
      gasLimit: '0',
      to: contractAddress.trim(),
      data: contract.methods
        .mintMultiple(
          to.map((t) => t.trim()),
          tokenId,
          url,
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
      .mintMultiple(
        to.map((t) => t.trim()),
        tokenId,
        url,
      )
      .encodeABI(),
    from,
  }

  return await celoUtils.prepareSignedTransactionAbstraction(wallet, tx)
}

const mintCashbackSignedTransaction = async (
  body: MintNftCelo & { signatureId?: string },
  provider?: string,
  testnet?: boolean,
) => {
  const {
    fromPrivateKey,
    url,
    to,
    tokenId,
    contractAddress,
    feeCurrency,
    nonce,
    signatureId,
    authorAddresses,
    cashbackValues,
    erc20,
  } = body

  const celoProvider = celoUtils.getProvider(provider)
  const network = await celoProvider.ready

  if (contractAddress && feeCurrency) {
    const feeCurrencyContractAddress = celoUtils.getFeeCurrency(feeCurrency, testnet)
    const contract = new new Web3().eth.Contract(Erc721Token.abi as any, contractAddress.trim())
    const cb: string[] = []
    for (const c of cashbackValues!) {
      cb.push(`0x${new BigNumber(Web3.utils.toWei(c, 'ether')).toString(16)}`)
    }

    if (signatureId) {
      return JSON.stringify({
        chainId: network.chainId,
        feeCurrency: feeCurrencyContractAddress,
        nonce,
        to: contractAddress.trim(),
        gasLimit: '0',
        data: erc20
          ? contract.methods.mintWithCashback(to.trim(), tokenId, url, authorAddresses, cb, erc20).encodeABI()
          : contract.methods.mintWithCashback(to.trim(), tokenId, url, authorAddresses, cb).encodeABI(),
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
      data: erc20
        ? contract.methods.mintWithCashback(to.trim(), tokenId, url, authorAddresses, cb, erc20).encodeABI()
        : contract.methods.mintWithCashback(to.trim(), tokenId, url, authorAddresses, cb).encodeABI(),
      from,
    }

    return await celoUtils.prepareSignedTransactionAbstraction(wallet, tx)
  }
  throw new Error('Contract address and fee currency should not be empty!')
}

export const mintMultipleCashbackSignedTransaction = async (
  body: ChainMintMultipleNftCelo,
  provider?: string,
  testnet?: boolean,
) => {
  const {
    fromPrivateKey,
    to,
    tokenId,
    contractAddress,
    url,
    feeCurrency,
    nonce,
    signatureId,
    authorAddresses,
    cashbackValues,
    erc20,
  } = body

  const celoProvider = celoUtils.getProvider(provider)
  const network = await celoProvider.ready
  const feeCurrencyContractAddress = celoUtils.getFeeCurrency(feeCurrency, testnet)
  const contract = new new Web3().eth.Contract(Erc721Token.abi as any, contractAddress.trim())

  const cashbacks: string[][] = cashbackValues!
  const cb: string[][] = []

  for (const c of cashbacks) {
    const cb2: string[] = []
    for (const c2 of c) {
      cb2.push(`0x${new BigNumber(Web3.utils.toWei(c2, 'ether')).toString(16)}`)
    }
    cb.push(cb2)
  }

  if (signatureId) {
    return JSON.stringify({
      chainId: network.chainId,
      feeCurrency: feeCurrencyContractAddress,
      nonce,
      gasLimit: '0',
      to: contractAddress.trim(),
      data: erc20
        ? contract.methods
            .mintMultipleCashback(
              to.map((t) => t.trim()),
              tokenId,
              url,
              authorAddresses,
              cb,
              erc20,
            )
            .encodeABI()
        : contract.methods
            .mintMultipleCashback(
              to.map((t) => t.trim()),
              tokenId,
              url,
              authorAddresses,
              cb,
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
    data: erc20
      ? contract.methods
          .mintMultipleCashback(
            to.map((t) => t.trim()),
            tokenId,
            url,
            authorAddresses,
            cb,
            erc20,
          )
          .encodeABI()
      : contract.methods
          .mintMultipleCashback(
            to.map((t) => t.trim()),
            tokenId,
            url,
            authorAddresses,
            cb,
          )
          .encodeABI(),
    from,
  }
  return await celoUtils.prepareSignedTransactionAbstraction(wallet, tx)
}

const mintProvenanceSignedTransaction = async (
  body: ChainMintNftCelo,
  provider?: string,
  testnet?: boolean,
) => {
  const {
    fromPrivateKey,
    url,
    to,
    tokenId,
    contractAddress,
    feeCurrency,
    nonce,
    signatureId,
    cashbackValues,
    authorAddresses,
    fixedValues,
    erc20,
  } = body

  const celoProvider = celoUtils.getProvider(provider)
  const network = await celoProvider.ready

  if (contractAddress && feeCurrency) {
    const feeCurrencyContractAddress = celoUtils.getFeeCurrency(feeCurrency, testnet)

    const contract = new new Web3().eth.Contract(Erc721_Provenance.abi as any, contractAddress.trim())
    const cb: string[] = []
    const fv: string[] = []
    if (cashbackValues && fixedValues && authorAddresses) {
      cashbackValues.forEach((c) => cb.push(`0x${new BigNumber(c).multipliedBy(100).toString(16)}`))
      fixedValues.forEach((c) => fv.push(`0x${new BigNumber(Web3.utils.toWei(c, 'ether')).toString(16)}`))
    }
    const data = erc20
      ? contract.methods
          .mintWithTokenURI(to.trim(), tokenId, url, authorAddresses ? authorAddresses : [], cb, fv, erc20)
          .encodeABI()
      : contract.methods
          .mintWithTokenURI(to.trim(), tokenId, url, authorAddresses ? authorAddresses : [], cb, fv)
          .encodeABI()

    if (signatureId) {
      return JSON.stringify({
        chainId: network.chainId,
        feeCurrency: feeCurrencyContractAddress,
        nonce,
        to: contractAddress.trim(),
        gasLimit: '0',
        data: data,
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
      data: data,
      from,
    }

    return await celoUtils.prepareSignedTransactionAbstraction(wallet, tx)
  }
  throw new Error('Contract address and fee currency should not be empty!')
}

const mintMultipleProvenanceSignedTransaction = async (
  body: ChainMintMultipleNftCelo & { fixedValues: string[][] },
  provider?: string,
  testnet?: boolean,
) => {
  const {
    fromPrivateKey,
    to,
    tokenId,
    contractAddress,
    url,
    feeCurrency,
    nonce,
    signatureId,
    authorAddresses,
    cashbackValues,
    fixedValues,
    erc20,
  } = body

  const celoProvider = celoUtils.getProvider(provider)
  const network = await celoProvider.ready
  const feeCurrencyContractAddress = celoUtils.getFeeCurrency(feeCurrency, testnet)
  const contract = new new Web3().eth.Contract(Erc721_Provenance.abi as any, contractAddress.trim())

  const cb: string[][] = []
  const fv: string[][] = []
  if (authorAddresses && cashbackValues && fixedValues) {
    for (let i = 0; i < cashbackValues.length; i++) {
      const cb2: string[] = []
      const fv2: string[] = []
      for (let j = 0; j < cashbackValues[i].length; j++) {
        cb2.push(`0x${new BigNumber(cashbackValues[i][j]).multipliedBy(100).toString(16)}`)
        fv2.push(`0x${new BigNumber(Web3.utils.toWei(fixedValues[i][j], 'ether')).toString(16)}`)
      }
      cb.push(cb2)
      fv.push(fv2)
    }
  }
  const data = erc20
    ? contract.methods
        .mintMultiple(
          to.map((t) => t.trim()),
          tokenId,
          url,
          authorAddresses ? authorAddresses : [],
          cb,
          fv,
          erc20,
        )
        .encodeABI()
    : contract.methods
        .mintMultiple(
          to.map((t) => t.trim()),
          tokenId,
          url,
          authorAddresses ? authorAddresses : [],
          cb,
          fv,
        )
        .encodeABI()

  if (signatureId) {
    return JSON.stringify({
      chainId: network.chainId,
      feeCurrency: feeCurrencyContractAddress,
      nonce,
      gasLimit: '0',
      to: contractAddress.trim(),
      data: data,
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
    data: data,
    from,
  }
  return await celoUtils.prepareSignedTransactionAbstraction(wallet, tx)
}

const transferSignedTransaction = async (
  body: ChainTransferErc721Celo,
  provider?: string,
  testnet?: boolean,
) => {
  const {
    fromPrivateKey,
    to,
    tokenId,
    contractAddress,
    feeCurrency,
    nonce,
    signatureId,
    value,
    provenance,
    provenanceData,
    tokenPrice,
  } = body

  const celoProvider = celoUtils.getProvider(provider)
  const network = await celoProvider.ready
  const feeCurrencyContractAddress = celoUtils.getFeeCurrency(feeCurrency, testnet)
  const contract = new new Web3().eth.Contract(
    provenance ? Erc721_Provenance.abi : (Erc721Token.abi as any),
    contractAddress.trim(),
  )
  const dataBytes = provenance
    ? Buffer.from(provenanceData + "'''###'''" + Web3.utils.toWei(tokenPrice!, 'ether'), 'utf8')
    : ''
  const tokenData = provenance
    ? contract.methods.safeTransfer(to.trim(), tokenId, `0x${dataBytes.toString('hex')}`).encodeABI()
    : contract.methods.safeTransfer(to.trim(), tokenId).encodeABI()

  if (signatureId) {
    return JSON.stringify({
      chainId: network.chainId,
      feeCurrency: feeCurrencyContractAddress,
      gasLimit: '0',
      nonce,
      to: contractAddress.trim(),
      data: tokenData,
      value: value ? `0x${new BigNumber(value).multipliedBy(1e18).toString(16)}` : undefined,
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
    data: contract.methods.safeTransfer(to.trim(), tokenId).encodeABI(),
    from,
    value: value ? `0x${new BigNumber(value).multipliedBy(1e18).toString(16)}` : undefined,
  }
  return await celoUtils.prepareSignedTransactionAbstraction(wallet, tx)
}

const updateCashbackForAuthorSignedTransaction = async (
  body: ChainUpdateCashbackErc721Celo,
  provider?: string,
  testnet?: boolean,
) => {
  const { fromPrivateKey, cashbackValue, tokenId, contractAddress, feeCurrency, nonce, signatureId } = body

  const celoProvider = celoUtils.getProvider(provider)
  const network = await celoProvider.ready
  const feeCurrencyContractAddress = celoUtils.getFeeCurrency(feeCurrency, testnet)
  const contract = new new Web3().eth.Contract(Erc721Token.abi as any, contractAddress.trim())

  if (signatureId) {
    return JSON.stringify({
      chainId: network.chainId,
      feeCurrency: feeCurrencyContractAddress,
      nonce,
      gasLimit: '0',
      to: contractAddress.trim(),
      data: contract.methods
        .updateCashbackForAuthor(
          tokenId,
          `0x${new BigNumber(Web3.utils.toWei(cashbackValue, 'ether')).toString(16)}`,
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
      .updateCashbackForAuthor(
        tokenId,
        `0x${new BigNumber(Web3.utils.toWei(cashbackValue, 'ether')).toString(16)}`,
      )
      .encodeABI(),
    from,
  }
  return await celoUtils.prepareSignedTransactionAbstraction(wallet, tx)
}

const burnSignedTransaction = async (body: ChainBurnErc721Celo, provider?: string, testnet?: boolean) => {
  const { fromPrivateKey, tokenId, contractAddress, feeCurrency, nonce, signatureId } = body

  const celoProvider = celoUtils.getProvider(provider)
  const network = await celoProvider.ready
  const feeCurrencyContractAddress = celoUtils.getFeeCurrency(feeCurrency, testnet)
  const contract = new new Web3().eth.Contract(Erc721Token.abi as any, contractAddress.trim())

  if (signatureId) {
    return JSON.stringify({
      chainId: network.chainId,
      feeCurrency: feeCurrencyContractAddress,
      nonce,
      gasLimit: '0',
      to: contractAddress.trim(),
      data: contract.methods.burn(tokenId).encodeABI(),
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
    data: contract.methods.burn(tokenId).encodeABI(),
    from,
  }
  return await celoUtils.prepareSignedTransactionAbstraction(wallet, tx)
}

export const erc721 = (args: { blockchain: EvmBasedBlockchain; broadcastFunction: BroadcastFunction }) => {
  return {
    prepare: {
      /**
       * Prepare a signed Celo mint erc732 transaction with the private key locally. Nothing is broadcasted to the blockchain.
       * @returns raw transaction data in hex, to be broadcasted to blockchain.
       */
      mintSignedTransaction: async (body: ChainMintErc721Celo, provider?: string, testnet?: boolean) =>
        mintSignedTransaction(body, provider, testnet),
      /**
       * Prepare a signed Celo mint cashback erc721 transaction with the private key locally. Nothing is broadcasted to the blockchain.
       * @returns raw transaction data in hex, to be broadcasted to blockchain.
       */
      mintCashbackSignedTransaction: async (body: ChainMintNftCelo, provider?: string, testnet?: boolean) =>
        mintCashbackSignedTransaction(body, provider, testnet),
      /**
       * Prepare a signed Celo mint multiple cashback erc721 transaction with the private key locally. Nothing is broadcasted to the blockchain.
       * @returns raw transaction data in hex, to be broadcasted to blockchain.
       */
      mintMultipleCashbackSignedTransaction: async (
        body: ChainMintMultipleNftCelo,
        provider?: string,
        testnet?: boolean,
      ) => mintMultipleCashbackSignedTransaction(body, provider, testnet),
      /**
       * Prepare a signed Celo mint multiple erc721 transaction with the private key locally. Nothing is broadcasted to the blockchain.
       * @returns raw transaction data in hex, to be broadcasted to blockchain.
       */
      mintMultipleSignedTransaction: async (
        body: ChainMintMultipleNftCelo,
        provider?: string,
        testnet?: boolean,
      ) => mintMultipleSignedTransaction(body, provider, testnet),
      /**
       * Prepare a signed Celo burn erc721 transaction with the private key locally. Nothing is broadcasted to the blockchain.
       * @returns raw transaction data in hex, to be broadcasted to blockchain.
       */
      burnSignedTransaction: async (body: ChainBurnErc721Celo, provider?: string, testnet?: boolean) =>
        burnSignedTransaction(body, provider, testnet),
      /**
       * Prepare a signed Celo transfer erc721 transaction with the private key locally. Nothing is broadcasted to the blockchain.
       * @returns raw transaction data in hex, to be broadcasted to blockchain.
       */
      transferSignedTransaction: async (
        body: ChainTransferErc721Celo,
        provider?: string,
        testnet?: boolean,
      ) => transferSignedTransaction(body, provider, testnet),
      /**
       * Prepare a signed Celo update cashback for author erc721 transaction with the private key locally. Nothing is broadcasted to the blockchain.
       * @returns raw transaction data in hex, to be broadcasted to blockchain.
       */
      updateCashbackForAuthorSignedTransaction: async (
        body: ChainUpdateCashbackErc721Celo,
        provider?: string,
        testnet?: boolean,
      ) => updateCashbackForAuthorSignedTransaction(body, provider, testnet),
      /**
       * Prepare a signed Celo deploy erc721 transaction with the private key locally. Nothing is broadcasted to the blockchain.
       * @returns raw transaction data in hex, to be broadcasted to blockchain.
       */
      deploySignedTransaction: async (body: ChainDeployErc721Celo, provider?: string, testnet?: boolean) =>
        deploySignedTransaction(body, provider, testnet),
      /**
       * Prepare a signed Celo mint provenance erc732 transaction with the private key locally. Nothing is broadcasted to the blockchain.
       * @returns raw transaction data in hex, to be broadcasted to blockchain.
       */
      mintProvenanceSignedTransaction: async (body: ChainMintNftCelo, provider?: string, testnet?: boolean) =>
        mintProvenanceSignedTransaction(body, provider, testnet),
      /**
       * Prepare a signed Celo mint multiple provenance cashback erc721 transaction with the private key locally. Nothing is broadcasted to the blockchain.
       * @returns raw transaction data in hex, to be broadcasted to blockchain.
       */
      mintMultipleProvenanceSignedTransaction: async (
        body: ChainMintMultipleNftCelo & { fixedValues: string[][] },
        provider?: string,
        testnet?: boolean,
      ) => mintMultipleProvenanceSignedTransaction(body, provider, testnet),
    },
    send: {
      /**
       * Send Celo mint erc721 transaction to the blockchain. This method broadcasts signed transaction to the blockchain.
       * This operation is irreversible.
       * @param testnet mainnet or testnet version
       * @param body content of the transaction to broadcast
       * @param provider url of the Celo Server to connect to. If not set, default public server will be used.
       * @returns transaction id of the transaction in the blockchain
       */
      mintSignedTransaction: async (body: ChainMintErc721Celo, provider?: string, testnet?: boolean) => {
        await args.broadcastFunction({
          txData: await mintSignedTransaction(body, provider, testnet),
          signatureId: body.signatureId,
        })
      },
      /**
       * Send Celo mint cashback erc721 transaction to the blockchain. This method broadcasts signed transaction to the blockchain.
       * This operation is irreversible.
       * @param testnet mainnet or testnet version
       * @param body content of the transaction to broadcast
       * @param provider url of the Celo Server to connect to. If not set, default public server will be used.
       * @returns transaction id of the transaction in the blockchain
       */
      mintCashbackSignedTransaction: async (body: ChainMintNftCelo, provider?: string, testnet?: boolean) =>
        await args.broadcastFunction({
          txData: (await mintCashbackSignedTransaction(body, provider, testnet)) as string,
          signatureId: body.signatureId,
        }),
      /**
       * Send Celo mint multiple cashback erc721 transaction to the blockchain. This method broadcasts signed transaction to the blockchain.
       * This operation is irreversible.
       * @param testnet mainnet or testnet version
       * @param body content of the transaction to broadcast
       * @param provider url of the Celo Server to connect to. If not set, default public server will be used.
       * @returns transaction id of the transaction in the blockchain
       */
      mintMultipleCashbackSignedTransaction: async (
        body: ChainMintMultipleNftCelo,
        provider?: string,
        testnet?: boolean,
      ) =>
        await args.broadcastFunction({
          txData: (await mintMultipleCashbackSignedTransaction(body, provider, testnet)) as string,
          signatureId: body.signatureId,
        }),
      /**
       * Send Celo mint multiple erc721 transaction to the blockchain. This method broadcasts signed transaction to the blockchain.
       * This operation is irreversible.
       * @param testnet mainnet or testnet version
       * @param body content of the transaction to broadcast
       * @param provider url of the Celo Server to connect to. If not set, default public server will be used.
       * @returns transaction id of the transaction in the blockchain
       */
      mintMultipleSignedTransaction: async (
        body: ChainMintMultipleNftCelo,
        provider?: string,
        testnet?: boolean,
      ) =>
        await args.broadcastFunction({
          txData: (await mintMultipleSignedTransaction(body, provider, testnet)) as string,
          signatureId: body.signatureId,
        }),
      /**
       * Send Celo burn erc721 transaction to the blockchain. This method broadcasts signed transaction to the blockchain.
       * This operation is irreversible.
       * @param testnet mainnet or testnet version
       * @param body content of the transaction to broadcast
       * @param provider url of the Celo Server to connect to. If not set, default public server will be used.
       * @returns transaction id of the transaction in the blockchain
       */
      burnSignedTransaction: async (body: ChainBurnErc721Celo, provider?: string, testnet?: boolean) =>
        await args.broadcastFunction({
          txData: (await burnSignedTransaction(body, provider, testnet)) as string,
          signatureId: body.signatureId,
        }),
      /**
       * Send Celo transfer nft transaction to the blockchain. This method broadcasts signed transaction to the blockchain.
       * This operation is irreversible.
       * @param testnet mainnet or testnet version
       * @param body content of the transaction to broadcast
       * @param provider url of the Celo Server to connect to. If not set, default public server will be used.
       * @returns transaction id of the transaction in the blockchain
       */
      transferSignedTransaction: async (
        body: ChainTransferErc721Celo,
        provider?: string,
        testnet?: boolean,
      ) =>
        await args.broadcastFunction({
          txData: (await transferSignedTransaction(body, provider, testnet)) as string,
          signatureId: body.signatureId,
        }),
      /**
       * Send Celo update cashback for author erc721 transaction to the blockchain. This method broadcasts signed transaction to the blockchain.
       * This operation is irreversible.
       * @param testnet mainnet or testnet version
       * @param body content of the transaction to broadcast
       * @param provider url of the Celo Server to connect to. If not set, default public server will be used.
       * @returns transaction id of the transaction in the blockchain
       */
      updateCashbackForAuthorSignedTransaction: async (
        body: ChainUpdateCashbackErc721Celo,
        provider?: string,
        testnet?: boolean,
      ) =>
        await args.broadcastFunction({
          txData: (await updateCashbackForAuthorSignedTransaction(body, provider, testnet)) as string,
          signatureId: body.signatureId,
        }),
      /**
       * Send Celo deploy erc721 transaction to the blockchain. This method broadcasts signed transaction to the blockchain.
       * This operation is irreversible.
       * @param testnet mainnet or testnet version
       * @param body content of the transaction to broadcast
       * @param provider url of the Celo Server to connect to. If not set, default public server will be used.
       * @returns transaction id of the transaction in the blockchain
       */
      deploySignedTransaction: async (body: ChainDeployErc721Celo, provider?: string, testnet?: boolean) =>
        await args.broadcastFunction({
          txData: (await deploySignedTransaction(body, provider, testnet)) as string,
          signatureId: body.signatureId,
        }),
      /**
       * Send Celo mint provenance cashback erc721 transaction to the blockchain. This method broadcasts signed transaction to the blockchain.
       * This operation is irreversible.
       * @param testnet mainnet or testnet version
       * @param body content of the transaction to broadcast
       * @param provider url of the Celo Server to connect to. If not set, default public server will be used.
       * @returns transaction id of the transaction in the blockchain
       */
      mintProvenanceSignedTransaction: async (body: ChainMintNftCelo, provider?: string, testnet?: boolean) =>
        await args.broadcastFunction({
          txData: (await mintProvenanceSignedTransaction(body, provider, testnet)) as string,
          signatureId: body.signatureId,
        }),
      /**
       * Send Celo mint multiple provenance erc721 transaction to the blockchain. This method broadcasts signed transaction to the blockchain.
       * This operation is irreversible.
       * @param testnet mainnet or testnet version
       * @param body content of the transaction to broadcast
       * @param provider url of the Celo Server to connect to. If not set, default public server will be used.
       * @returns transaction id of the transaction in the blockchain
       */
      mintMultipleProvenanceSignedTransaction: async (
        body: ChainMintMultipleNftCelo & { fixedValues: string[][] },
        provider?: string,
        testnet?: boolean,
      ) =>
        await args.broadcastFunction({
          txData: (await mintMultipleProvenanceSignedTransaction(body, provider, testnet)) as string,
          signatureId: body.signatureId,
        }),
    },
  }
}
