import { UseCaseError } from '../use-case-error';

export class UseCaseValidationError extends Error implements UseCaseError {
  constructor(message?: string) {
    super(message ? message : 'Validation error');
  }
}
