import axios from 'axios';
import {TATUM_API_URL} from '../constants';

/**
 * For more details, see <a href="https://tatum.io/apidoc.html#operation/CheckMalicousAddress" target="_blank">Tatum API documentation</a>
 */
export const checkMaliciousAddress = async (address: string): Promise<{ status: string }> => {
    return (await axios.get(`${process.env.TATUM_API_URL || TATUM_API_URL}/v3/security/address/${address}`,
        {headers: {'x-api-key': process.env.TATUM_API_KEY}})).data;
};
