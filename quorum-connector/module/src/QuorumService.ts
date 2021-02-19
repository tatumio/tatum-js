import {PinoLogger} from 'nestjs-pino';
import axios from 'axios';
import {TransferQuorum} from './dto/TransferQuorum';
import {QuorumError} from './QuorumError';

export abstract class QuorumService {

    protected constructor(protected readonly logger: PinoLogger) {
    }

    private static mapTransaction(tx: any) {
        return {
            blockHash: tx.blockHash,
            blockNumber: parseInt(tx.blockNumber, 16),
            from: tx.from,
            gas: parseInt(tx.gas, 16),
            gasPrice: parseInt(tx.gasPrice, 16),
            hash: tx.hash,
            input: tx.input,
            nonce: parseInt(tx.nonce, 16),
            to: tx.to,
            transactionIndex: parseInt(tx.transactionIndex, 16),
            value: tx.value,
        };
    };

    public async getBlockChainInfo(url): Promise<{ blockNumber: number }> {
        const data = (await axios.post(url, {
            'jsonrpc': '2.0',
            'method': 'eth_blockNumber',
            'params': [],
            'id': 1
        })).data;
        if (data.result) {
            return {
                blockNumber: parseInt(data.result, 16)
            };
        }
        throw new QuorumError(`Error occurred. ${data.error.message}`, 'quorum.error');
    }

    public async getBlock(hashOrHeight: string, url: string) {
        const data = (await axios.post(url, {
            'jsonrpc': '2.0',
            'method': hashOrHeight.length < 32 ? 'eth_getBlockByNumber' : 'eth_getBlockByHash',
            'params': [hashOrHeight.length < 32 ? `0x${parseInt(hashOrHeight).toString(16)}` : hashOrHeight, true],
            'id': 1
        })).data;
        if (data.result) {
            return {
                difficulty: parseInt(data.result.difficulty, 16),
                extraData: data.result.extraData,
                gasLimit: parseInt(data.result.gasLimit, 16),
                gasUsed: parseInt(data.result.gasUsed, 16),
                hash: data.result.hash,
                logsBloom: data.result.logsBloom,
                miner: data.result.miner,
                nonce: parseInt(data.result.nonce, 16),
                number: parseInt(data.result.number, 16),
                parentHash: data.result.parentHash,
                receiptRoot: data.result.receiptRoot,
                sha3Uncles: data.result.sha3Uncles,
                size: parseInt(data.result.size, 16),
                stateRoot: data.result.stateRoot,
                timestamp: parseInt(data.result.timestamp, 16),
                totalDifficulty: parseInt(data.result.totalDifficulty, 16),
                transactionRoot: data.result.transactionRoot,
                transactions: data.result.transactions.map(QuorumService.mapTransaction),
                uncles: data.result.uncles,
            };
        }
        throw new QuorumError(`Error occurred. ${data.error.message}`, 'quorum.error');
    }

    public async getTransaction(txId: string, url: string) {
        const data = (await axios.post(url, {
            'jsonrpc': '2.0',
            'method': 'eth_getTransactionByHash',
            'params': [txId],
            'id': 1
        })).data;
        if (data.result) {
            return QuorumService.mapTransaction(data.result);
        }
        throw new QuorumError(`Error occurred. ${data.error.message}`, 'quorum.error');
    }

    public async getTransactionReceipt(txId: string, url: string) {
        const data = (await axios.post(url, {
            'jsonrpc': '2.0',
            'method': 'eth_getTransactionReceipt',
            'params': [txId],
            'id': 1
        })).data;
        if (data.result) {
            return {
                blockHash: data.result.blockHash,
                contractAddress: data.result.blockHash,
                blockNumber: parseInt(data.result.blockNumber, 16),
                from: data.result.from,
                cumulativeGasUsed: parseInt(data.result.gas, 16),
                gasUsed: parseInt(data.result.gasPrice, 16),
                transactionHash: data.result.transactionHash,
                logs: data.result.logs,
                logsBloom: data.result.logsBloom,
                status: data.result.status === '0x1',
                to: data.result.to,
                transactionIndex: parseInt(data.result.transactionIndex, 16)
            };
            ;
        }
        throw new QuorumError(`Error occurred. ${data.error.message}`, 'quorum.error');
    }

    public async sendTransaction(body: TransferQuorum, url: string): Promise<{ txId: string }> {
        const data = (await axios.post(url, {
            'jsonrpc': '2.0',
            'method': 'eth_sendTransaction',
            'params': [body],
            'id': 1
        })).data;
        if (data.result) {
            return {txId: data.result};
        }
        throw new QuorumError(`Error occurred. ${data.error.message}`, 'quorum.error');
    }

    public async web3Method(body: any, url: string) {
        return (await axios.post(url, body)).data;
    }

    public async generateAccount(password: string, url: string): Promise<{ address: string }> {
        const data = (await axios.post(url, {
            'jsonrpc': '2.0',
            'method': 'personal_newAccount',
            'params': [password],
            'id': 1
        })).data;
        if (data.result) {
            return {
                address: data.result
            };
        }
        throw new QuorumError(`Error occurred. ${data.error.message}`, 'quorum.error');
    }

    public async unlockAccount(address: string, password: string, url: string) {
        const data = (await axios.post(url, {
            'jsonrpc': '2.0',
            'method': 'personal_unlockAccount',
            'params': [address, password],
            'id': 1
        })).data;
        if (data.result) {
            return {success: data.result};
        }
        throw new QuorumError(`Error occurred. ${data.error.message}`, 'quorum.error');
    }
}
