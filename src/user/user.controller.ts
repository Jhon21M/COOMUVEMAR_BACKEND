import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';
import { JwtGuard } from '../auth/guard';
import { GetUser } from '../auth/decorator';
import { Usuario } from '@prisma/client';
import { CreateUserDto, EditUserDto } from './dto';
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
import { EntityUser } from './entities';

@UseGuards(JwtGuard, RolesGuard)
@ApiBearerAuth()
@ApiTags('users - APi')
@Controller('users')
export class UserController {
  constructor(private userService: UserService) {}

  @Post()
  @Roles(Role.Admin)
  @ApiOperation({ summary: 'Create a new Productor' })
  create(
    @Body(new ValidationPipe()) createUserDto: CreateUserDto,
  ): Promise<EntityUser> {
    return this.userService.create(createUserDto);
  }

  @Get('me')
  @Roles(Role.User, Role.Admin)
  @ApiOperation({ summary: 'Get myself data from DB' })
  getMe(@GetUser() user: Usuario) {
    return user;
  }

  @Get('meee')
  @ApiOperation({ summary: 'Get myself data from DB' })
  getMep() {
    return 'Tamos activo papi';
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

  @Get('trabajador/:id')
  @Roles(Role.User, Role.Admin)
  @ApiOperation({ summary: 'Get one Trabajador Data By ID USER' })
  findOneTrabajador(
    @Param(
      'id',
      new ParseIntPipe({ errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE }),
    )
    id: number,
  ) {
    return this.userService.findOneTrabajador(id);
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
