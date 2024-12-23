import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
  HttpStatus,
  ValidationPipe,
  UseGuards,
} from '@nestjs/common';
import { InspectorService } from './inspector.service';
import {
  CreateInspectorDto,
  CreateTrabajadorProductorDto,
  UpdateInspectorDto,
} from './dto';

import {
  ApiBearerAuth,
  ApiOperation,
  ApiTags,
  ApiTooManyRequestsResponse,
} from '@nestjs/swagger';
import { JwtGuard } from 'src/auth/guard';
import { RolesGuard } from 'src/auth/guard/auth.guard';
import { GetUser, Roles } from 'src/auth/decorator';
import { Role } from 'src/common/enum/role.enum';
import { Usuario } from '@prisma/client';

@ApiTags('Inspector - API')
@ApiTooManyRequestsResponse({
  status: HttpStatus.TOO_MANY_REQUESTS,
  description: 'Too many requests in a short time',
})
@UseGuards(JwtGuard, RolesGuard)
@ApiBearerAuth()
@Controller({
  version: '1',
  path: 'trabajador',
})
export class InspectorController {
  constructor(private readonly inspectorService: InspectorService) {}

  @Post()
  @Roles(Role.Admin)
  @ApiOperation({ summary: 'Create a new Inspector' })
  create(
    @Body(new ValidationPipe()) createInspectorDto: CreateInspectorDto,
  ): Promise<CreateInspectorDto> {
    if (createInspectorDto.urlImg) {
      console.log('Si se recibe la imagen', createInspectorDto.urlImg);
    } else {
      console.log('No se recibe la imagen');
    }
    return this.inspectorService.create(createInspectorDto);
  }

  @Post('asignacionproductor')
  @Roles(Role.Admin)
  @ApiOperation({ summary: 'Crea una asignacion a un Inspector' })
  createTP(
    @Body(new ValidationPipe())
    createTPDto: CreateTrabajadorProductorDto,
  ) {
    return this.inspectorService.createTP(createTPDto);
  }

  /**App WEB */
  @Get('inspectorasign/:id')
  @Roles(Role.Admin)
  @ApiOperation({
    summary: 'Get las asignaciones que tiene un Inspector by ID',
  })
  getTPAdmin(
    @Param(
      'id',
      new ParseIntPipe({ errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE }),
    )
    id: number,
  ) {
    return this.inspectorService.getTPAdmin(id);
  }

  @Get('getallproductorinspector')
  @Roles(Role.Admin)
  @ApiOperation({
    summary: 'Get todas las asignaciones existentes en InspectorProductor',
  })
  getAllTPAdmin() {
    return this.inspectorService.getAllTPAdmin();
  }

  @Delete('asignacion')
  @Roles(Role.Admin)
  @ApiOperation({
    summary: 'eliminar las asignacion by ID de InspectorProductor',
  })
  removeProductorInsector(
    @Body()
    numeros: number[],
  ) {
    console.log('controlesr');
    return this.inspectorService.removeProductorInsector(numeros);
  }

  @Get('inspector')
  @Roles(Role.Admin)
  @ApiOperation({ summary: 'Get all only Inspectores data' })
  findAllInspector() {
    return this.inspectorService.findAllInspector();
  }

  @Get()
  @Roles(Role.Admin)
  @ApiOperation({ summary: 'Get all Trabajadores data' })
  findAll() {
    return this.inspectorService.findAll();
  }

  @Get(':id')
  @Roles(Role.User, Role.Admin)
  @ApiOperation({ summary: 'Get one Trabajador By ID' })
  findOne(
    @Param(
      'id',
      new ParseIntPipe({ errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE }),
    )
    id: number,
  ) {
    return this.inspectorService.findOne(id);
  }

  @Patch(':id')
  @Roles(Role.Admin)
  @ApiOperation({ summary: 'Update an Trabajador by ID' })
  update(
    @Param(
      'id',
      new ParseIntPipe({ errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE }),
    )
    id: number,
    @Body() updateInspectorDto: UpdateInspectorDto,
  ) {
    return this.inspectorService.update(id, updateInspectorDto);
  }

  @Delete(':id')
  @Roles(Role.Admin)
  @ApiOperation({ summary: 'Delete an Trabajador by ID' })
  remove(
    @Param(
      'id',
      new ParseIntPipe({ errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE }),
    )
    id: number,
  ) {
    return this.inspectorService.remove(id);
  }
}
