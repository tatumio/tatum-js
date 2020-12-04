/**
 * For more details, see <a href="https://tatum.io/apidoc#operation/CheckMalicousAddress" target="_blank">Tatum API documentation</a>
 */
export declare const checkMaliciousAddress: (address: string) => Promise<{
    status: string;
}>;
