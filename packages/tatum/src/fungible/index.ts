import { ApproveErc20, Currency, prepareApproveErc20Abstraction } from '@tatumio/tatum-core';
import { helperBroadcastTx, helperGetWeb3Client, helperPrepareSCCall } from '../helpers';
import { getBscBep20ContractDecimals, getCeloErc20ContractDecimals, getEthErc20ContractDecimals, getOne20ContractDecimals, getPolygonErc20ContractDecimals } from '../transaction';
import token_abi from '@tatumio/tatum-core/src/contracts/erc20/token_abi'

/**
 * Approve ERC20 transfer for spender.
 * @param testnet chain to work with
 * @param body request data
 * @param provider optional provider to enter. if not present, Tatum Web3 will be used.
 * @returns {txId: string} Transaction ID of the operation, or signatureID in case of Tatum KMS
 */
export const sendApproveErc20 = async (testnet: boolean, body: ApproveErc20, provider?: string) =>
    helperBroadcastTx(body.chain, await prepareApproveErc20(testnet, body, provider), body.signatureId);

/**
 * Prepare approve ERC20 signed transaction.
 * @param testnet if we are on testnet or not
 * @param body body of the approve operation
 * @param provider optional Web3 provider
 */
export const prepareApproveErc20 = async (testnet: boolean, body: ApproveErc20, provider?: string) => {
    let getErc20ContractDecimalsFn: (testnet: boolean, contractAddress: string, provider?: string | undefined) => Promise<any>

    switch (body.chain) {
        case Currency.CELO:
            getErc20ContractDecimalsFn = getCeloErc20ContractDecimals
            break;
        case Currency.ONE:
            getErc20ContractDecimalsFn = getOne20ContractDecimals
            break;
        case Currency.ETH:
            getErc20ContractDecimalsFn = getEthErc20ContractDecimals
            break;
        case Currency.BSC:
            getErc20ContractDecimalsFn = getBscBep20ContractDecimals
            break;
        case Currency.MATIC:
            getErc20ContractDecimalsFn = getPolygonErc20ContractDecimals
            break;
        default:
            throw new Error('Unsupported combination of inputs.');
    }

    const { body: validatedBody, params } = await prepareApproveErc20Abstraction((testnet, contractAddress, provider?) => getErc20ContractDecimalsFn(testnet, contractAddress, provider), testnet, body, provider)
    return await helperPrepareSCCall(testnet, validatedBody, ApproveErc20, 'approve', params, undefined, provider, token_abi);
};

/**
 * Get Decimals for the ERC20 token
 * @param testnet if we are using testnet or mainnet
 * @param chain chain to query for the token
 * @param contractAddress address of the token
 * @param provider optional provider
 */
export const getErc20Decimals = async (testnet: boolean, chain: Currency, contractAddress: string, provider?: string) => {
    const web3 = helperGetWeb3Client(testnet, chain, provider);
    // @ts-ignore
    return (new web3.eth.Contract(token_abi, contractAddress)).methods.decimals().call();
};
