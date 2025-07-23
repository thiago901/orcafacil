import { UseCaseError } from '@core/common/errors/use-case-error';

export class ResourceAlreadyExistsError extends Error implements UseCaseError {
  constructor() {
    super('User already exists');
  }
}
