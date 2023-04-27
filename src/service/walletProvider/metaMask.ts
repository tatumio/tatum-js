import { Container, Service } from 'typedi'
import { CONFIG, Constant, Utils } from '../../util'
import { TxPayload } from '../../dto'
import { BigNumber } from 'bignumber.js'
import { TatumConfig } from '../tatum'
import { EvmBasedRpc } from '../rpc'

@Service({
  factory: (data: { id: string }) => {
    return new MetaMask(data.id)
  },
  transient: true,
})
export class MetaMask<T extends EvmBasedRpc> {
  private readonly config: TatumConfig
  private readonly rpc: T
  constructor(private readonly id: string) {
    this.config = Container.of(this.id).get(CONFIG)
    this.rpc = Utils.getRpc<T>(this.id, this.config.network)
  }

  /**
   * Connect to MetaMask wallet. this method checks if MetaMask is installed and if it is connected to the browser.
   * If so, it returns the address of the connected account. If not, it throws an error.
   * @returns address of the connected account.
   */
  async connect(): Promise<string> {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    if (typeof window.ethereum === 'undefined') {
      throw new Error('MetaMask is not installed or its impossible to connect to it.')
    }
    try {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' })
      return accounts[0] as string
    } catch (error) {
      console.error('User denied account access:', error);
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
      from: await this.connect(),
      value: `0x${new BigNumber(amount).dividedBy(10 ** Constant.DECIMALS[this.config.network]).toString(16)}`,
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
      console.error('User denied transaction signature:', e);
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
    const decimals = await this.rpc.getTokenDecimals(tokenAddress)
    const payload: TxPayload = {
      to: tokenAddress,
      from: await this.connect(),
      data: `0xa9059cbb${Utils.padWithZero(recipient)}${new BigNumber(amount).dividedBy(10 ** decimals.toNumber()).toString(16).padStart(64, '0')}`,
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
      console.error('User denied transaction signature:', e);
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
    const from = await this.connect()
    const payload: TxPayload = {
      to: tokenAddress,
      from: from,
      data: `0x42842e0e${Utils.padWithZero(from)}${Utils.padWithZero(recipient)}${new BigNumber(tokenId).toString(16).padStart(64, '0')}`,
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
      console.error('User denied transaction signature:', e);
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
    const decimals = await this.rpc.getTokenDecimals(tokenAddress)
    const payload: TxPayload = {
      to: tokenAddress,
      from: await this.connect(),
      data: `0x095ea7b3${Utils.padWithZero(spender)}${new BigNumber(amount).dividedBy(10 ** decimals.toNumber()).toString(16).padStart(64, '0')}`,
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
      console.error('User denied transaction signature:', e);
      throw new Error(`User denied transaction signature. Error is ${e}`)
    }
  }

  /**
   * Sign custom transaction with MetaMask wallet. This method checks if MetaMask is installed and if it is connected to the browser.
   * If so, it returns the signed transaction hash. If not, it throws an error.
   * @param payload Transaction payload. From field is ignored and will be overwritten by the connected account.
   */
  async customPayload(payload: TxPayload): Promise<string> {
    payload.from = await this.connect()
    try {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      // eslint-disable-next-line @typescript-eslint/return-await
      return await window.ethereum.request({
        method: 'eth_sendTransaction',
        params: [payload],
      })
    } catch (e) {
      console.error('User denied transaction signature:', e);
      throw new Error(`User denied transaction signature. Error is ${e}`)
    }
  }
}
