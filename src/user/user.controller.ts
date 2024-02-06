import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  ParseIntPipe,
  Patch,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';
import { JwtGuard } from '../auth/guard';
import { GetUser } from '../auth/decorator';
import { Usuario } from '@prisma/client';
import { EditUserDto } from './dto';
import { UserService } from './user.service';
import {
  ApiOperation,
  ApiHeaders,
  ApiTags,
  ApiBearerAuth,
  ApiResponse,
} from '@nestjs/swagger';
import { RolesGuard } from 'src/auth/guard/auth.guard';
import { Roles } from 'src/auth/decorator/roles.decorador';
import { Role } from 'src/common/enum/role.enum';

@UseGuards(JwtGuard, RolesGuard)
@ApiBearerAuth()
@ApiTags('users - APi')
@Controller('users')
export class UserController {
  constructor(private userService: UserService) {}

  @Get('me')
  @Roles(Role.User, Role.Admin)
  @ApiOperation({ summary: 'Get myself data from DB' })
  getMe(@GetUser() user: Usuario) {
    return user;
  }

  @Get()
  @Roles(Role.User, Role.Admin)
  @ApiOperation({ summary: 'Get  all User data from DB' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'API is up',
  })
  async findAll() {
    return await this.userService.findAll();
  }

  @Get('oneUser/:id')
  @Roles(Role.User, Role.Admin)
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

  @Patch(':id')
  @Roles(Role.Admin)
  @ApiOperation({ summary: 'update a user data' })
  update(
    @Param(
      'id',
      new ParseIntPipe({ errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE }),
    )
    id: number,
    @Body(new ValidationPipe()) updateUserDto: EditUserDto,
  ) {
    return this.userService.update(id, updateUserDto);
  }

  @Delete(':id')
  @Roles(Role.Admin)
  @ApiOperation({ summary: 'delete a user data' })
  remove(
    @Param(
      'id',
      new ParseIntPipe({ errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE }),
    )
    id: number,
  ) {
    return this.userService.remove(id);
  }
}
