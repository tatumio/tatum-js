/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

export type CreateBnbAsset = {
    /**
     * Asset name.
     */
    token: string;
    /**
     * Base pair for Asset. Transaction value will be calculated according to this base pair. e.g. 1 TOKEN123 is equal to 1 EUR, if basePair is set to EUR.
     */
    basePair: 'AED' | 'AFN' | 'ALL' | 'AMD' | 'ANG' | 'AOA' | 'ARS' | 'AUD' | 'AWG' | 'AZN' | 'BAM' | 'BAT' | 'BBD' | 'BCH' | 'BDT' | 'BGN' | 'BHD' | 'BIF' | 'BMD' | 'BND' | 'BOB' | 'BRL' | 'BSD' | 'BTC' | 'BTN' | 'BWP' | 'BYN' | 'BYR' | 'BZD' | 'CAD' | 'CDF' | 'CHF' | 'CLF' | 'CLP' | 'CNY' | 'COP' | 'CRC' | 'CUC' | 'CUP' | 'CVE' | 'CZK' | 'DJF' | 'DKK' | 'DOP' | 'DOGE' | 'DZD' | 'EGP' | 'ERN' | 'ETB' | 'ETH' | 'EUR' | 'FJD' | 'FKP' | 'FLOW' | 'FUSD' | 'FREE' | 'GMC' | 'GMC_BSC' | 'RMD' | 'GBP' | 'GEL' | 'GGP' | 'GHS' | 'GIP' | 'GMD' | 'GNF' | 'GTQ' | 'GYD' | 'HKD' | 'HNL' | 'HRK' | 'HTG' | 'HUF' | 'IDR' | 'ILS' | 'IMP' | 'INR' | 'IQD' | 'IRR' | 'ISK' | 'JEP' | 'JMD' | 'JOD' | 'JPY' | 'KES' | 'KGS' | 'KHR' | 'KMF' | 'KPW' | 'KRW' | 'KWD' | 'KYD' | 'KZT' | 'LAK' | 'LBP' | 'LEO' | 'LINK' | 'LKR' | 'LRD' | 'LSL' | 'LTC' | 'LTL' | 'LVL' | 'LYD' | 'MAD' | 'MDL' | 'MGA' | 'MKD' | 'MKR' | 'MMK' | 'MMY' | 'MNT' | 'MOP' | 'MRO' | 'MUR' | 'MVR' | 'MWK' | 'MXN' | 'MYR' | 'MZN' | 'NAD' | 'NGN' | 'NIO' | 'NOK' | 'NPR' | 'NZD' | 'OMR' | 'PAB' | 'PAX' | 'PAXG' | 'PEN' | 'PGK' | 'PHP' | 'PKR' | 'PLN' | 'PYG' | 'QAR' | 'RON' | 'RSD' | 'RUB' | 'RWF' | 'SAR' | 'SBD' | 'SCR' | 'SDG' | 'SEK' | 'SGD' | 'SHP' | 'SLL' | 'SOS' | 'SRD' | 'STD' | 'SVC' | 'SYP' | 'SZL' | 'THB' | 'TJS' | 'TMT' | 'TND' | 'TOP' | 'TRY' | 'TTD' | 'TRON' | 'TUSD' | 'BUSD' | 'TWD' | 'TZS' | 'UAH' | 'UGX' | 'UNI' | 'USD' | 'USDC' | 'USDT' | 'USDT_TRON' | 'USDT_MATIC' | 'QTUM' | 'UYU' | 'UZS' | 'VEF' | 'VND' | 'VUV' | 'WBTC' | 'WST' | 'XAF' | 'XAG' | 'XAU' | 'XCD' | 'XCON' | 'XDR' | 'XLM' | 'XOF' | 'XPF' | 'XRP' | 'YER' | 'ZAR' | 'ZMK' | 'ZMW' | 'ZWL';
}
