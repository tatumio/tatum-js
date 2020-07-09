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
    AED = <any>'AED',
    AFN = <any>'AFN',
    ALL = <any>'ALL',
    AMD = <any>'AMD',
    ANG = <any>'ANG',
    AOA = <any>'AOA',
    ARS = <any>'ARS',
    AUD = <any>'AUD',
    AWG = <any>'AWG',
    AZN = <any>'AZN',
    BAM = <any>'BAM',
    BAT = <any>'BAT',
    BBD = <any>'BBD',
    BCH = <any>'BCH',
    BDT = <any>'BDT',
    BGN = <any>'BGN',
    BHD = <any>'BHD',
    BIF = <any>'BIF',
    BMD = <any>'BMD',
    BND = <any>'BND',
    BOB = <any>'BOB',
    BRL = <any>'BRL',
    BSD = <any>'BSD',
    BTC = <any>'BTC',
    BTN = <any>'BTN',
    BWP = <any>'BWP',
    BYN = <any>'BYN',
    BYR = <any>'BYR',
    BZD = <any>'BZD',
    CAD = <any>'CAD',
    CDF = <any>'CDF',
    CHF = <any>'CHF',
    CLF = <any>'CLF',
    CLP = <any>'CLP',
    CNY = <any>'CNY',
    COP = <any>'COP',
    CRC = <any>'CRC',
    CUC = <any>'CUC',
    CUP = <any>'CUP',
    CVE = <any>'CVE',
    CZK = <any>'CZK',
    DJF = <any>'DJF',
    DKK = <any>'DKK',
    DOP = <any>'DOP',
    DZD = <any>'DZD',
    EGP = <any>'EGP',
    ERN = <any>'ERN',
    ETB = <any>'ETB',
    ETH = <any>'ETH',
    EUR = <any>'EUR',
    FJD = <any>'FJD',
    FKP = <any>'FKP',
    FREE = <any>'FREE',
    GBP = <any>'GBP',
    GEL = <any>'GEL',
    GGP = <any>'GGP',
    GHS = <any>'GHS',
    GIP = <any>'GIP',
    GMD = <any>'GMD',
    GNF = <any>'GNF',
    GTQ = <any>'GTQ',
    GYD = <any>'GYD',
    HKD = <any>'HKD',
    HNL = <any>'HNL',
    HRK = <any>'HRK',
    HTG = <any>'HTG',
    HUF = <any>'HUF',
    IDR = <any>'IDR',
    ILS = <any>'ILS',
    IMP = <any>'IMP',
    INR = <any>'INR',
    IQD = <any>'IQD',
    IRR = <any>'IRR',
    ISK = <any>'ISK',
    JEP = <any>'JEP',
    JMD = <any>'JMD',
    JOD = <any>'JOD',
    JPY = <any>'JPY',
    KES = <any>'KES',
    KGS = <any>'KGS',
    KHR = <any>'KHR',
    KMF = <any>'KMF',
    KPW = <any>'KPW',
    KRW = <any>'KRW',
    KWD = <any>'KWD',
    KYD = <any>'KYD',
    KZT = <any>'KZT',
    LAK = <any>'LAK',
    LBP = <any>'LBP',
    LEO = <any>'LEO',
    LINK = <any>'LINK',
    LKR = <any>'LKR',
    LRD = <any>'LRD',
    LSL = <any>'LSL',
    LTC = <any>'LTC',
    LTL = <any>'LTL',
    LVL = <any>'LVL',
    LYD = <any>'LYD',
    MAD = <any>'MAD',
    MDL = <any>'MDL',
    MGA = <any>'MGA',
    MKD = <any>'MKD',
    MKR = <any>'MKR',
    MMK = <any>'MMK',
    MMY = <any>'MMY',
    MNT = <any>'MNT',
    MOP = <any>'MOP',
    MRO = <any>'MRO',
    MUR = <any>'MUR',
    MVR = <any>'MVR',
    MWK = <any>'MWK',
    MXN = <any>'MXN',
    MYR = <any>'MYR',
    MZN = <any>'MZN',
    NAD = <any>'NAD',
    NGN = <any>'NGN',
    NIO = <any>'NIO',
    NOK = <any>'NOK',
    NPR = <any>'NPR',
    NZD = <any>'NZD',
    OMR = <any>'OMR',
    PAB = <any>'PAB',
    PAX = <any>'PAX',
    PAXG = <any>'PAXG',
    PEN = <any>'PEN',
    PGK = <any>'PGK',
    PHP = <any>'PHP',
    PKR = <any>'PKR',
    PLN = <any>'PLN',
    PLTC = <any>'PLTC',
    PYG = <any>'PYG',
    QAR = <any>'QAR',
    RON = <any>'RON',
    RSD = <any>'RSD',
    RUB = <any>'RUB',
    RWF = <any>'RWF',
    SAR = <any>'SAR',
    SBD = <any>'SBD',
    SCR = <any>'SCR',
    SDG = <any>'SDG',
    SEK = <any>'SEK',
    SGD = <any>'SGD',
    SHP = <any>'SHP',
    SLL = <any>'SLL',
    SOS = <any>'SOS',
    SRD = <any>'SRD',
    STD = <any>'STD',
    SVC = <any>'SVC',
    SYP = <any>'SYP',
    SZL = <any>'SZL',
    THB = <any>'THB',
    TJS = <any>'TJS',
    TMT = <any>'TMT',
    TND = <any>'TND',
    TOP = <any>'TOP',
    TRY = <any>'TRY',
    TTD = <any>'TTD',
    TUSD = <any>'TUSD',
    TWD = <any>'TWD',
    TZS = <any>'TZS',
    UAH = <any>'UAH',
    UGX = <any>'UGX',
    USD = <any>'USD',
    USDC = <any>'USDC',
    USDT = <any>'USDT',
    UYU = <any>'UYU',
    UZS = <any>'UZS',
    VEF = <any>'VEF',
    VND = <any>'VND',
    VUV = <any>'VUV',
    WST = <any>'WST',
    XAF = <any>'XAF',
    XAG = <any>'XAG',
    XAU = <any>'XAU',
    XCD = <any>'XCD',
    XCON = <any>'XCON',
    XDR = <any>'XDR',
    XLM = <any>'XLM',
    XOF = <any>'XOF',
    XPF = <any>'XPF',
    XRP = <any>'XRP',
    YER = <any>'YER',
    ZAR = <any>'ZAR',
    ZMK = <any>'ZMK',
    ZMW = <any>'ZMW',
    ZWL = <any>'ZWL'
}
