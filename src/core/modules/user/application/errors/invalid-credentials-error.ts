import { UseCaseError } from '@core/common/errors/use-case-error';

export class InvalidCredentialsError extends Error implements UseCaseError {
  constructor() {
    super('Invalid credentials provided');
  }
}
