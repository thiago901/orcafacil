import { TokenProvider } from '@core/modules/user/application/ports/providers/token-provider';
import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class JwtProvider implements TokenProvider {
  constructor(private jwtService: JwtService) {}

  async sign(payload: any): Promise<string> {
    return this.jwtService.signAsync(payload);
  }
}
