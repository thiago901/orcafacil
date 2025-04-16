import { UseCaseError } from '../use-case-error';

export class ResourceNotCreatedError extends Error implements UseCaseError {
  constructor() {
    super('Resource not created');
  }
}
