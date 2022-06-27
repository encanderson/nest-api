import { Test, TestingModule } from '@nestjs/testing';

import { AuthService } from './auth.service';
import { AuthDbService } from '../auth-db/auth-db-service';
import { SecurityModule } from '../security/security.module';

describe('AuthService', () => {
  let service: AuthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [SecurityModule],
      providers: [AuthDbService, AuthService],
    }).compile();

    service = module.get<AuthService>(AuthService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
