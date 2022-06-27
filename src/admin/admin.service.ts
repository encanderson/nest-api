import { Injectable } from '@nestjs/common';
import { AuthDbService } from '../auth-db/auth-db-service';
import { UpdateUserDto } from '../users/dto/update-user.dto';
import { AdminUserDto } from './dto/create-user.dto';
import { Conflict, NotExist } from '../errors';
import { HashService } from '../security/tokens/hash.service';

import { createdAt } from '../utils';

@Injectable()
export class AdminService {
  constructor(
    private readonly authDbService: AuthDbService,
    private readonly hashService: HashService,
  ) {}

  async create(createAdminDto: AdminUserDto): Promise<void> {
    const user = await this.authDbService.user.findFirst({
      where: {
        OR: [
          {
            email: createAdminDto.email,
          },
          {
            user_id: createAdminDto.cpf,
          },
        ],
      },
    });

    if (user) {
      throw new Conflict();
    }

    const password = await this.hashService.hashPassword(
      createAdminDto.password,
    );

    const user_id = this.hashService.hashFunction(createAdminDto.cpf);

    await this.authDbService.user.create({
      data: {
        active: false,
        app: createAdminDto.app,
        email: createAdminDto.email,
        name: createAdminDto.name,
        user_id: user_id,
        password: password,
        created_at: createdAt(),
        updated_at: createdAt(),
      },
    });
  }

  async findAll() {
    const users = await this.authDbService.user.findMany({
      select: {
        app: true,
        active: true,
        email: true,
        id: true,
        name: true,
        picture: true,
        user_id: true,
      },
    });

    return users;
  }

  async findOne(id: string) {
    const user = await this.authDbService.user.findUnique({
      where: {
        id: id,
      },
      select: {
        app: true,
        active: true,
        email: true,
        id: true,
        name: true,
        picture: true,
        user_id: true,
      },
    });

    if (!user) {
      throw new NotExist();
    }

    return user;
  }

  async update(id: string, updateAdminDto: UpdateUserDto) {
    const user = await this.authDbService.user.update({
      where: {
        id: id,
      },
      data: {
        email: updateAdminDto.email,
        updated_at: createdAt(),
      },
      select: {
        app: true,
        active: true,
        email: true,
        id: true,
        name: true,
        picture: true,
        user_id: true,
      },
    });

    return user;
  }

  async remove(id: string) {
    await this.authDbService.user.delete({
      where: {
        id: id,
      },
    });
    return;
  }
}
