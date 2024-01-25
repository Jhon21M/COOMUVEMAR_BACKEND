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
import { DocumentoService } from './documento.service';
import { CreateDocumentoDto } from './dto/create-documento.dto';
import { UpdateDocumentoDto } from './dto/update-documento.dto';
import {
  ApiBearerAuth,
  ApiOkResponse,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { EntityDocumento } from './entities';

@ApiTags('documento - APi')
//@UseGuards(JwtGuard)
@ApiBearerAuth()
@Controller({
  version: '1',
  path: 'documento',
})
export class DocumentoController {
  constructor(private readonly documentoService: DocumentoService) {}
  @Post()
  @ApiOperation({ summary: 'Create a new Documento de Ficha' })
  create(
    @Body(new ValidationPipe()) createDocumentoDto: CreateDocumentoDto,
  ): Promise<EntityDocumento> {
    return this.documentoService.create(createDocumentoDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get  all Documento data from DB' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'API is up',
  })
  @ApiOkResponse({ description: 'Everything works Ok', type: EntityDocumento })
  async findAll() {
    return await this.documentoService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get one Documento data by ID' })
  findOne(
    @Param(
      'id',
      new ParseIntPipe({ errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE }),
    )
    id: number,
  ) {
    return this.documentoService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'update a Documento data by ID' })
  update(
    @Param(
      'id',
      new ParseIntPipe({ errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE }),
    )
    id: number,
    @Body() updateDocumentoDto: UpdateDocumentoDto,
  ) {
    return this.documentoService.update(id, updateDocumentoDto);
  }

  @ApiOperation({ summary: 'Delete a Documento from DB By ID' })
  @Delete(':id')
  remove(
    @Param(
      'id',
      new ParseIntPipe({ errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE }),
    )
    id: number,
  ) {
    return this.documentoService.remove(id);
  }
}
