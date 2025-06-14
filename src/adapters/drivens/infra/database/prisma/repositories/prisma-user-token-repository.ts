import { UserTokenRepository } from '@core/modules/user/application/ports/repositories/user-token-repository';
import { PrismaService } from '../prisma.service';

import { Injectable } from '@nestjs/common';

import { UserTokenMapping } from './mapping/user-token-mapping';
import { UserToken } from '@core/modules/user/entities/user-token';

@Injectable()
export class PrismaUserTokenRepository implements UserTokenRepository {
  constructor(private readonly prisma: PrismaService) {}
  async save(user_token: UserToken): Promise<void> {
    const data = UserTokenMapping.toPrisma(user_token);

    await this.prisma.userToken.update({
      where: { id: user_token.id.toString() },
      data,
    });
  }
  async findByToken(token: string): Promise<UserToken | null> {
    const usertoken = await this.prisma.userToken.findUnique({
      where: { token },
    });

    if (!usertoken) {
      return null;
    }

    return UserTokenMapping.toDomain(usertoken);
  }
  async create(usertoken: UserToken): Promise<void> {
    const data = UserTokenMapping.toPrisma(usertoken);

    await this.prisma.userToken.create({
      data,
    });
  }

  async findById(id: string): Promise<UserToken | null> {
    const usertoken = await this.prisma.userToken.findUnique({
      where: { id },
    });

    if (!usertoken) {
      return null;
    }

    return UserTokenMapping.toDomain(usertoken);
  }

  async delete(id: string): Promise<void> {
    await this.prisma.userToken.delete({
      where: { id },
    });
  }
}
