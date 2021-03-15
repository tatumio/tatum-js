import {Body, Get, Headers, Param, Post, UseGuards} from '@nestjs/common';
import {FabricService} from './FabricService';
import {FabricError} from './FabricError';
import {FabricEndpointGuard} from './FabricEndpointGuard';
import {FABRIC_HEADER_ENDPOINT} from './index';
import {CreateRecord, Currency} from '@tatumio/tatum';

@UseGuards(FabricEndpointGuard)
export abstract class FabricController {
    protected constructor(protected readonly service: FabricService) {
    }

    @Post('v3/fabric/data')
    async storeData(@Body() body: CreateRecord, @Headers() url: object) {
        try {
            if (body.chain === Currency.FABRIC) {
                return await this.service.storeData(body.key, body.data, url[FABRIC_HEADER_ENDPOINT]);
            }
        } catch (e) {
            throw new FabricError(`Unexpected error occurred. Reason: ${e.message || e.response?.data || e}`, 'fabric.error');
        }
        throw new FabricError(`Incompatible chain.`, 'fabric.error');
    }

    @Get('/v3/fabric/data/:key')
    async getData(@Param('key') key: string, @Headers() url: object) {
        try {
            return await this.service.getData(key, url[FABRIC_HEADER_ENDPOINT]);
        } catch (e) {
            throw new FabricError(`Unexpected error occurred. Reason: ${e.message || e.response?.data || e}`, 'fabric.error');
        }
    }
}
