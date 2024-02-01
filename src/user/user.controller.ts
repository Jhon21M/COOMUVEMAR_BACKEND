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
import { Roles } from 'src/auth/decorator/roles.decorador';
import { RolesGuard } from 'src/auth/guard/auth.guard';
import { Role } from 'src/common/enum/role.enum';

@ApiBearerAuth()
@UseGuards(JwtGuard, RolesGuard)
@ApiTags('users - APi')
@Controller('users')
export class UserController {
  constructor(private userService: UserService) {}

  @Get('me')
  @ApiOperation({ summary: 'Get myself data from DB' })
  getMe(@GetUser() user: Usuario) {
    return user;
  }

  @Get()
  @ApiOperation({ summary: 'Get  all User data from DB' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'API is up',
  })
  async findAll() {
    return await this.userService.findAll();
  }

  @Roles(Role.Admin)
  @Get('oneUser/:id')
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

  @Roles(Role.Admin)
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

  @Roles(Role.Admin)
  @Delete(':id')
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
