import {Currency} from '../../request';
import {WithdrawalResponseData} from '../offchain/WithdrawalResponse';

export class TransactionKMS {
    public id: string;

    public chain: Currency;

    public serializedTransaction: string;

    public hashes: string[];

    public txId?: string;

    public withdrawalId?: string;

    public index?: number;

    public withdrawalResponses?: WithdrawalResponseData[];
}
