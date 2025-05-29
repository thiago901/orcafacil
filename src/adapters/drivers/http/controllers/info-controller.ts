import { Controller, Get, HttpCode, UseInterceptors } from '@nestjs/common';

import * as pkg from '../../../../../package.json';

import { LoggingInterceptor } from '../Interceptors/custom-logger-routes';

import { ApiTags } from '@nestjs/swagger';
import { Public } from '@adapters/drivens/infra/auth/public';

@Controller('/info')
@ApiTags('Info')
@UseInterceptors(LoggingInterceptor)
export class InfoController {
  constructor() {}

  @Get('/')
  @Public()
  @HttpCode(200)
  async info() {
    // const result = await fetch(
    //   `https://www.cepaberto.com/api/v3/cep?cep=05847620`,
    //   {
    //     headers: {
    //       Authorization: 'Token token=4389ddce3c1872e92c4cc54e4b14d29a',
    //     },
    //   },
    // );
    // const aa = await result.json();

    // console.log('result', aa);
    return {
      version: pkg.version,
      service: pkg.name,
    };
  }
}
