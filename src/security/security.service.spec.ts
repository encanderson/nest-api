import { Test, TestingModule } from '@nestjs/testing';
import { TokensModule } from './tokens/tokens.module';
import { HashService } from './tokens/hash.service';

describe('SecurityService', () => {
  let service: HashService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [TokensModule],
      providers: [TokensModule],
    }).compile();

    service = module.get<HashService>(HashService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
