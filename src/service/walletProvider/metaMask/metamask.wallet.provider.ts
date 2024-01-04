import { BigNumber } from 'bignumber.js'
import { TatumConnector } from '../../../connector/tatum.connector'
import { EVM_BASED_NETWORKS, Network, TxPayload } from '../../../dto'
import {
  CreateErc1155NftCollection,
  CreateFungibleToken,
  CreateNftCollection,
} from '../../../dto/walletProvider'
import { Logger } from '../../../service/logger'
import { Constant, EnvUtils, Utils } from '../../../util'
import { ITatumSdkContainer, TatumSdkWalletProvider } from '../../extensions'
import { EvmRpc } from '../../rpc'
import { TatumConfig } from '../../tatum'

export class MetaMask extends TatumSdkWalletProvider<string, TxPayload> {
  supportedNetworks: Network[] = EVM_BASED_NETWORKS
  private readonly config: TatumConfig
  private readonly rpc: EvmRpc
  private readonly connector: TatumConnector
  private readonly logger: Logger

  constructor(tatumSdkContainer: ITatumSdkContainer) {
    super(tatumSdkContainer)
    this.config = this.tatumSdkContainer.getConfig()
    this.rpc = this.tatumSdkContainer.get(EvmRpc)
    this.connector = this.tatumSdkContainer.get(TatumConnector)
    this.logger = this.tatumSdkContainer.getLogger()
  }

  /**
   * Connect to MetaMask wallet. this method checks if MetaMask is installed and if it is connected to the browser.
   * If so, it returns the address of the connected account. If not, it throws an error.
   * @returns address of the connected account.
   */
  async getWallet(): Promise<string> {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    if (typeof window.ethereum === 'undefined') {
      this.logger.error('MetaMask is not installed or its impossible to connect to it.')
      throw new Error('MetaMask is not installed or its impossible to connect to it.')
    }

    if (EnvUtils.isDevelopment()) {
      this.logger.info(
        'You can get FREE testnet tokens to test your contracts on any number of chains: https://co.tatum.io/faucets',
      )
    }

    try {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' })
      return accounts[0] as string
    } catch (error) {
      this.logger.error('User denied account access:', error)
      throw new Error(`User denied account access. Error is ${error}`)
    }
  }

  /**
   * Sign native transaction with MetaMask wallet. This method checks if MetaMask is installed and if it is connected to the browser.
   * If so, it returns the signed transaction hash. If not, it throws an error.
   * @param recipient recipient of the transaction
   * @param amount amount to be sent, in native currency (ETH, BSC)
   */
  async transferNative(recipient: string, amount: string): Promise<string> {
    const payload: TxPayload = {
      to: recipient,
      from: await this.getWallet(),
      value: `0x${new BigNumber(amount)
        .multipliedBy(10 ** Constant.DECIMALS[this.config.network])
        .toString(16)}`,
    }
    try {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      // eslint-disable-next-line @typescript-eslint/return-await
      return await window.ethereum.request({
        method: 'eth_sendTransaction',
        params: [payload],
      })
    } catch (e) {
      this.logger.error('User denied transaction signature:', e)
      throw new Error(`User denied transaction signature. Error is ${e}`)
    }
  }

  /**
   * Sign ERC-20 fungible token `transfer` transaction (https://ethereum.org/en/developers/docs/standards/tokens/erc-20/#methods) with MetaMask wallet. This method checks if MetaMask is installed and if it is connected to the browser.
   * If so, it returns the signed transaction hash. If not, it throws an error.
   * @param recipient recipient of the transaction
   * @param amount amount to be sent, in token currency
   * @param tokenAddress address of the token contract
   */
  async transferErc20(recipient: string, amount: string, tokenAddress: string): Promise<string> {
    const { result: decimals } = await this.rpc.getTokenDecimals(tokenAddress)
    const payload: TxPayload = {
      to: tokenAddress,
      from: await this.getWallet(),
      data: `0xa9059cbb${Utils.padWithZero(recipient)}${new BigNumber(amount)
        .multipliedBy(10 ** decimals!.toNumber())
        .toString(16)
        .padStart(64, '0')}`,
    }
    try {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      // eslint-disable-next-line @typescript-eslint/return-await
      return await window.ethereum.request({
        method: 'eth_sendTransaction',
        params: [payload],
      })
    } catch (e) {
      this.logger.error('User denied transaction signature:', e)
      throw new Error(`User denied transaction signature. Error is ${e}`)
    }
  }

  /**
   * Deploy new ERC-721 NFT Collection contract with MetaMask wallet. This method checks if MetaMask is installed and if it is connected to the browser.
   * If so, it returns the signed transaction hash. If not, it throws an error.
   */
  async createNftCollection(body: CreateNftCollection): Promise<string> {
    const { name, symbol, baseURI, author, minter } = body
    const from = await this.getWallet()
    const { data } = await this.connector.post<{ data: string }>({
      path: `contract/deploy/prepare`,
      body: {
        contractType: 'nft',
        params: [name, symbol, baseURI || '', author || from, minter || from],
      },
    })
    const payload: TxPayload = {
      from: from,
      data,
    }
    try {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      // eslint-disable-next-line @typescript-eslint/return-await
      return await window.ethereum.request({
        method: 'eth_sendTransaction',
        params: [payload],
      })
    } catch (e) {
      this.logger.error('User denied transaction signature:', e)
      throw new Error(`User denied transaction signature. Error is ${e}`)
    }
  }

