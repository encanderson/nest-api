import { Test, TestingModule } from '@nestjs/testing';
import { AdminService } from './admin.service';
import { AuthDbService } from '../auth-db/auth-db-service';
import { SecurityModule } from '../security/security.module';

describe('AdminService', () => {
  let service: AdminService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [SecurityModule],
      providers: [AuthDbService, AdminService],
    }).compile();

    service = module.get<AdminService>(AdminService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
