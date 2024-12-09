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
  BadRequestException,
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
import { CreateInsumoDto } from './dto/create_insumos_dto/create-insumo.dto';
import { CreateManejoResiduoDto } from './dto/create_ReglaResiduo_dto';

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
  //@UseGuards(JwtGuardToken)
  @Roles(Role.User, Role.Admin)
  @ApiOperation({ summary: 'post DATA from app Movil' })
  loadFicha(
    @GetUser() user: Usuario,
    @Body(new ValidationPipe()) createExternaldatumDto: CreateExternaldataDto,
  ) {
    // if (Buffer.byteLength(JSON.stringify(Body)) > 15 * 1024 * 1024) {
    //   throw new BadRequestException('Payload demasiado grande');
    // }
    console.log('llegando a load ficha controller', Body);
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

  @Get('structureformated/:id')
  @Roles(Role.User, Role.Admin)
  @ApiOperation({ summary: 'Get One Ficha Data By ID' })
  DataFormated(
    @Param('id')
    id: string,
  ) {
    return this.fichaService.DataFormated(id);
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

  @Get('analisisficha/:id')
  @Roles(Role.Admin)
  @ApiOperation({ summary: 'Analize one Ficha stored....' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'API is up',
  })
  async analisis(
    @Param('id')
    id: string,
  ) {
    return await this.fichaService.analisis(id);
  }

  @Delete('analisisficha/:id')
  @Roles(Role.Admin)
  @ApiOperation({ summary: 'Delete ficha analized' })
  removeAnalisis(
    @Param('id')
    id: string,
  ) {
    return this.fichaService.removeAnalisis(id);
  }

  @Get('analisisfichaget/all')
  @Roles(Role.Admin)
  @ApiOperation({ summary: 'Get all Ficha analized' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'API is up',
  })
  async noConformidadAll() {
    return await this.fichaService.noConformidadAll();
  }

  @Get('analisisfichaget/:id')
  @Roles(Role.Admin)
  @ApiOperation({ summary: 'Get ona Ficha analized' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'API is up',
  })
  async noConformidadOne(
    @Param('id')
    id: string,
  ) {
    return await this.fichaService.noConformidadOne(id);
  }

  @Post('productosaplicados')
  @Roles(Role.Admin)
  @ApiOperation({ summary: 'Actualizar productos aplicados' })
  async updateInsumos(
    @Body(new ValidationPipe()) createInsumoDto: CreateInsumoDto,
  ) {
    return this.fichaService.updateInsumos(createInsumoDto);
  }

  @Post('manejoresiduos')
  @Roles(Role.Admin)
  @ApiOperation({ summary: 'Actualizar manejo Residuo' })
  async updatemanejoresiduos(
    @Body(new ValidationPipe()) createInsumoDto: CreateManejoResiduoDto,
  ) {
    return this.fichaService.actualizarReglas(
      createInsumoDto.tipoResiduo,
      createInsumoDto.nuevoBuenManejo,
      createInsumoDto.nuevoMalManejo,
    );
  }
}
