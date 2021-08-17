import { get, upload, httpDelete } from '../connector/tatum'

/**
 * Stores file on the IPFS. This operation is available only for paid plans.
 * For more details, see <a href="https://tatum.io/apidoc#operation/StoreIPFS" target="_blank">Tatum API documentation</a>
 */

export const ipfsUpload = async (file: Buffer): Promise<{ ipfsHash: string }> => upload(`/v3/ipfs`, { file: Uint8Array.from(file) },)
/**
 * Gets data from the IPFS. Every 100 kB of data costs 1 additional credit.
 * For more details, see <a href="https://tatum.io/apidoc#operation/StoreIPFS" target="_blank">Tatum API documentation</a>
 */
export const ipfsGet = async (id: string): Promise<any> => get(`/v3/ipfs/${id}`)
/**
 * Unpin the data from the IPFS. After this operation, credits won't be charged for a storage, but file will keep exists on the IPFS.
 * For more details, see <a href="https://tatum.io/apidoc#operation/StoreIPFS" target="_blank">Tatum API documentation</a>
 */
export const ipfsDelete = async (id: string): Promise<any> => httpDelete(`/v3/ipfs/${id}`)