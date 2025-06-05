import { Module } from '@nestjs/common';
import { ServeStaticModule } from '@nestjs/serve-static';
import { HTTPModule } from '@adapters/drivers/http/http.module';

import { ConfigModule } from '@nestjs/config';

import { schemaEnv } from '@adapters/drivens/infra/envs/env';
import { EnvModule } from '@adapters/drivens/infra/envs/env.module';
import DatabaseModule from '@adapters/drivens/infra/database/prisma/database.module';
import { ThrottlerModule } from '@nestjs/throttler';
import { ProviderModule } from '@adapters/drivens/providers/provider.module';
import { AuthModule } from '@adapters/drivens/infra/auth/auth.module';
import { join } from 'node:path';
import { WebSocketModule } from '@adapters/drivers/web-socket/web-socket.module';

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(process.cwd(), 'temp'),
      serveRoot: '/temp',
      serveStaticOptions: {
        index: false,
      },
    }),
    WebSocketModule,
    EnvModule,
    HTTPModule,
    AuthModule,
    ConfigModule.forRoot({
      validate: (env) => schemaEnv.parse(env),
      isGlobal: true,
    }),

    {
      module: DatabaseModule,
      global: true,
    },
    {
      module: ProviderModule,
      global: true,
    },
    ThrottlerModule.forRoot([
      {
        ttl: 60000,
        limit: 10,
      },
    ]),
  ],
  controllers: [],
})
export class AppModule {}
