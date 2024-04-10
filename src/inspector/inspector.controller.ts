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
import { CreateInspectorDto, UpdateInspectorDto } from './dto';

import {
  ApiBearerAuth,
  ApiOperation,
  ApiTags,
  ApiTooManyRequestsResponse,
} from '@nestjs/swagger';
import { JwtGuard } from 'src/auth/guard';
import { RolesGuard } from 'src/auth/guard/auth.guard';
import { Roles } from 'src/auth/decorator';
import { Role } from 'src/common/enum/role.enum';
import { FormDataRequest } from 'nestjs-form-data';

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

  @Get()
  @Roles(Role.Admin)
  @ApiOperation({ summary: 'Get all Trabajador data' })
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
