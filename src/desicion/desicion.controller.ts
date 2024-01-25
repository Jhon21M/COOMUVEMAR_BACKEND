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
import { DesicionService } from './desicion.service';
import { CreateDesicionDto } from './dto/create-desicion.dto';
import { UpdateDesicionDto } from './dto/update-desicion.dto';
import {
  ApiBearerAuth,
  ApiOkResponse,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { EntityDesicion } from './entities';

@ApiTags('desicion - APi')
//@UseGuards(JwtGuard)
@ApiBearerAuth()
@Controller({
  version: '1',
  path: 'desicion',
})
export class DesicionController {
  constructor(private readonly desicionService: DesicionService) {}
  @Post()
  @ApiOperation({ summary: 'Create a new desicion of Ficha' })
  create(
    @Body(new ValidationPipe()) createDesicionDto: CreateDesicionDto,
  ): Promise<EntityDesicion> {
    return this.desicionService.create(createDesicionDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get  all Desicion data from DB' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'API is up',
  })
  async findAll() {
    return await this.desicionService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get one desicion data by ID' })
  findOne(
    @Param(
      'id',
      new ParseIntPipe({ errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE }),
    )
    id: number,
  ) {
    return this.desicionService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'update a Desicion data by ID' })
  update(
    @Param(
      'id',
      new ParseIntPipe({ errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE }),
    )
    id: number,
    @Body() updateDesicionDto: UpdateDesicionDto,
  ) {
    return this.desicionService.update(id, updateDesicionDto);
  }

  @ApiOperation({ summary: 'Delete a Desicion from DB By ID' })
  @Delete(':id')
  remove(
    @Param(
      'id',
      new ParseIntPipe({ errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE }),
    )
    id: number,
  ) {
    return this.desicionService.remove(id);
  }
}
