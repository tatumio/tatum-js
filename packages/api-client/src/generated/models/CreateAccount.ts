/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { CustomerRegistration } from './CustomerRegistration';
import type { FiatCurrency } from './FiatCurrency';

export type CreateAccount = {
    /**
     * <p>The currency for the virtual account</p>
     * <ul>
     * <li><b>Native blockchain assets:</b> ALGO, BCH, BNB, BSC, BTC, CELO, DOGE, EGLD, ETH, FLOW, KCS, KLAY, LTC, MATIC, ONE, SOL, TRON, VET, XDC, XLM, XRP</li>
     * <li><b>Digital assets:</b> BADA, BAT, BBCH, BBTC, BDOT, BETH, BLTC, BUSD, BUSD_BSC, BXRP, CAKE, FREE, GMC, LEO, LINK, MKR, MMY, PAX, PAXG, TUSD, UNI, USD_BSC, USDC, USDC_MATIC, USDC_MATIC_NATIVE, USDT, USDT_TRON, WBNB, WBTC, XCON</li>
     * <li><b><a href="https://apidoc.tatum.io/tag/Virtual-Currency" target="_blank">Virtual currency</a></b> registered on the Tatum platform and starting with the "VC_" prefix</li>
     * <li><b><a href="https://apidoc.tatum.io/tag/Blockchain-operations#operation/BnbAssetOffchain" target="_blank">BNB assets</a>, <a href="https://apidoc.tatum.io/tag/Blockchain-operations#operation/XlmAssetOffchain" target="_blank">XLM assets</a>, and <a href="https://apidoc.tatum.io/tag/Blockchain-operations#operation/XrpAssetOffchain" target="_blank">XRP assets</a></b> created via the Tatum platform</li>
     * <li><b>Custom fungible tokens</b> (ERC-20 or equivalent, such as BEP-20 or TRC-10/20) registered on the Tatum platform; for more information, see <a href="https://docs.tatum.io/guides/ledger-and-off-chain/how-to-connect-custom-erc-20-token-to-the-ledger" target="_blank">our user documentation</a>
     * <br/>The fungible tokens do not have direct faucets on the testnet. To use them in a testnet environment, you have to register a new fungible token in a virtual account (use <a href="https://apidoc.tatum.io/tag/Blockchain-operations/#operation/createTrc" target="_blank">this API</a> for TRON TRC-10/20 tokens and <a href="https://apidoc.tatum.io/tag/Blockchain-operations/#operation/registerErc20Token" target="_blank">this API</a> for any other tokens) and make sure that your tokens minted on the testnet are <a href="https://apidoc.tatum.io/tag/Blockchain-operations/#operation/storeTokenAddress" target="_blank">linked to the token smart contract</a>.</li>
     * </ul>
     *
     */
    currency: string;
    customer?: CustomerRegistration;
    /**
     * Enable compliant checks. If this is enabled, it is impossible to create account if compliant check fails.
     */
    compliant?: boolean;
    /**
     * For bookkeeping to distinct account purpose.
     */
    accountCode?: string;
    /**
     * All transaction will be accounted in this currency for all accounts. Currency can be overridden per account level. If not set, customer accountingCurrency is used or EUR by default. ISO-4217
     */
    accountingCurrency?: FiatCurrency;
    /**
     * Account number from external system.
     */
    accountNumber?: string;
}
