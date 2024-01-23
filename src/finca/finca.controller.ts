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
  UseGuards,
} from '@nestjs/common';
import { FincaService } from './finca.service';
import { CreateFincaDto } from './dto/create-finca.dto';
import { UpdateFincaDto } from './dto/update-finca.dto';
import {
  ApiBearerAuth,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { JwtGuard } from 'src/auth/guard';

@ApiTags('finca - APi')
//@UseGuards(JwtGuard)
@ApiBearerAuth()
@Controller({
  version: '1',
  path: 'finca',
})
export class FincaController {
  constructor(private readonly fincaService: FincaService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new Finca' })
  @ApiOkResponse({ description: 'Finca created' })
  create(@Body() createFincaDto: CreateFincaDto) {
    return this.fincaService.create(createFincaDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all Finca of DB' })
  findAll() {
    return this.fincaService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'get a finca by ID' })
  findOne(
    @Param(
      'id',
      new ParseIntPipe({ errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE }),
    )
    id: number,
  ) {
    return this.fincaService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'update a finca by id' })
  update(
    @Param(
      'id',
      new ParseIntPipe({ errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE }),
    )
    id: number,
    @Body() updateFincaDto: UpdateFincaDto,
  ) {
    return this.fincaService.update(id, updateFincaDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a Finca by ID' })
  remove(
    @Param(
      'id',
      new ParseIntPipe({ errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE }),
    )
    id: string,
  ) {
    return this.fincaService.remove(+id);
  }
}
