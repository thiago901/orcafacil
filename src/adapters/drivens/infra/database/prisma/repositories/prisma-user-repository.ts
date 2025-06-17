import { PrismaService } from '../prisma.service';
import { UserMapping } from './mapping/user-mapping';

import { Injectable } from '@nestjs/common';

import {
  UserRepository,
  UserRepositoryOptions,
} from '@core/modules/user/application/ports/repositories/user-repository';
import { User } from '@core/modules/user/entities/user';

@Injectable()
export class PrismaUserRepository implements UserRepository {
  constructor(private readonly prisma: PrismaService) {}
  async save(user: User): Promise<void> {
    const data = UserMapping.toPrisma(user);

    await this.prisma.user.upsert({
      create: data,
      update: data,

      where: { id: user.id.toString() },
    });
  }
  async getAll(): Promise<User[]> {
    const users = await this.prisma.user.findMany();

    return users.map((user) => UserMapping.toDomain(user));
  }
  async findById(
    id: string,
    options?: UserRepositoryOptions,
  ): Promise<User | null> {
    const user = await this.prisma.user.findUnique({
      where: { id },
      include: options?.relations
        ? {
            ...options.relations,
          }
        : {},
    });

    if (!user) {
      return null;
    }

    return UserMapping.toDomain(user);
  }
  async findByEmail(
    email: string,
    options?: UserRepositoryOptions,
  ): Promise<User | null> {
    const user = await this.prisma.user.findFirst({
      where: { email },
      include: options?.relations
        ? {
            ...options.relations,
          }
        : {},
    });

    if (!user) {
      return null;
    }

    return UserMapping.toDomain(user);
  }
  async delete(id: string): Promise<void> {
    await this.prisma.user.delete({
      where: { id },
    });
  }
}
