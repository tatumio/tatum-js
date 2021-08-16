/**
 *
 * @export
 * @interface VC
 */
import {TrcType} from '../../request';

/**
 * Virtual Currency
 */
export interface VC {
    /**
     * Exchange rate of the base pair. Each unit of the created curency will represent value of baseRate*1 basePair.
     * @type {number}
     * @memberof VC
     */
    baseRate: number;
    /**
     * Base pair for virtual currency. Transaction value will be calculated according to this base pair. e.g. 1 VC_VIRTUAL is equal to 1 BTC, if basePair is set to BTC.
     * @type {string}
     * @memberof VC
     */
    basePair: BasePairEnum;
    /**
     * ID of customer associated with virtual currency.
     * @type {string}
     * @memberof VC
     */
    customerId?: string;
    /**
     * Used as a description within Tatum system.
     * @type {string}
     * @memberof VC
     */
    description: string;
    /**
     * Virtual currency name. Must be prefixed with 'VC_'.
     * @type {string}
     * @memberof VC
     */
    name: string;
    /**
     * Supply of virtual currency.
     * @type {string}
     * @memberof VC
     */
    supply: string;
    /**
     * Virtual currency account.
     * @type {string}
     * @memberof VC
     */
    accountId: string;
    /**
     * Address of ERC20 token.
     * @type {string}
     * @memberof VC
     */
    erc20Address?: string;
    /**
     * Virtual currency account, on which initial supply was minted.
     * @type {string}
     * @memberof VC
     */
    issuerAccount?: string;
    /**
     * Blockchain, on which this virtual currency is paired on. Not present, when Tatum's private ledger is used as a base ledger.
     * @type {string}
     * @memberof VC
     */
    chain?: string;
    /**
     * Number of decimal places for Tron based assets
     * @type {number}
     * @memberof VC
     */
    precision?: number;
    /**
     * In ase of Tron based VC, this is type of TRC token.
     * @type {string}
     * @memberOf VC
     */
    trcType?: TrcType;
    /**
     * Ethereum address, where initial supply was minted.
     * @type {string}
     * @memberof VC
     */
    initialAddress?: string;
}


export enum BasePairEnum {
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
    DZD = 'DZD',
    EGP = 'EGP',
    ERN = 'ERN',
    ETB = 'ETB',
    ETH = 'ETH',
    EUR = 'EUR',
    FJD = 'FJD',
    FKP = 'FKP',
    FREE = 'FREE',
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
    UNI = 'UNI',
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
    TUSD = 'TUSD',
    TWD = 'TWD',
    TZS = 'TZS',
    UAH = 'UAH',
    UGX = 'UGX',
    USD = 'USD',
    USDC = 'USDC',
    USDT = 'USDT',
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
    ZWL = 'ZWL'
}
