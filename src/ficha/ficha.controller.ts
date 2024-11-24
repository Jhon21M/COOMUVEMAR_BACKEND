import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpStatus,
  ParseIntPipe,
  ValidationPipe,
  UseGuards,
} from '@nestjs/common';
import { FichaService } from './ficha.service';
import {
  ApiBearerAuth,
  ApiOkResponse,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { EntityFicha } from './entities';
import { JwtGuard, JwtGuardToken } from 'src/auth/guard';
import { RolesGuard } from 'src/auth/guard/auth.guard';
import { GetUser, Roles } from 'src/auth/decorator';
import { Role } from 'src/common/enum/role.enum';
import { FichaInterfaceReturn } from './interfaces';
import { Usuario } from '@prisma/client';
import { CreateExternaldataDto } from './dto/load_ficha_dto';
import { CreateFichaDto, UpdateFichaDto } from './dto/create_ficha_dto';

@ApiTags('ficha - APi')
@UseGuards(JwtGuard, RolesGuard)
@ApiBearerAuth()
@Controller({
  version: '1',
  path: 'ficha',
})
export class FichaController {
  constructor(private readonly fichaService: FichaService) {}

  @Get('cleanseed')
  @ApiOperation({ summary: 'CleanDB and seedDB' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'API is up',
  })
  async CleanAndSeed() {
    return await this.fichaService.cleanDB();
  }

  //***********APP MOVIL Y WEB */
  @Post()
  @Roles(Role.User, Role.Admin)
  @ApiOperation({ summary: 'Create a new Ficha' })
  async create(
    @GetUser() user: Usuario,
    @Body(new ValidationPipe()) createFichaDto: CreateFichaDto,
  ): Promise<EntityFicha> {
    return this.fichaService.create(createFichaDto, user);
  }


  @Post('loadficha')
  @UseGuards(JwtGuardToken)
  @Roles(Role.User, Role.Admin)
  @ApiOperation({ summary: 'post DATA from app Movil' })
  loadFicha(
    @GetUser() user: Usuario,
    @Body(new ValidationPipe()) createExternaldatumDto: CreateExternaldataDto,
  ) {
    return this.fichaService.loadFicha(createExternaldatumDto, user);
  }

  @Get()
  @Roles(Role.User, Role.Admin)
  @ApiOperation({ summary: 'Get  all Ficha created' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'API is up',
  })
  async findAll(@GetUser() user: Usuario) {
    return await this.fichaService.findAll(user);
  }

  @Get('analysisficha')
  @Roles(Role.Admin)
  @ApiOperation({ summary: 'Analyze Ficha stored....' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'API is up',
  })
  async analysis() {
    return await this.fichaService.analysis();
  }

  // no esta en teams
  @Get('fichaheader/:id')
  @Roles(Role.User, Role.Admin)
  @ApiOperation({ summary: 'Get  header of a Ficha created' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'API is up',
  })
  async getHeader(
    @Param('id')
    id: string,
  ) {
    return await this.fichaService.getHeader(id);
  }

  @Get(':id')
  @Roles(Role.User, Role.Admin)
  @ApiOperation({ summary: 'Get one Ficha by ID..' })
  findOne(
    @Param('id')
    id: string,
  ): Promise<FichaInterfaceReturn> {
    return this.fichaService.findOne(id);
  }

  @Get('structure/:id')
  @Roles(Role.User, Role.Admin)
  @ApiOperation({ summary: 'Get One Ficha Data By ID' })
  Data(
    @Param('id')
    id: string,
  ) {
    return this.fichaService.findOneData(id);
  }

  @Patch(':id')
  @Roles(Role.Admin)
  @ApiOperation({ summary: 'update a Ficha by ID' })
  update(
    @Param('id')
    id: string,
    @Body() updateProductorDto: UpdateFichaDto,
  ) {
    return this.fichaService.update(id, updateProductorDto);
  }

  @Delete(':id')
  @Roles(Role.Admin)
  @ApiOperation({ summary: 'Delete a Ficha By ID' })
  remove(
    @Param('id')
    id: string,
  ) {
    return this.fichaService.remove(id);
  }

  // @Get('insertdata')
  // @Roles(Role.User, Role.Admin)
  // @ApiOperation({ summary: 'insert' })
  // @ApiResponse({
  //   status: HttpStatus.OK,
  //   description: 'API is up',
  // })
  // insertData() {
  //   return this.fichaService.InsertData();
  // }
}
