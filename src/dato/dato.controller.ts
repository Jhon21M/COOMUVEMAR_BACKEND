import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ValidationPipe,
  HttpStatus,
  ParseIntPipe,
} from '@nestjs/common';
import { DatoService } from './dato.service';
import { CreateDatoDto } from './dto/create-dato.dto';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { EntityDato } from './entities';
import { UpdateDatoDto } from './dto';

@Controller('dato')
export class DatoController {
  constructor(private readonly datoService: DatoService) {}
  @Post()
  @ApiOperation({ summary: 'Create a new dato' })
  create(
    @Body(new ValidationPipe()) createDatoDto: CreateDatoDto,
  ): Promise<EntityDato> {
    return this.datoService.create(createDatoDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get  all Dato data' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'API is up',
  })
  async findAll() {
    return await this.datoService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get one Dato data by ID' })
  findOne(
    @Param(
      'id',
      new ParseIntPipe({ errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE }),
    )
    id: number,
  ) {
    return this.datoService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'update a Dato data by ID' })
  update(
    @Param(
      'id',
      new ParseIntPipe({ errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE }),
    )
    id: number,
    @Body() updateDatoDto: UpdateDatoDto,
  ) {
    return this.datoService.update(id, updateDatoDto);
  }

  @ApiOperation({ summary: 'Delete a Dato from DB By ID' })
  @Delete(':id')
  remove(
    @Param(
      'id',
      new ParseIntPipe({ errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE }),
    )
    id: number,
  ) {
    return this.datoService.remove(id);
  }
}
