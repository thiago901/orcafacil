import { EstimateRequest } from '@core/modules/estimate-request/entities/estimate-request';
import { EstimateRequestRepository } from '../ports/repositories/estimate-request-repository';
import { Injectable } from '@nestjs/common';
import { Either, right } from '@core/common/entities/either';

interface RequestProps {
  user_id?: string;
  description: string;
  email: string;
  footage: number;
  name: string;
  phone: string;
  address_street: string;
  address_number: string;
  address_postal_code: string;
  address_neighborhood: string;
  address_state: string;
  address_city: string;
  lat: string;
  long: string;
}

type ResponseProps = Either<
  null,
  {
    estimateRequest: EstimateRequest;
  }
>;

@Injectable()
export class CreateEstimateRequestUseCase {
  constructor(
    private readonly estimateRequestRepository: EstimateRequestRepository,
  ) {}

  async execute({
    user_id,
    description,
    email,
    footage,
    name,
    phone,
    address_city,
    address_neighborhood,
    address_number,
    address_postal_code,
    address_state,
    address_street,
    lat,
    long,
  }: RequestProps): Promise<ResponseProps> {
    console.log('address', { lat, long });

    const estimateRequest = EstimateRequest.create({
      description,
      email,
      footage,
      name,
      phone,
      user_id: user_id || null,
      address: {
        city: address_city,
        latitude: Number(lat),
        longitude: Number(long),
        neighborhood: address_neighborhood,
        number: address_number,
        postal_code: address_postal_code,
        state: address_state,
        street: address_street,
      },
    });

    await this.estimateRequestRepository.save(estimateRequest);

    return right({ estimateRequest });
  }
}
