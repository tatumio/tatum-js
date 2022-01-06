export {
  generateDepositAddress,
  generateDepositAddresses,
  checkAddressExists,
  getWithdrawals,
  assignDepositAddress,
  removeDepositAddress,
  getDepositAddressesForAccount,
  offchainBroadcast,
  offchainStoreWithdrawal,
  offchainCancelWithdrawal,
  offchainCompleteWithdrawal,
  registerErc20Token,
  storeTokenAddress,
} from '@tatumio/tatum-core'
export { registerErc20 as registerEthereumErc20, storeErc20ContractAddress } from '@tatumio/tatum-eth'
export { storeTrcContractAddress, registerTrc as registerTronTrc } from '@tatumio/tatum-tron'
