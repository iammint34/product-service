import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class AuthService {
    constructor(private jwtTokenService: JwtService, private model: PrismaService) { }

    decodeJwt(token: string): {} {
        return this.jwtTokenService.decode(token);
    }

    extractAuthToken(token: any) {
        return token.token
    }

    async checkUser(User?: { auth?: { user_id?: number } }) {
        const user_id = User?.auth?.user_id;
        const result = await this.model.user.findFirst({
            where: {
                user_id: user_id
            }
        }) 
        return result;
    }

}
