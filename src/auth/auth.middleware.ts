import { HttpException, Injectable, NestMiddleware } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma/prisma.service';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  constructor(private prismaClient: PrismaService) {}

  async use(req: any, res: any, next: () => void) {
    const username = Number(req.headers['x-username']);
    console.info(req.headers);
    console.info(username);

    if (!username) {
      throw new HttpException('Unauthorized', 401);
    }

    const user = await this.prismaClient.user.findUnique({
      where: {
        id: username,
      },
    });

    if (user) {
      req.user = user;
      next();
    } else {
      throw new HttpException('Unauthorized', 401);
    }
    next();
  }
}
