import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpStatus,
  ParseIntPipe,
  ValidationPipe,
  UseGuards,
} from '@nestjs/common';
import { FichaService } from './ficha.service';
import { CreateFichaDto } from './dto/create-ficha.dto';
import { UpdateFichaDto } from './dto/update-ficha.dto';
import {
  ApiBearerAuth,
  ApiOkResponse,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { EntityFicha } from './entities';
import { JwtGuard } from 'src/auth/guard';

@ApiTags('ficha - APi')
@UseGuards(JwtGuard)
@ApiBearerAuth()
@Controller({
  version: '1',
  path: 'ficha',
})
export class FichaController {
  constructor(private readonly fichaService: FichaService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new Ficha' })
  create(
    @Body(new ValidationPipe()) createFichaDto: CreateFichaDto,
  ): Promise<EntityFicha> {
    return this.fichaService.create(createFichaDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get  all Ficha created' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'API is up',
  })
  async findAll() {
    return await this.fichaService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get one Ficha by ID..' })
  findOne(
    @Param(
      'id',
      new ParseIntPipe({ errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE }),
    )
    id: number,
  ) {
    return this.fichaService.findOne(id);
  }

  @Get('structure/:id')
  @ApiOperation({ summary: 'Get One Ficha Data By ID' })
  Data(
    @Param(
      'id',
      new ParseIntPipe({ errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE }),
    )
    id: number,
  ) {
    return this.fichaService.findOneData(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'update a Ficha by ID' })
  update(
    @Param(
      'id',
      new ParseIntPipe({ errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE }),
    )
    id: number,
    @Body() updateProductorDto: UpdateFichaDto,
  ) {
    return this.fichaService.update(id, updateProductorDto);
  }

  @ApiOperation({ summary: 'Delete a Ficha By ID' })
  @Delete(':id')
  remove(
    @Param(
      'id',
      new ParseIntPipe({ errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE }),
    )
    id: number,
  ) {
    return this.fichaService.remove(id);
  }
}
