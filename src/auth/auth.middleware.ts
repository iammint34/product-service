import { ForbiddenException, Injectable, NestMiddleware } from '@nestjs/common';
import { FastifyRequest, FastifyReply } from 'fastify'
import { AuthService } from './auth.service';
import * as AWS from 'aws-sdk';
import { globalService } from 'src/global/global.service';

@Injectable()
export class authMiddleware implements NestMiddleware {
    private CognitoIdentityServiceProvider?: any
    constructor(private readonly authService: AuthService) {
        this.CognitoIdentityServiceProvider = new AWS.CognitoIdentityServiceProvider({ region: process.env.AWS_REGION });
    }

    async use(request: FastifyRequest, response: FastifyReply, next: (args?: any) => void) {
        try {
            const { authorization } = request.headers
            const token: any[] = authorization.split(' ');
            const tokenData: object = this.authService.decodeJwt(token[1]);
            const authToken: string = await this.authService.extractAuthToken(tokenData);
            const authUser: object = await this.CognitoIdentityServiceProvider.getUser({ AccessToken: authToken }).promise();
            globalService.User = { auth: { ...tokenData, ...authUser } }

            const userData = await this.authService.checkUser(globalService.User);
            if (userData === null) throw new ForbiddenException("You don't have any user records.");
            next();
        } catch (error) {
            next(error)
        }
    }
}
