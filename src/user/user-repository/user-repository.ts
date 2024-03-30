import { Inject, Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { PrismaService } from 'src/prisma/prisma/prisma.service';
import { Logger } from 'winston';

@Injectable()
export class UserRepository {
  constructor(
    private prismaService: PrismaService,
    @Inject(WINSTON_MODULE_PROVIDER) private logger: Logger,
  ) {
    this.logger.info('Create user repository');
  }

  async save(first_name: string, last_name: string): Promise<User> {
    this.logger.info(
      `Create user with firstName ${first_name} and lastName ${last_name}`,
    );
    return this.prismaService.user.create({
      data: {
        first_name: first_name,
        last_name: last_name,
      },
    });
  }
}