  /**
   * Deploy new ERC-20 Token (USDT or USDC like) contract with MetaMask wallet. This method checks if MetaMask is installed and if it is connected to the browser.
   * If so, it returns the signed transaction hash. If not, it throws an error.
   */
  async createFungibleToken(body: CreateFungibleToken): Promise<string> {
    const from = await this.getWallet()
    const decimals = body.decimals || 18
    const { data } = await this.connector.post<{ data: string }>({
      path: `contract/deploy/prepare`,
      body: {
        contractType: 'fungible',
        params: [
          body.name,
          body.symbol,
          decimals,
          `0x${new BigNumber(body.initialSupply).multipliedBy(10 ** decimals).toString(16)}`,
          body.initialHolder || from,
          body.admin || from,
          body.minter || from,
          body.pauser || from,
        ],
      },
    })
    const payload: TxPayload = {
      from: from,
      data,
    }
    try {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      // eslint-disable-next-line @typescript-eslint/return-await
      return await window.ethereum.request({
        method: 'eth_sendTransaction',
        params: [payload],
      })
    } catch (e) {
      this.logger.error('User denied transaction signature:', e)
      throw new Error(`User denied transaction signature. Error is ${e}`)
    }
  }

  /**
   * Deploy new ERC-1155 NFT Collection contract with MetaMask wallet. This method checks if MetaMask is installed and if it is connected to the browser.
   * If so, it returns the signed transaction hash. If not, it throws an error.
   */
  async createErc1155NftCollection(body?: CreateErc1155NftCollection): Promise<string> {
    const { author, minter, baseURI } = body || {}
    const from = await this.getWallet()
    const { data } = await this.connector.post<{ data: string }>({
      path: `contract/deploy/prepare`,
      body: {
        contractType: 'multitoken',
        params: [author || from, minter || from, baseURI || ''],
      },
    })
    const payload: TxPayload = {
      from: from,
      data,
    }
    try {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      // eslint-disable-next-line @typescript-eslint/return-await
      return await window.ethereum.request({
        method: 'eth_sendTransaction',
        params: [payload],
      })
    } catch (e) {
      this.logger.error('User denied transaction signature:', e)
      throw new Error(`User denied transaction signature. Error is ${e}`)
    }
  }

  /**
   * Sign ERC-721 non-fungible token `safeTransferFrom` transaction (https://ethereum.org/en/developers/docs/standards/tokens/erc-721/#methods) with MetaMask wallet. This method checks if MetaMask is installed and if it is connected to the browser.
   * If so, it returns the signed transaction hash. If not, it throws an error.
   * @param recipient recipient of the transaction
   * @param tokenId ID of the NFT token
   * @param tokenAddress address of the token contract
   */
  async transferNft(recipient: string, tokenId: string, tokenAddress: string): Promise<string> {
    const from = await this.getWallet()
    const payload: TxPayload = {
      to: tokenAddress,
      from: from,
      data: `0x42842e0e${Utils.padWithZero(from)}${Utils.padWithZero(recipient)}${new BigNumber(tokenId)
        .toString(16)
        .padStart(64, '0')}`,
    }
    try {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      // eslint-disable-next-line @typescript-eslint/return-await
      return await window.ethereum.request({
        method: 'eth_sendTransaction',
        params: [payload],
      })
    } catch (e) {
      this.logger.error('User denied transaction signature:', e)
      throw new Error(`User denied transaction signature. Error is ${e}`)
    }
  }

  /**
   * Sign ERC-20 fungible token `approve` transaction (https://ethereum.org/en/developers/docs/standards/tokens/erc-20/#methods) with MetaMask wallet. This method checks if MetaMask is installed and if it is connected to the browser.
   * If so, it returns the signed transaction hash. If not, it throws an error.
   * @param spender address to be approved to spend the tokens
   * @param amount amount to be sent, in token currency
   * @param tokenAddress address of the token contract
   */
  async approveErc20(spender: string, amount: string, tokenAddress: string): Promise<string> {
    const { result: decimals } = await this.rpc.getTokenDecimals(tokenAddress)
    const payload: TxPayload = {
      to: tokenAddress,
      from: await this.getWallet(),
      data: `0x095ea7b3${Utils.padWithZero(spender)}${new BigNumber(amount)
        .multipliedBy(10 ** decimals!.toNumber())
        .toString(16)
        .padStart(64, '0')}`,
    }
    try {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      // eslint-disable-next-line @typescript-eslint/return-await
      return await window.ethereum.request({
        method: 'eth_sendTransaction',
        params: [payload],
      })
    } catch (e) {
      this.logger.error('User denied transaction signature:', e)
      throw new Error(`User denied transaction signature. Error is ${e}`)
    }
  }

  /**
   * Sign custom transaction with MetaMask wallet. This method checks if MetaMask is installed and if it is connected to the browser.
   * If so, it returns the signed transaction hash. If not, it throws an error.
   * @param payload Transaction payload. From field is ignored and will be overwritten by the connected account.
   */
  async signAndBroadcast(payload: TxPayload): Promise<string> {
    payload.from = await this.getWallet()
    try {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      // eslint-disable-next-line @typescript-eslint/return-await
      return await window.ethereum.request({
        method: 'eth_sendTransaction',
        params: [payload],
      })
    } catch (e) {
      this.logger.error('User denied transaction signature:', e)
      throw new Error(`User denied transaction signature. Error is ${e}`)
    }
  }
}
