import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
  ValidationPipe,
  HttpStatus,
  UseGuards,
} from '@nestjs/common';
import { SecFichaService } from './sec-ficha.service';
import { CreateSeccionFichaDto, UpdateSecFichaDto } from 'src/sec-ficha/dto';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { JwtGuard } from 'src/auth/guard';
import { Roles } from 'src/auth/decorator';
import { Role } from 'src/common/enum/role.enum';
import { RolesGuard } from 'src/auth/guard/auth.guard';

@ApiTags('seccionesFicha - APi')
@UseGuards(JwtGuard, RolesGuard)
@ApiBearerAuth()
@Controller({
  version: '1',
  path: 'seccionesFicha',
})
export class seccionesFichaController {
  constructor(private readonly secFichaService: SecFichaService) {}

  @Post()
  @Roles(Role.Admin)
  @ApiOperation({ summary: 'Create a new seccionFicha' })
  create(
    @Body(new ValidationPipe()) createseccionFichaDto: CreateSeccionFichaDto,
  ) {
    return this.secFichaService.create(createseccionFichaDto);
  }

  @Get()
  @Roles(Role.User, Role.Admin)
  @ApiOperation({ summary: 'Get  all seccionFicha data' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'API is up',
  })
  async findAll() {
    return await this.secFichaService.findAll();
  }

  @Get(':id')
  @Roles(Role.User, Role.Admin)
  @ApiOperation({ summary: 'Get one seccionFicha data by ID' })
  findOne(
    @Param(
      'id',
      new ParseIntPipe({ errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE }),
    )
    id: number,
  ) {
    return this.secFichaService.findOne(id);
  }

  @Get('datoseccion/:id')
  @Roles(Role.User, Role.Admin)
  @ApiOperation({ summary: 'Get DATO data from  an seccionFicha by ID' })
  findAllDataSection(
    @Param(
      'id',
      new ParseIntPipe({ errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE }),
    )
    id: number,
  ) {
    return this.secFichaService.findAllDataSection(id);
  }

  @Get('datoseccioninfo/:id')
  @Roles(Role.User, Role.Admin)
  @ApiOperation({
    summary: 'Get DATO data and answer from  an seccionFicha by ID',
  })
  findAllDataAndAnswerSection(
    @Param(
      'id',
      new ParseIntPipe({ errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE }),
    )
    id: number,
  ) {
    return this.secFichaService.findAllDataAndAnswerSection(id);
  }

  @Patch(':id')
  @Roles(Role.Admin)
  @ApiOperation({ summary: 'update a seccionFicha data by ID' })
  update(
    @Param(
      'id',
      new ParseIntPipe({ errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE }),
    )
    id: number,
    @Body() UpdateSecFicha: UpdateSecFichaDto,
  ) {
    return this.secFichaService.update(id, UpdateSecFicha);
  }

  @Delete(':id')
  @Roles(Role.Admin)
  @ApiOperation({ summary: 'Delete a seccionFicha By ID' })
  remove(
    @Param(
      'id',
      new ParseIntPipe({ errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE }),
    )
    id: number,
  ) {
    return this.secFichaService.remove(id);
  }
}
