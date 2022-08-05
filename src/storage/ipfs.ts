import FormData from 'form-data';
import {get, httpDelete, postMultiForm} from '../connector/tatum';

/**
 * Stores file on the IPFS. This operation is available only for paid plans.
 * For more details, see <a href="https://apidoc.tatum.io/#operation/StoreIPFS" target="_blank">Tatum API documentation</a>
 */

/**
 * Upload file to the IPFS storage.
 * @param file Data buffer of the file
 * @param fileName Name of the file to upload.
 */
export const ipfsUpload = async (file: Buffer, fileName: string): Promise<{ ipfsHash: string }> => {
    const body = new FormData();
    body.append('file', file, fileName);
    return await postMultiForm('/v3/ipfs', body);
};
/**
 * Gets data from the IPFS. Every 100 kB of data costs 1 additional credit.
 * For more details, see <a href="https://apidoc.tatum.io/#operation/StoreIPFS" target="_blank">Tatum API documentation</a>
 */
export const ipfsGet = async (id: string): Promise<any> => get(`/v3/ipfs/${id}`);
/**
 * Unpin the data from the IPFS. After this operation, credits won't be charged for a storage, but file will keep exists on the IPFS.
 * For more details, see <a href="https://apidoc.tatum.io/#operation/StoreIPFS" target="_blank">Tatum API documentation</a>
 */
export const ipfsDelete = async (id: string): Promise<void> => httpDelete(`/v3/ipfs/${id}`);
