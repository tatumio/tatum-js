import { get } from '../connector/tatum'

/**
 * For more details, see <a href="https://tatum.io/apidoc#operation/CheckMalicousAddress" target="_blank">Tatum API documentation</a>
 */
export const checkMaliciousAddress = async (address: string): Promise<{ status: string }> => get(`/v3/security/address/${address}`);
