/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { CustomerRegistration } from './CustomerRegistration';

export type DeployKCSErc20OffchainPKAddress = {
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
    basePair: 'AED' | 'AFN' | 'ALL' | 'AMD' | 'ANG' | 'AOA' | 'ARS' | 'AUD' | 'AWG' | 'AZN' | 'BAM' | 'BAT' | 'BBD' | 'BCH' | 'BDT' | 'BGN' | 'BHD' | 'BIF' | 'BMD' | 'BND' | 'BOB' | 'BRL' | 'BSD' | 'BTC' | 'BTN' | 'BWP' | 'BYN' | 'BYR' | 'BZD' | 'CAD' | 'CDF' | 'CHF' | 'CLF' | 'CLP' | 'CNY' | 'COP' | 'CRC' | 'CUC' | 'CUP' | 'CVE' | 'CZK' | 'DJF' | 'DKK' | 'DOP' | 'DOGE' | 'DZD' | 'EGP' | 'ERN' | 'ETB' | 'ETH' | 'EUR' | 'FJD' | 'FKP' | 'FLOW' | 'FUSD' | 'FREE' | 'GMC' | 'GMC_BSC' | 'RMD' | 'GBP' | 'GEL' | 'GGP' | 'GHS' | 'GIP' | 'GMD' | 'GNF' | 'GTQ' | 'GYD' | 'HKD' | 'HNL' | 'HRK' | 'HTG' | 'HUF' | 'IDR' | 'ILS' | 'IMP' | 'INR' | 'IQD' | 'IRR' | 'ISK' | 'JEP' | 'JMD' | 'JOD' | 'JPY' | 'KES' | 'KGS' | 'KHR' | 'KMF' | 'KPW' | 'KRW' | 'KWD' | 'KYD' | 'KZT' | 'LAK' | 'LBP' | 'LEO' | 'LINK' | 'LKR' | 'LRD' | 'LSL' | 'LTC' | 'LTL' | 'LVL' | 'LYD' | 'MAD' | 'MDL' | 'MGA' | 'MKD' | 'MKR' | 'MMK' | 'MMY' | 'MNT' | 'MOP' | 'MRO' | 'MUR' | 'MVR' | 'MWK' | 'MXN' | 'MYR' | 'MZN' | 'NAD' | 'NGN' | 'NIO' | 'NOK' | 'NPR' | 'NZD' | 'OMR' | 'PAB' | 'PAX' | 'PAXG' | 'PEN' | 'PGK' | 'PHP' | 'PKR' | 'PLN' | 'PYG' | 'QAR' | 'RON' | 'RSD' | 'RUB' | 'RWF' | 'SAR' | 'SBD' | 'SCR' | 'SDG' | 'SEK' | 'SGD' | 'SHP' | 'SLL' | 'SOS' | 'SRD' | 'STD' | 'SVC' | 'SYP' | 'SZL' | 'THB' | 'TJS' | 'TMT' | 'TND' | 'TOP' | 'TRY' | 'TTD' | 'TRON' | 'TUSD' | 'BUSD' | 'TWD' | 'TZS' | 'UAH' | 'UGX' | 'UNI' | 'USD' | 'USDC' | 'USDT' | 'USDT_TRON' | 'USDT_MATIC' | 'UYU' | 'UZS' | 'VEF' | 'VND' | 'VUV' | 'WBTC' | 'WST' | 'XAF' | 'XAG' | 'XAU' | 'XCD' | 'XCON' | 'XDR' | 'XLM' | 'XOF' | 'XPF' | 'XRP' | 'YER' | 'ZAR' | 'ZMK' | 'ZMW' | 'ZWL';
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
     * Private key of Ethereum account address, from which gas for deployment of ERC20 will be paid. Private key, mnemonic or signature Id must be present.
     */
    privateKey: string;
    /**
     * The nonce to be set to the transaction; if not present, the last known nonce will be used
     */
    nonce?: number;
}
