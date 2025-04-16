import { Module } from '@nestjs/common';

import { InfoController } from './controllers/info-controller';

import DatabaseModule from '@adapters/drivens/infra/database/prisma/database.module';

@Module({
  imports: [DatabaseModule],
  controllers: [InfoController],
})
export class HTTPModule {}
