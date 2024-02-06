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
  UseGuards,
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
import { JwtGuard } from 'src/auth/guard';
import { Roles } from 'src/auth/decorator';
import { Role } from 'src/common/enum/role.enum';

@ApiTags('documento - APi')
@UseGuards(JwtGuard)
@ApiBearerAuth()
@Controller({
  version: '1',
  path: 'documento',
})
export class DocumentoController {
  constructor(private readonly documentoService: DocumentoService) {}

  @Post()
  @Roles(Role.User, Role.Admin)
  @ApiOperation({ summary: 'Create a new Documento de Ficha' })
  create(
    @Body(new ValidationPipe()) createDocumentoDto: CreateDocumentoDto,
  ): Promise<EntityDocumento> {
    return this.documentoService.create(createDocumentoDto);
  }

  @Get()
  @Roles(Role.User, Role.Admin)
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
  @Roles(Role.User, Role.Admin)
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
  @Roles(Role.Admin)
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

  @Delete(':id')
  @Roles(Role.Admin)
  @ApiOperation({ summary: 'Delete a Documento from DB By ID' })
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
