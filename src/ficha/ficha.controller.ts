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
import { CreateFichaDto } from './dto/create-ficha.dto';
import { UpdateFichaDto } from './dto/update-ficha.dto';
import {
  ApiBearerAuth,
  ApiOkResponse,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { EntityFicha } from './entities';
import { JwtGuard } from 'src/auth/guard';
import { RolesGuard } from 'src/auth/guard/auth.guard';
import { Roles } from 'src/auth/decorator';
import { Role } from 'src/common/enum/role.enum';

@ApiTags('ficha - APi')
@UseGuards(JwtGuard, RolesGuard)
@ApiBearerAuth()
@Controller({
  version: '1',
  path: 'ficha',
})
export class FichaController {
  constructor(private readonly fichaService: FichaService) {}

  @Post()
  @Roles(Role.User, Role.Admin)
  @ApiOperation({ summary: 'Create a new Ficha' })
  async create(
    @Body(new ValidationPipe()) createFichaDto: CreateFichaDto,
  ): Promise<EntityFicha> {
    const nuevaFicha = await this.fichaService.create(createFichaDto);
    console.log('impriendo ficha creada', nuevaFicha);
    return nuevaFicha;
  }

  @Get()
  @Roles(Role.User, Role.Admin)
  @ApiOperation({ summary: 'Get  all Ficha created' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'API is up',
  })
  async findAll() {
    return await this.fichaService.findAll();
  }

  @Get()
  @Roles(Role.Admin)
  @ApiOperation({ summary: 'Analyze Ficha stored' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'API is up',
  })
  async analisis() {
    return await this.fichaService.anasysis();
  }
  @Get(':id')
  @Roles(Role.User, Role.Admin)
  @ApiOperation({ summary: 'Get one Ficha by ID..' })
  findOne(
    @Param(
      'id',
      new ParseIntPipe({ errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE }),
    )
    id: number,
  ) {
    return this.fichaService.findOne(id);
  }

  @Get('structure/:id')
  @Roles(Role.User, Role.Admin)
  @ApiOperation({ summary: 'Get One Ficha Data By ID' })
  Data(
    @Param(
      'id',
      new ParseIntPipe({ errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE }),
    )
    id: number,
  ) {
    return this.fichaService.findOneData(id);
  }

  @Patch(':id')
  @Roles(Role.Admin)
  @ApiOperation({ summary: 'update a Ficha by ID' })
  update(
    @Param(
      'id',
      new ParseIntPipe({ errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE }),
    )
    id: number,
    @Body() updateProductorDto: UpdateFichaDto,
  ) {
    return this.fichaService.update(id, updateProductorDto);
  }

  @Delete(':id')
  @Roles(Role.Admin)
  @ApiOperation({ summary: 'Delete a Ficha By ID' })
  remove(
    @Param(
      'id',
      new ParseIntPipe({ errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE }),
    )
    id: number,
  ) {
    return this.fichaService.remove(id);
  }
}
