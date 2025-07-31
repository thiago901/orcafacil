import {
  Controller,
  Get,
  HttpCode,
  HttpException,
  HttpStatus,
  Param,
  UseInterceptors,
} from '@nestjs/common';

import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

import { LoggingInterceptor } from '../Interceptors/custom-logger-routes';

import { CustomerFindByIdUseCase } from '@core/modules/user/application/use-case/customer-find-by-id-use-case';
import { CustomerMapping } from '../mapping/customer-mapping';
import { CustomerFindByUserIdUseCase } from '@core/modules/user/application/use-case/customer-find-by-user-id-use-case';

@ApiTags('Customer')
@ApiBearerAuth()
@Controller('/customers')
@UseInterceptors(LoggingInterceptor)
export class CustomerController {
  constructor(
    private readonly customerFindByIdUseCase: CustomerFindByIdUseCase,
    private readonly customerFindByUserIdUseCase: CustomerFindByUserIdUseCase,
  ) {}

  @Get('/:id')
  @HttpCode(200)
  async findById(@Param('id') id: string) {
    const result = await this.customerFindByIdUseCase.execute({
      id,
    });
    if (result.isLeft()) {
      throw new HttpException(result.value || 'error', HttpStatus.NOT_FOUND);
    }

    return {
      result: CustomerMapping.toView(result.value.customer),
    };
  }
  @Get('/user/:user_id')
  @HttpCode(200)
  async findByUserId(@Param('user_id') user_id: string) {
    const result = await this.customerFindByUserIdUseCase.execute({
      user_id,
    });
    if (result.isLeft()) {
      throw new HttpException(result.value || 'error', HttpStatus.NOT_FOUND);
    }

    return {
      result: CustomerMapping.toView(result.value.customer),
    };
  }
}
