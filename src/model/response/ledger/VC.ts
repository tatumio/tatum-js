/**
 *
 * @export
 * @interface VC
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
     * Ethereum address, where initial supply was minted.
     * @type {string}
     * @memberof VC
     */
    initialAddress?: string;
}


export enum BasePairEnum {
    AED = 'AED' as any,
    AFN = 'AFN' as any,
    ALL = 'ALL' as any,
    AMD = 'AMD' as any,
    ANG = 'ANG' as any,
    AOA = 'AOA' as any,
    ARS = 'ARS' as any,
    AUD = 'AUD' as any,
    AWG = 'AWG' as any,
    AZN = 'AZN' as any,
    BAM = 'BAM' as any,
    BAT = 'BAT' as any,
    BBD = 'BBD' as any,
    BCH = 'BCH' as any,
    BDT = 'BDT' as any,
    BGN = 'BGN' as any,
    BHD = 'BHD' as any,
    BIF = 'BIF' as any,
    BMD = 'BMD' as any,
    BND = 'BND' as any,
    BOB = 'BOB' as any,
    BRL = 'BRL' as any,
    BSD = 'BSD' as any,
    BTC = 'BTC' as any,
    BTN = 'BTN' as any,
    BWP = 'BWP' as any,
    BYN = 'BYN' as any,
    BYR = 'BYR' as any,
    BZD = 'BZD' as any,
    CAD = 'CAD' as any,
    CDF = 'CDF' as any,
    CHF = 'CHF' as any,
    CLF = 'CLF' as any,
    CLP = 'CLP' as any,
    CNY = 'CNY' as any,
    COP = 'COP' as any,
    CRC = 'CRC' as any,
    CUC = 'CUC' as any,
    CUP = 'CUP' as any,
    CVE = 'CVE' as any,
    CZK = 'CZK' as any,
    DJF = 'DJF' as any,
    DKK = 'DKK' as any,
    DOP = 'DOP' as any,
    DZD = 'DZD' as any,
    EGP = 'EGP' as any,
    ERN = 'ERN' as any,
    ETB = 'ETB' as any,
    ETH = 'ETH' as any,
    EUR = 'EUR' as any,
    FJD = 'FJD' as any,
    FKP = 'FKP' as any,
    FREE = 'FREE' as any,
    GBP = 'GBP' as any,
    GEL = 'GEL' as any,
    GGP = 'GGP' as any,
    GHS = 'GHS' as any,
    GIP = 'GIP' as any,
    GMD = 'GMD' as any,
    GNF = 'GNF' as any,
    GTQ = 'GTQ' as any,
    GYD = 'GYD' as any,
    HKD = 'HKD' as any,
    HNL = 'HNL' as any,
    HRK = 'HRK' as any,
    HTG = 'HTG' as any,
    HUF = 'HUF' as any,
    IDR = 'IDR' as any,
    ILS = 'ILS' as any,
    IMP = 'IMP' as any,
    INR = 'INR' as any,
    IQD = 'IQD' as any,
    IRR = 'IRR' as any,
    ISK = 'ISK' as any,
    JEP = 'JEP' as any,
    JMD = 'JMD' as any,
    JOD = 'JOD' as any,
    JPY = 'JPY' as any,
    KES = 'KES' as any,
    KGS = 'KGS' as any,
    KHR = 'KHR' as any,
    KMF = 'KMF' as any,
    KPW = 'KPW' as any,
    KRW = 'KRW' as any,
    KWD = 'KWD' as any,
    KYD = 'KYD' as any,
    KZT = 'KZT' as any,
    LAK = 'LAK' as any,
    LBP = 'LBP' as any,
    LEO = 'LEO' as any,
    LINK = 'LINK' as any,
    UNI = 'UNI' as any,
    LKR = 'LKR' as any,
    LRD = 'LRD' as any,
    LSL = 'LSL' as any,
    LTC = 'LTC' as any,
    LTL = 'LTL' as any,
    LVL = 'LVL' as any,
    LYD = 'LYD' as any,
    MAD = 'MAD' as any,
    MDL = 'MDL' as any,
    MGA = 'MGA' as any,
    MKD = 'MKD' as any,
    MKR = 'MKR' as any,
    MMK = 'MMK' as any,
    MMY = 'MMY' as any,
    MNT = 'MNT' as any,
    MOP = 'MOP' as any,
    MRO = 'MRO' as any,
    MUR = 'MUR' as any,
    MVR = 'MVR' as any,
    MWK = 'MWK' as any,
    MXN = 'MXN' as any,
    MYR = 'MYR' as any,
    MZN = 'MZN' as any,
    NAD = 'NAD' as any,
    NGN = 'NGN' as any,
    NIO = 'NIO' as any,
    NOK = 'NOK' as any,
    NPR = 'NPR' as any,
    NZD = 'NZD' as any,
    OMR = 'OMR' as any,
    PAB = 'PAB' as any,
    PAX = 'PAX' as any,
    PAXG = 'PAXG' as any,
    PEN = 'PEN' as any,
    PGK = 'PGK' as any,
    PHP = 'PHP' as any,
    PKR = 'PKR' as any,
    PLN = 'PLN' as any,
    PLTC = 'PLTC' as any,
    PYG = 'PYG' as any,
    QAR = 'QAR' as any,
    RON = 'RON' as any,
    RSD = 'RSD' as any,
    RUB = 'RUB' as any,
    RWF = 'RWF' as any,
    SAR = 'SAR' as any,
    SBD = 'SBD' as any,
    SCR = 'SCR' as any,
    SDG = 'SDG' as any,
    SEK = 'SEK' as any,
    SGD = 'SGD' as any,
    SHP = 'SHP' as any,
    SLL = 'SLL' as any,
    SOS = 'SOS' as any,
    SRD = 'SRD' as any,
    STD = 'STD' as any,
    SVC = 'SVC' as any,
    SYP = 'SYP' as any,
    SZL = 'SZL' as any,
    THB = 'THB' as any,
    TJS = 'TJS' as any,
    TMT = 'TMT' as any,
    TND = 'TND' as any,
    TOP = 'TOP' as any,
    TRY = 'TRY' as any,
    TTD = 'TTD' as any,
    TUSD = 'TUSD' as any,
    TWD = 'TWD' as any,
    TZS = 'TZS' as any,
    UAH = 'UAH' as any,
    UGX = 'UGX' as any,
    USD = 'USD' as any,
    USDC = 'USDC' as any,
    USDT = 'USDT' as any,
    UYU = 'UYU' as any,
    UZS = 'UZS' as any,
    VEF = 'VEF' as any,
    VND = 'VND' as any,
    VUV = 'VUV' as any,
    WST = 'WST' as any,
    XAF = 'XAF' as any,
    XAG = 'XAG' as any,
    XAU = 'XAU' as any,
    XCD = 'XCD' as any,
    XCON = 'XCON' as any,
    XDR = 'XDR' as any,
    XLM = 'XLM' as any,
    XOF = 'XOF' as any,
    XPF = 'XPF' as any,
    XRP = 'XRP' as any,
    YER = 'YER' as any,
    ZAR = 'ZAR' as any,
    ZMK = 'ZMK' as any,
    ZMW = 'ZMW' as any,
    ZWL = 'ZWL' as any
}
