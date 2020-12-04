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
export declare enum BasePairEnum {
    AED,
    AFN,
    ALL,
    AMD,
    ANG,
    AOA,
    ARS,
    AUD,
    AWG,
    AZN,
    BAM,
    BAT,
    BBD,
    BCH,
    BDT,
    BGN,
    BHD,
    BIF,
    BMD,
    BND,
    BOB,
    BRL,
    BSD,
    BTC,
    BTN,
    BWP,
    BYN,
    BYR,
    BZD,
    CAD,
    CDF,
    CHF,
    CLF,
    CLP,
    CNY,
    COP,
    CRC,
    CUC,
    CUP,
    CVE,
    CZK,
    DJF,
    DKK,
    DOP,
    DZD,
    EGP,
    ERN,
    ETB,
    ETH,
    EUR,
    FJD,
    FKP,
    FREE,
    GBP,
    GEL,
    GGP,
    GHS,
    GIP,
    GMD,
    GNF,
    GTQ,
    GYD,
    HKD,
    HNL,
    HRK,
    HTG,
    HUF,
    IDR,
    ILS,
    IMP,
    INR,
    IQD,
    IRR,
    ISK,
    JEP,
    JMD,
    JOD,
    JPY,
    KES,
    KGS,
    KHR,
    KMF,
    KPW,
    KRW,
    KWD,
    KYD,
    KZT,
    LAK,
    LBP,
    LEO,
    LINK,
    UNI,
    LKR,
    LRD,
    LSL,
    LTC,
    LTL,
    LVL,
    LYD,
    MAD,
    MDL,
    MGA,
    MKD,
    MKR,
    MMK,
    MMY,
    MNT,
    MOP,
    MRO,
    MUR,
    MVR,
    MWK,
    MXN,
    MYR,
    MZN,
    NAD,
    NGN,
    NIO,
    NOK,
    NPR,
    NZD,
    OMR,
    PAB,
    PAX,
    PAXG,
    PEN,
    PGK,
    PHP,
    PKR,
    PLN,
    PLTC,
    PYG,
    QAR,
    RON,
    RSD,
    RUB,
    RWF,
    SAR,
    SBD,
    SCR,
    SDG,
    SEK,
    SGD,
    SHP,
    SLL,
    SOS,
    SRD,
    STD,
    SVC,
    SYP,
    SZL,
    THB,
    TJS,
    TMT,
    TND,
    TOP,
    TRY,
    TTD,
    TUSD,
    TWD,
    TZS,
    UAH,
    UGX,
    USD,
    USDC,
    USDT,
    UYU,
    UZS,
    VEF,
    VND,
    VUV,
    WST,
    XAF,
    XAG,
    XAU,
    XCD,
    XCON,
    XDR,
    XLM,
    XOF,
    XPF,
    XRP,
    YER,
    ZAR,
    ZMK,
    ZMW,
    ZWL
}
