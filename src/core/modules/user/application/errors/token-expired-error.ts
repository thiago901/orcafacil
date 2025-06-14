import { UseCaseError } from '@core/common/errors/use-case-error';

export class TokenExpiredError extends Error implements UseCaseError {
  constructor() {
    super('Token expired');
  }
}
