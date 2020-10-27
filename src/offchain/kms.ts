import axios from 'axios';
import {TATUM_API_URL} from '../constants';
import {TransferBtcBasedOffchainKMS} from '../model/request/TransferBtcBasedOffchainKMS';
import {TransferEthErc20OffchainKMS} from '../model/request/TransferEthErc20OffchainKMS';
import {TransferEthOffchainKMS} from '../model/request/TransferEthOffchainKMS';
import {SignatureId} from '../model/response/common/SignatureId';

/**
 * For more details, see <a href="https://tatum.io/apidoc#operation/BtcTransfer" target="_blank">Tatum API documentation</a>
 */
export const offchainTransferBtcKMS = async (body: TransferBtcBasedOffchainKMS): Promise<SignatureId> => {
    return (await axios.post(`${process.env.TATUM_API_URL || TATUM_API_URL}/v3/offchain/bitcoin/transfer`, body,
        {headers: {'x-api-key': process.env.TATUM_API_KEY}})).data;
};

/**
 * For more details, see <a href="https://tatum.io/apidoc#operation/LtcTransfer" target="_blank">Tatum API documentation</a>
 */
export const offchainTransferLtcKMS = async (body: TransferBtcBasedOffchainKMS): Promise<SignatureId> => {
    return (await axios.post(`${process.env.TATUM_API_URL || TATUM_API_URL}/v3/offchain/litecoin/transfer`, body,
        {headers: {'x-api-key': process.env.TATUM_API_KEY}})).data;
};

/**
 * For more details, see <a href="https://tatum.io/apidoc#operation/BchTransfer" target="_blank">Tatum API documentation</a>
 */
export const offchainTransferBcashKMS = async (body: TransferBtcBasedOffchainKMS): Promise<SignatureId> => {
    return (await axios.post(`${process.env.TATUM_API_URL || TATUM_API_URL}/v3/offchain/bcash/transfer`, body,
        {headers: {'x-api-key': process.env.TATUM_API_KEY}})).data;
};

/**
 * For more details, see <a href="https://tatum.io/apidoc#operation/EthTransfer" target="_blank">Tatum API documentation</a>
 */
export const offchainTransferEthKMS = async (body: TransferEthOffchainKMS): Promise<SignatureId> => {
    return (await axios.post(`${process.env.TATUM_API_URL || TATUM_API_URL}/v3/offchain/ethereum/transfer`, body,
        {headers: {'x-api-key': process.env.TATUM_API_KEY}})).data;
};

/**
 * For more details, see <a href="https://tatum.io/apidoc#operation/EthTransferErc20" target="_blank">Tatum API documentation</a>
 */
export const offchainTransferEthErc20KMS = async (body: TransferEthErc20OffchainKMS): Promise<SignatureId> => {
    return (await axios.post(`${process.env.TATUM_API_URL || TATUM_API_URL}/v3/offchain/ethereum/erc20/transfer`, body,
        {headers: {'x-api-key': process.env.TATUM_API_KEY}})).data;
};

/**
 * For more details, see <a href="https://tatum.io/apidoc#operation/XlmTransfer" target="_blank">Tatum API documentation</a>
 */
export const offchainTransferXlmKMS = async (body: TransferBtcBasedOffchainKMS): Promise<SignatureId> => {
    return (await axios.post(`${process.env.TATUM_API_URL || TATUM_API_URL}/v3/offchain/xlm/transfer`, body,
        {headers: {'x-api-key': process.env.TATUM_API_KEY}})).data;
};

/**
 * For more details, see <a href="https://tatum.io/apidoc#operation/XrpTransfer" target="_blank">Tatum API documentation</a>
 */
export const offchainTransferXrpKMS = async (body: TransferBtcBasedOffchainKMS): Promise<SignatureId> => {
    return (await axios.post(`${process.env.TATUM_API_URL || TATUM_API_URL}/v3/offchain/xrp/transfer`, body,
        {headers: {'x-api-key': process.env.TATUM_API_KEY}})).data;
};
