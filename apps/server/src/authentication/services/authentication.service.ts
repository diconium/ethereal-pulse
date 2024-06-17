import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ApiKeyRepository } from '../repositories/api-key.repository';
import { UserRepository } from 'src/user/repositories/user.repository';

@Injectable()
export class AuthenticationService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly apiKeyRepository: ApiKeyRepository,
  ) {}

  async validateUser(apiKey: string): Promise<any> {
    const user = await this.userRepository.findOne({ apiKey });
    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }

  async validateProvider(apiKey: string): Promise<any> {
    const apiKeyRecord =
      await this.apiKeyRepository.findOneWithProvider(apiKey);
    if (!apiKeyRecord) {
      throw new UnauthorizedException('Invalid API key');
    }
    return apiKeyRecord.provider;
  }
}
