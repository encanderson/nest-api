import { Test, TestingModule } from '@nestjs/testing';
import { AuthDbService } from '../auth-db/auth-db-service';
import { AdminController } from './admin.controller';
import { AdminService } from './admin.service';
import { SecurityService } from '../security/security.service';

describe('AdminController', () => {
  let controller: AdminController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AdminController],
      providers: [AuthDbService, SecurityService, AdminService],
    }).compile();

    controller = module.get<AdminController>(AdminController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});

describe('AdminController', () => {
  let adminController: AdminController;
  let adminService: AdminService;
  let dbService: AuthDbService;
  let securityService: SecurityService;

  beforeEach(() => {
    dbService = new AuthDbService();
    adminService = new AdminService(dbService, securityService);
    adminController = new AdminController(adminService);
  });

  describe('findAll', () => {
    it('should return an array of users', async () => {
      const result = [
        {
          app: 'profile',
          active: false,
          email: 'name@exemplo.com',
          id: 'e38c27d4-066e-4c4a-9af9-28eba66a894a',
          name: 'Herbert Viana',
          picture: null,
          user_id: 'c0e60e1cc40f',
        },
      ];
      jest
        .spyOn(adminService, 'findAll')
        .mockImplementation(async () => result);

      expect(await adminController.findAll()).toBe(result);
    });
  });
});
