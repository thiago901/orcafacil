import { UseCaseError } from '@core/common/errors/use-case-error';

export class ResourceExceededError extends Error implements UseCaseError {
  constructor(resource: string) {
    super(`Usage limit exceeded for resource ${resource}`);
  }
}
