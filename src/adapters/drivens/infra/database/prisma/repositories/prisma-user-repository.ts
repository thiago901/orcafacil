import { PrismaService } from '../prisma.service';
import { UserMapping } from './mapping/user-mapping';

import { Injectable } from '@nestjs/common';

import { UserRepository } from '@core/modules/user/application/ports/repositories/user-repository';
import { User } from '@core/modules/user/entities/user';

@Injectable()
export class PrismaUserRepository implements UserRepository {
  constructor(private readonly prisma: PrismaService) {}
  async save(user: User): Promise<void> {
    const data = UserMapping.toPrisma(user);

    await this.prisma.user.update({
      where: { id: data.id },
      data,
    });
  }
  async getAll(): Promise<User[]> {
    const users = await this.prisma.user.findMany();

    return users.map((user) => UserMapping.toDomain(user));
  }
  async findById(id: string): Promise<User | null> {
    const user = await this.prisma.user.findUnique({
      where: { id },
    });

    if (!user) {
      return null;
    }

    return UserMapping.toDomain(user);
  }
  async findByEmail(email: string): Promise<User | null> {
    const user = await this.prisma.user.findFirst({
      where: { email },
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
