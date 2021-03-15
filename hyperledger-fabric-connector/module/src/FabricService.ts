import {PinoLogger} from 'nestjs-pino';
import axios from 'axios';
import {FabricError} from './FabricError';

export abstract class FabricService {

    protected constructor(protected readonly logger: PinoLogger) {
    }

    public async storeData(key: string, data: string, url: string): Promise<{ txId: string }> {
        try {
            const status = (await axios.post(`${url.replace(/\/$/,'')}/api/fabric/invoke`, {key, value: {data}})).data?.DATA?.success;
            if (status) {
                return {txId: key}
            }
            return status;
        } catch (e) {
            this.logger.error(e);
            throw new FabricError(`Error occurred. ${e}`, 'fabric.error');
        }
    }

    public async getData(key: string, url: string): Promise<{data: string}> {
        try {
            return {data: (await axios.post(`${url.replace(/\/$/,'')}/api/fabric/query`, {key})).data.DATA?.message?.data};
        } catch (e) {
            this.logger.error(e);
            throw new FabricError(`Error occurred. ${e}`, 'fabric.error');
        }
    }
}
