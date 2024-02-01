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

@ApiTags('seccionesFicha - APi')
@UseGuards(JwtGuard)
@ApiBearerAuth()
@Controller({
  version: '1',
  path: 'seccionesFicha',
})
export class seccionesFichaController {
  constructor(private readonly secFichaService: SecFichaService) {}

  @Roles(Role.Admin)
  @Post()
  @ApiOperation({ summary: 'Create a new seccionFicha' })
  create(
    @Body(new ValidationPipe()) createseccionFichaDto: CreateSeccionFichaDto,
  ) {
    return this.secFichaService.create(createseccionFichaDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get  all seccionFicha data' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'API is up',
  })
  async findAll() {
    return await this.secFichaService.findAll();
  }

  @Get(':id')
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

  @Roles(Role.Admin)
  @Patch(':id')
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

  @Roles(Role.Admin)
  @ApiOperation({ summary: 'Delete a seccionFicha By ID' })
  @Delete(':id')
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