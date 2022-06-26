import { Test, TestingModule } from '@nestjs/testing';
import { AdminService } from './admin.service';
import { AuthDbService } from '../auth-db/auth-db.service';

describe('AdminService', () => {
  let service: AdminService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AuthDbService, AdminService],
    }).compile();

    service = module.get<AdminService>(AdminService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});