import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Param,
  ParseIntPipe,
  Patch,
  UseGuards,
} from '@nestjs/common';
import { JwtGuard } from '../auth/guard';
import { GetUser } from '../auth/decorator';
import { Usuario } from '@prisma/client';
import { EditUserDto } from './dto';
import { UserService } from './user.service';
import { ApiOperation, ApiHeaders } from '@nestjs/swagger';
import { string } from 'joi';

@UseGuards(JwtGuard)
@Controller({
  version: '1',
  path: 'user',
})
export class UserController {
  constructor(private userService: UserService) {}

  @Get('me')
  getMe(@GetUser() user: Usuario) {
    return user;
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get one user data by ID' })
  findOne(
    @Param(
      'id',
      new ParseIntPipe({ errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE }),
    )
    id: number,
  ) {
    return this.userService.findOneUserByID(id);
  }

  @Patch()
  editUser(
    @GetUser('id')
    userId: number,
    @Body() dto: EditUserDto,
  ) {
    return this.userService.editUserByID(userId, dto);
  }
}
