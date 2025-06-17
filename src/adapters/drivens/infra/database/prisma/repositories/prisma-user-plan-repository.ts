import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { UserPlan } from '@core/modules/plan/entities/user-plan';
import { UserPlanRepository } from '@core/modules/plan/application/ports/repositories/user-plan-repository';
import { UserPlanMapping } from './mapping/user-plan-mapping';

@Injectable()
export class PrismaUserPlanRepository implements UserPlanRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findById(id: string): Promise<UserPlan | null> {
    const userPlan = await this.prisma.userPlan.findUnique({
      where: { id },
    });

    return userPlan ? UserPlanMapping.toDomain(userPlan) : null;
  }

  async findActiveByUserId(userId: string): Promise<UserPlan | null> {
    const userPlan = await this.prisma.userPlan.findFirst({
      where: {
        user_id: userId,
        status: 'active',
      },
    });

    return userPlan ? UserPlanMapping.toDomain(userPlan) : null;
  }

  async create(userPlan: UserPlan): Promise<void> {
    await this.prisma.userPlan.create({
      data: UserPlanMapping.toPrisma(userPlan),
    });
  }

  async save(userPlan: UserPlan): Promise<void> {
    await this.prisma.userPlan.update({
      where: { id: userPlan.id.toString() },
      data: UserPlanMapping.toPrisma(userPlan),
    });
  }

  async delete(id: string): Promise<void> {
    await this.prisma.userPlan.delete({
      where: { id },
    });
  }
}
