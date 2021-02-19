import {CanActivate, ExecutionContext} from '@nestjs/common';
import {Request} from 'express';
import {QuorumError} from './QuorumError';
import {HEADER_ENDPOINT} from './index';

export class EndpointGuard implements CanActivate {
    public canActivate(context: ExecutionContext): boolean {
        const request = context.switchToHttp().getRequest<Request>();
        if (request.header(HEADER_ENDPOINT)?.length) {
            return true;
        }
        throw new QuorumError(`Http header ${HEADER_ENDPOINT} not present.`, 'header.missing', 400)
    }
}
