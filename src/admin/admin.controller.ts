import { Response } from 'express';
import { ApiTags } from '@nestjs/swagger';
import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpStatus,
  Res,
} from '@nestjs/common';
import { AdminService } from './admin.service';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { UpdateUserDto } from '../users/dto/update-user.dto';

@ApiTags('Admin Routes')
@Controller('api/v1/admin')
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  @Post()
  async create(@Res() res: Response, @Body() createAdminDto: CreateUserDto) {
    await this.adminService.create(createAdminDto);

    res.status(HttpStatus.CREATED).end();
  }

  @Get()
  async findAll() {
    return await this.adminService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.adminService.findOne(id);
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateAdminDto: UpdateUserDto) {
    const user = await this.adminService.update(id, updateAdminDto);
    return user;
  }

  @Delete(':id')
  async remove(@Res() res: Response, @Param('id') id: string) {
    await this.adminService.remove(id);

    res.status(HttpStatus.NO_CONTENT).end();
  }
}
