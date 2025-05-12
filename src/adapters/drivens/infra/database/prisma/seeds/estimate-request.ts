import { PrismaService } from '../prisma.service';

export async function estimate_request_geolocation() {
  console.log('estimate_request_geolocation');

  const prisma = new PrismaService();
  await prisma.$executeRawUnsafe(`
    CREATE EXTENSION IF NOT EXISTS postgis;

  `);
  await prisma.$executeRawUnsafe(`
    ALTER TABLE "estimate_request"
    ADD COLUMN IF NOT EXISTS "location" geography(Point, 4326);
  `);
  await prisma.$executeRawUnsafe(`
    UPDATE "estimate_request"
    SET "location" = ST_SetSRID(ST_MakePoint("longitude", "latitude"), 4326)::geography
    WHERE "location" IS NULL;
  `);
  await prisma.$executeRawUnsafe(`
    CREATE INDEX IF NOT EXISTS estimate_request_location_gist
    ON "estimate_request"
    USING GIST("location");
  `);
}

estimate_request_geolocation();
