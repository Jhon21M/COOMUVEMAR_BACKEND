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
import { InfoDatoService } from './info-dato.service';
import { CreateInfoDatoDto } from './dto/create-info-dato.dto';
import { UpdateInfoDatoDto } from './dto/update-info-dato.dto';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { EntityInfoDato } from './entities';

@ApiTags('informaciondato - APi')
//@UseGuards(JwtGuard)
@ApiBearerAuth()
@Controller({
  version: '1',
  path: 'informaciondato',
})
export class InfoDatoController {
  constructor(private readonly infodatoService: InfoDatoService) {}
  @Post()
  @ApiOperation({ summary: 'Create a new infornaciondato' })
  create(
    @Body(new ValidationPipe()) createInfoDato: CreateInfoDatoDto,
  ): Promise<EntityInfoDato> {
    return this.infodatoService.create(createInfoDato);
  }

  @Get()
  @ApiOperation({ summary: 'Get  all informacionDato data' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'API is up',
  })
  async findAll() {
    return await this.infodatoService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get one informacionDato data by ID' })
  findOne(
    @Param(
      'id',
      new ParseIntPipe({ errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE }),
    )
    id: number,
  ) {
    return this.infodatoService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'update a informacionDato data by ID' })
  update(
    @Param(
      'id',
      new ParseIntPipe({ errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE }),
    )
    id: number,
    @Body() updateInfoDatoDto: UpdateInfoDatoDto,
  ) {
    return this.infodatoService.update(id, updateInfoDatoDto);
  }

  @ApiOperation({ summary: 'Delete a informacionDato from DB By ID' })
  @Delete(':id')
  remove(
    @Param(
      'id',
      new ParseIntPipe({ errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE }),
    )
    id: number,
  ) {
    return this.infodatoService.remove(id);
  }
}
