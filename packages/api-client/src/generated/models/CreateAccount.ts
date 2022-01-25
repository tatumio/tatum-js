/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { CustomerRegistration } from './CustomerRegistration';

export type CreateAccount = {
    /**
     * Account currency. Supported values are BTC, BNB, LTC, DOGE, BCH, ETH, XLM, XRP, TRON, BSC, Tatum Virtual Currencies started with VC_ prefix (this includes FIAT currencies), USDT, WBTC, LEO, LINK, GMC, UNI, FREE, MKR, USDC, BAT, TUSD, BUSD, PAX, PAXG, PLTC, MMY, XCON, USDT_TRON, BETH, BUSD, BBTC, BADA, WBNB, BDOT, BXRP, BLTC, BBCH, CAKE, BUSD_BSC, ERC20, BEP20 or TRC-10/20 custom tokens registered in the Tatum Platform, XLM or XRP Assets created via Tatum Platform. ERC20 tokens and BEP20 tokens do not have Testnet blockchains, so it is impossible to use them in a non-production environment.
     * You can emulate behaviour by <a href="#operation/createErc20">registering your custom ERC20 token</a> in the platform and receive tokens using <a href="https://erc20faucet.com/" target="_blank">https://erc20faucet.com/</a>.
     *
     */
    currency: string;
    /**
     * Extended public key to generate addresses from.
     */
    xpub?: string;
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
    accountingCurrency?: CreateAccount.accountingCurrency;
    /**
     * Account number from external system.
     */
    accountNumber?: string;
}

export namespace CreateAccount {

    /**
     * All transaction will be accounted in this currency for all accounts. Currency can be overridden per account level. If not set, customer accountingCurrency is used or EUR by default. ISO-4217
     */
    export enum accountingCurrency {
        AED = 'AED',
        AFN = 'AFN',
        ALL = 'ALL',
        AMD = 'AMD',
        ANG = 'ANG',
        AOA = 'AOA',
        ARS = 'ARS',
        AUD = 'AUD',
        AWG = 'AWG',
        AZN = 'AZN',
        BAM = 'BAM',
        BBD = 'BBD',
        BDT = 'BDT',
        BGN = 'BGN',
        BHD = 'BHD',
        BIF = 'BIF',
        BMD = 'BMD',
        BND = 'BND',
        BOB = 'BOB',
        BRL = 'BRL',
        BSD = 'BSD',
        BTN = 'BTN',
        BWP = 'BWP',
        BYN = 'BYN',
        BYR = 'BYR',
        BZD = 'BZD',
        CAD = 'CAD',
        CDF = 'CDF',
        CHF = 'CHF',
        CLF = 'CLF',
        CLP = 'CLP',
        CNY = 'CNY',
        COP = 'COP',
        CRC = 'CRC',
        CUC = 'CUC',
        CUP = 'CUP',
        CVE = 'CVE',
        CZK = 'CZK',
        DJF = 'DJF',
        DKK = 'DKK',
        DOP = 'DOP',
        DOGE = 'DOGE',
        DZD = 'DZD',
        EGP = 'EGP',
        ERN = 'ERN',
        ETB = 'ETB',
        EUR = 'EUR',
        FJD = 'FJD',
        FKP = 'FKP',
        FLOW = 'FLOW',
        FUSD = 'FUSD',
        GBP = 'GBP',
        GEL = 'GEL',
        GGP = 'GGP',
        GHS = 'GHS',
        GIP = 'GIP',
        GMD = 'GMD',
        GNF = 'GNF',
        GTQ = 'GTQ',
        GYD = 'GYD',
        HKD = 'HKD',
        HNL = 'HNL',
        HRK = 'HRK',
        HTG = 'HTG',
        HUF = 'HUF',
        IDR = 'IDR',
        ILS = 'ILS',
        IMP = 'IMP',
        INR = 'INR',
        IQD = 'IQD',
        IRR = 'IRR',
        ISK = 'ISK',
        JEP = 'JEP',
        JMD = 'JMD',
        JOD = 'JOD',
        JPY = 'JPY',
        KES = 'KES',
        KGS = 'KGS',
        KHR = 'KHR',
        KMF = 'KMF',
        KPW = 'KPW',
        KRW = 'KRW',
        KWD = 'KWD',
        KYD = 'KYD',
        KZT = 'KZT',
        LAK = 'LAK',
        LBP = 'LBP',
        LKR = 'LKR',
        LRD = 'LRD',
        LSL = 'LSL',
        LTL = 'LTL',
        LVL = 'LVL',
        LYD = 'LYD',
        MAD = 'MAD',
        MDL = 'MDL',
        MGA = 'MGA',
        MKD = 'MKD',
        MMK = 'MMK',
        MNT = 'MNT',
        MOP = 'MOP',
        MRO = 'MRO',
        MUR = 'MUR',
        MVR = 'MVR',
        MWK = 'MWK',
        MXN = 'MXN',
        MYR = 'MYR',
        MZN = 'MZN',
        NAD = 'NAD',
        NGN = 'NGN',
        NIO = 'NIO',
        NOK = 'NOK',
        NPR = 'NPR',
        NZD = 'NZD',
        OMR = 'OMR',
        PAB = 'PAB',
        PEN = 'PEN',
        PGK = 'PGK',
        PHP = 'PHP',
        PKR = 'PKR',
        PLN = 'PLN',
        PYG = 'PYG',
        QAR = 'QAR',
        RON = 'RON',
        RSD = 'RSD',
        RUB = 'RUB',
        RWF = 'RWF',
        SAR = 'SAR',
        SBD = 'SBD',
        SCR = 'SCR',
        SDG = 'SDG',
        SEK = 'SEK',
        SGD = 'SGD',
        SHP = 'SHP',
        SLL = 'SLL',
        SOS = 'SOS',
        SRD = 'SRD',
        STD = 'STD',
        SVC = 'SVC',
        SYP = 'SYP',
        SZL = 'SZL',
        THB = 'THB',
        TJS = 'TJS',
        TMT = 'TMT',
        TND = 'TND',
        TOP = 'TOP',
        TRY = 'TRY',
        TTD = 'TTD',
        TWD = 'TWD',
        TZS = 'TZS',
        UAH = 'UAH',
        UGX = 'UGX',
        USD = 'USD',
        UYU = 'UYU',
        UZS = 'UZS',
        VEF = 'VEF',
        VND = 'VND',
        VUV = 'VUV',
        WST = 'WST',
        XAF = 'XAF',
        XAG = 'XAG',
        XAU = 'XAU',
        XCD = 'XCD',
        XDR = 'XDR',
        XOF = 'XOF',
        XPF = 'XPF',
        YER = 'YER',
        ZAR = 'ZAR',
        ZMK = 'ZMK',
        ZMW = 'ZMW',
        ZWL = 'ZWL',
    }


}
