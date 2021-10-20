// import erc20TokenABI from '@tatumio/tatum-core/dist/contracts/erc20/erc20TokenABI';
import {helperBroadcastTx, helperGetWeb3Client} from '../helpers';
import {ApproveErc20, Currency, erc20TokenABI} from '@tatumio/tatum-core';

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
    throw new Error(`Unsupported combination of inputs at ${body.chain || 'blockchain'}`);
    // await validateBody(body, ApproveErc20);
    // // let amount;
    // switch (body.chain) {
    //     case Currency.CELO:
    //         amount = new BigNumber(body.amount).multipliedBy(new BigNumber(10).pow(await getCeloErc20ContractDecimals(testnet, body.contractAddress, provider))).toString(16);
    //         break;
    //     case Currency.ONE:
    //         amount = new BigNumber(body.amount).multipliedBy(new BigNumber(10).pow(await getOne20ContractDecimals(testnet, body.contractAddress, provider))).toString(16);
    //         break;
    //     case Currency.ETH:
    //         amount = new BigNumber(body.amount).multipliedBy(new BigNumber(10).pow(await getEthErc20ContractDecimals(testnet, body.contractAddress, provider))).toString(16);
    //         break;
    //     case Currency.BSC:
    //         amount = new BigNumber(body.amount).multipliedBy(new BigNumber(10).pow(await getBscBep20ContractDecimals(testnet, body.contractAddress, provider))).toString(16);
    //         break;
    //     case Currency.MATIC:
    //         amount = new BigNumber(body.amount).multipliedBy(new BigNumber(10).pow(await getPolygonErc20ContractDecimals(testnet, body.contractAddress, provider))).toString(16);
    //         break;
    //     default:
    // }
    // const params = [body.spender.trim(), `0x${amount}`];
    // body.amount = '0';
    // return await helperPrepareSCCall(testnet, body, ApproveErc20, 'approve', params, undefined, provider, erc20TokenABI);
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
    return (new web3.eth.Contract(erc20TokenABI, contractAddress)).methods.decimals().call();
};
