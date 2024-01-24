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
} from '@nestjs/common';
import { SecFichaService } from './sec-ficha.service';
import { CreateSeccionFichaDto, UpdateSecFichaDto } from 'src/sec-ficha/dto';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';

@ApiTags('seccionesFicha - APi')
//@UseGuards(JwtGuard)
@ApiBearerAuth()
@Controller({
  version: '1',
  path: 'seccionesFicha',
})
export class seccionesFichaController {
  constructor(private readonly secFichaService: SecFichaService) {}

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
