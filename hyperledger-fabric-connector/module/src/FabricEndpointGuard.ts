import {CanActivate, ExecutionContext} from '@nestjs/common';
import {Request} from 'express';
import {FabricError} from './FabricError';
import {FABRIC_HEADER_ENDPOINT} from './index';

export class FabricEndpointGuard implements CanActivate {
    public canActivate(context: ExecutionContext): boolean {
        const request = context.switchToHttp().getRequest<Request>();
        if (request.header(FABRIC_HEADER_ENDPOINT)?.length) {
            return true;
        }
        throw new FabricError(`Http header ${FABRIC_HEADER_ENDPOINT} not present.`, 'header.missing', 400)
    }
}
