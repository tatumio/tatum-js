import {readFileSync} from 'fs';
import {ipfsUpload} from './ipfs';

describe('IPFS storage', () => {

    jest.setTimeout(99999);
    it('should store IPFS record', async () => {
        await ipfsUpload(readFileSync('/Users/ssramko/Downloads/logo_tatum.png'), 'logo_tatum.png');
    });
});
