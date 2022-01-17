/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { CustomerRegistration } from './CustomerRegistration';

export type DeployErc20OffchainMnemonicAddress = {
    /**
     * Name of the ERC20 token - stored as a symbol on Blockchain
     */
    symbol: string;
    /**
     * max supply of ERC20 token.
     */
    supply: string;
    /**
     * Description of the ERC20 token
     */
    description: string;
    /**
     * Base pair for ERC20 token. 1 token will be equal to 1 unit of base pair. Transaction value will be calculated according to this base pair.
     */
    basePair: DeployErc20OffchainMnemonicAddress.basePair;
    /**
     * Exchange rate of the base pair. Each unit of the created curency will represent value of baseRate*1 basePair.
     */
    baseRate?: number;
    customer?: CustomerRegistration;
    /**
     * Address on Ethereum blockchain, where all initial supply will be stored. Either xpub and derivationIndex, or address must be present, not both.
     */
    address: string;
    /**
     * Mnemonic to generate private key for the deploy account of ERC20, from which the gas will be paid (index will be used). If address is not present, mnemonic is used to generate xpub and index is set to 1. Either mnemonic and index or privateKey and address must be present, not both.
     */
    mnemonic: string;
    /**
     * derivation index of address to pay for deployment of ERC20
     */
    index: number;
    /**
     * Nonce to be set to Ethereum transaction. If not present, last known nonce will be used.
     */
    nonce?: number;
}

export namespace DeployErc20OffchainMnemonicAddress {

    /**
     * Base pair for ERC20 token. 1 token will be equal to 1 unit of base pair. Transaction value will be calculated according to this base pair.
     */
    export enum basePair {
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
        BAT = 'BAT',
        BBD = 'BBD',
        BCH = 'BCH',
        BDT = 'BDT',
        BGN = 'BGN',
        BHD = 'BHD',
        BIF = 'BIF',
        BMD = 'BMD',
        BND = 'BND',
        BOB = 'BOB',
        BRL = 'BRL',
        BSD = 'BSD',
        BTC = 'BTC',
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
        ETH = 'ETH',
        EUR = 'EUR',
        FJD = 'FJD',
        FKP = 'FKP',
        FLOW = 'FLOW',
        FUSD = 'FUSD',
        FREE = 'FREE',
        GMC = 'GMC',
        GMC_BSC = 'GMC_BSC',
        RMD = 'RMD',
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
        LEO = 'LEO',
        LINK = 'LINK',
        LKR = 'LKR',
        LRD = 'LRD',
        LSL = 'LSL',
        LTC = 'LTC',
        LTL = 'LTL',
        LVL = 'LVL',
        LYD = 'LYD',
        MAD = 'MAD',
        MDL = 'MDL',
        MGA = 'MGA',
        MKD = 'MKD',
        MKR = 'MKR',
        MMK = 'MMK',
        MMY = 'MMY',
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
        PAX = 'PAX',
        PAXG = 'PAXG',
        PEN = 'PEN',
        PGK = 'PGK',
        PHP = 'PHP',
        PKR = 'PKR',
        PLN = 'PLN',
        PLTC = 'PLTC',
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
        TRON = 'TRON',
        TUSD = 'TUSD',
        BUSD = 'BUSD',
        TWD = 'TWD',
        TZS = 'TZS',
        UAH = 'UAH',
        UGX = 'UGX',
        UNI = 'UNI',
        USD = 'USD',
        USDC = 'USDC',
        USDT = 'USDT',
        USDT_TRON = 'USDT_TRON',
        USDT_MATIC = 'USDT_MATIC',
        QTUM = 'QTUM',
        UYU = 'UYU',
        UZS = 'UZS',
        VEF = 'VEF',
        VND = 'VND',
        VUV = 'VUV',
        WBTC = 'WBTC',
        WST = 'WST',
        XAF = 'XAF',
        XAG = 'XAG',
        XAU = 'XAU',
        XCD = 'XCD',
        XCON = 'XCON',
        XDR = 'XDR',
        XLM = 'XLM',
        XOF = 'XOF',
        XPF = 'XPF',
        XRP = 'XRP',
        YER = 'YER',
        ZAR = 'ZAR',
        ZMK = 'ZMK',
        ZMW = 'ZMW',
        ZWL = 'ZWL',
    }


}
