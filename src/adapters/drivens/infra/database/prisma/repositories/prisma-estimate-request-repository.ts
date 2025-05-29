import {
  EstimateRequestRepository,
  GetAllByGeoLocationProps,
} from '@core/modules/estimate-request/application/ports/repositories/estimate-request-repository';
import { PrismaService } from '../prisma.service';
import { EstimateRequestMapping } from './mapping/estimate-request-mapping';

import { Injectable } from '@nestjs/common';
import { EstimateRequest } from '@core/modules/estimate-request/entities/estimate-request';
import { Prisma } from '@prisma/client';

@Injectable()
export class PrismaEstimateRequestRepository
  implements EstimateRequestRepository
{
  constructor(private readonly prisma: PrismaService) {}
  async findByUserId(user_id: string): Promise<EstimateRequest[]> {
    const estimaterequests = await this.prisma.estimateRequest.findMany({
      where: {
        user_id,
      },
      include: {
        proposals: true,
      },
    });

    return estimaterequests.map((estimaterequest) =>
      EstimateRequestMapping.toDomain(estimaterequest),
    );
  }

  async save(estimaterequest: EstimateRequest): Promise<void> {
    const data = EstimateRequestMapping.toPrisma(estimaterequest);

    await this.prisma.estimateRequest.create({
      data,
    });
    await this.prisma.$executeRawUnsafe(`
      UPDATE "estimate_request"
      SET "location" = ST_SetSRID(ST_MakePoint("longitude", "latitude"), 4326)::geography
      WHERE "id" = '${data.id}';
    `);
  }
  async getAllByGeoLocation({
    lat,
    long,
    radius_in_meters,
    category,
  }: GetAllByGeoLocationProps): Promise<EstimateRequest[]> {
    const nearbyIds = await this.prisma.$queryRaw<
      Array<{ id: string }>
    >(Prisma.sql`
    SELECT "id"
    FROM "estimate_request"
    WHERE ST_DWithin(
      "location",
      ST_SetSRID(ST_MakePoint(${Number(long)}, ${Number(lat)}), 4326)::geography,
      ${Number(radius_in_meters)}
    )
  `);
    const categoryWhere =
      category && category.length > 0
        ? {
            AND: category.map((cat) => ({
              category: {
                equals: cat,
                mode: Prisma.QueryMode.insensitive,
              },
            })),
          }
        : {};
    const estimateRequestIds = nearbyIds.map((r) => r.id);
    const estimate_requests = await this.prisma.estimateRequest.findMany({
      where: {
        id: { in: estimateRequestIds },

        ...categoryWhere,
      },
      include: {
        proposals: true,
      },
    });

    return estimate_requests.map((estimaterequest) =>
      EstimateRequestMapping.toDomain(estimaterequest),
    );
  }
  async findById(id: string): Promise<EstimateRequest | null> {
    const estimaterequest = await this.prisma.estimateRequest.findUnique({
      where: { id },
      include: {
        proposals: true,
        files: true,
      },
    });

    if (!estimaterequest) {
      return null;
    }

    return EstimateRequestMapping.toDomain(estimaterequest);
  }
}
