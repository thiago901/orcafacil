import { PrismaService } from '../prisma.service';

import { Injectable } from '@nestjs/common';

import { NotificationRepository } from '@core/modules/notification/application/ports/repositories/notification-repository';
import { NotificationMapping } from './mapping/notification-mapping';
import { Notification } from '@core/modules/notification/entities/notification';

@Injectable()
export class PrismaNotificationRepository implements NotificationRepository {
  constructor(private readonly prisma: PrismaService) {}
  async create(notification: Notification): Promise<void> {
    const data = NotificationMapping.toPrisma(notification);
    await this.prisma.notification.create({
      data,
    });
  }
  async save(notification: Notification): Promise<void> {
    const data = NotificationMapping.toPrisma(notification);
    await this.prisma.notification.update({
      data,
      where: {
        id: notification.id.toString(),
      },
    });
  }
  async findById(id: string): Promise<Notification | null> {
    const notification = await this.prisma.notification.findFirst({
      where: {
        id,
      },
    });
    if (!notification) return null;
    return NotificationMapping.toDomain(notification);
  }
  async findAllByRecipientId(id: string): Promise<Notification[]> {
    const notifications = await this.prisma.notification.findMany({
      where: {
        recipient_id: id,
      },
    });

    return notifications.map(NotificationMapping.toDomain);
  }
}
