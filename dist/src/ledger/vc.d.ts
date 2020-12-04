import { CreateCurrency } from '../model/request/CreateCurrency';
import { CurrencyOperation } from '../model/request/CurrencyOperation';
import { UpdateCurrency } from '../model/request/UpdateCurrency';
import { Account } from '../model/response';
import { VC } from '../model/response/ledger/VC';
/**
 * For more details, see <a href="https://tatum.io/apidoc#operation/getCurrency" target="_blank">Tatum API documentation</a>
 */
export declare const getVirtualCurrencyByName: (name: string) => Promise<VC>;
/**
 * For more details, see <a href="https://tatum.io/apidoc#operation/createCurrency" target="_blank">Tatum API documentation</a>
 */
export declare const createVirtualCurrency: (data: CreateCurrency) => Promise<Account>;
/**
 * For more details, see <a href="https://tatum.io/apidoc#operation/updateCurrency" target="_blank">Tatum API documentation</a>
 */
export declare const updateVirtualCurrency: (data: UpdateCurrency) => Promise<void>;
/**
 * For more details, see <a href="https://tatum.io/apidoc#operation/mintCurrency" target="_blank">Tatum API documentation</a>
 */
export declare const mintVirtualCurrency: (data: CurrencyOperation) => Promise<{
    reference: string;
}>;
/**
 * For more details, see <a href="https://tatum.io/apidoc#operation/revokeCurrency" target="_blank">Tatum API documentation</a>
 */
export declare const revokeVirtualCurrency: (data: CurrencyOperation) => Promise<{
    reference: string;
}>;
