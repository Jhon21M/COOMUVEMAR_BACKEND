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
} from '@nestjs/common';
import { InspectorService } from './inspector.service';
import { CreateInspectorDto, UpdateInspectorDto } from './dto';

import {
  ApiBearerAuth,
  ApiOperation,
  ApiTags,
  ApiTooManyRequestsResponse,
} from '@nestjs/swagger';

@ApiTags('Inspector - API')
@ApiTooManyRequestsResponse({
  status: HttpStatus.TOO_MANY_REQUESTS,
  description: 'Too many requests in a short time',
})
@ApiBearerAuth()
@Controller({
  version: '1',
  path: 'inspector',
})
export class InspectorController {
  constructor(private readonly inspectorService: InspectorService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new Inspector' })
  create(
    @Body(new ValidationPipe()) createInspectorDto: CreateInspectorDto,
  ): Promise<CreateInspectorDto> {
    return this.inspectorService.create(createInspectorDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all Inspector data' })
  findAll() {
    return this.inspectorService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get one inispector By ID' })
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
  @ApiOperation({ summary: 'Update an Inspector by ID' })
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
  @ApiOperation({ summary: 'Delete an Inspector by ID' })
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
