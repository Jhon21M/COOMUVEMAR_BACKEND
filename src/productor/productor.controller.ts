import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  ParseIntPipe,
  UseFilters,
  HttpStatus,
  SetMetadata,
  ValidationPipe,
} from '@nestjs/common';
import { ProductorService } from './productor.service';
import { CreateProductorDto } from './dto/create-productor.dto';
import { UpdateProductorDto } from './dto/update-productor.dto';
import { JwtGuard } from 'src/auth/guard';
import {
  ApiOkResponse,
  ApiTags,
  ApiTooManyRequestsResponse,
  ApiResponse,
  ApiOperation,
  ApiBearerAuth,
} from '@nestjs/swagger';
import { EntityProductor } from './entities/productor.entity';
//import { HttpExceptionFilter } from 'src/http-exception/http-exception.filter';
//import { ValidationPipe2 } from 'src/validation/validation.pipe';
import { Roles } from 'src/auth/decorator/roles.decorador';
import { get } from 'http';

@UseGuards(JwtGuard)
@ApiBearerAuth()
@ApiTags('Productor - API')
@ApiTooManyRequestsResponse({
  status: HttpStatus.TOO_MANY_REQUESTS,
  description: 'Too many requests in a short time',
})
@ApiBearerAuth()
//@UseFilters(new HttpExceptionFilter())
@Controller({
  version: '1',
  path: 'productores',
})
export class ProductorController {
  constructor(private readonly productorService: ProductorService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new Productor' })
  create(
    @Body(new ValidationPipe()) createProductorDto: CreateProductorDto,
  ): Promise<EntityProductor> {
    return this.productorService.create(createProductorDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get  all Productor data' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'API is up',
  })
  @ApiOkResponse({ type: EntityProductor, isArray: true }) // devolver una respuesta interceptando y transformando los datos, de tipo entities
  async findAll() {
    return await this.productorService.findAll();
  }

  @Get('fincas')
  @ApiOperation({ summary: 'Get all Productor with their Finca' })
  async findAllProductorAndFinca() {
    return await this.productorService.findAllProductorAndFinca();
  }

  @Get('fincas/:id')
  @ApiOperation({ summary: 'Get a Productor with his Finca by ID' })
  async findAllFincaOneProductor(
    @Param(
      'id',
      new ParseIntPipe({ errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE }),
    )
    id: number,
  ) {
    return await this.productorService.findAllFincaOneProductor(id);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get one Productor data by ID' })
  findOne(
    @Param(
      'id',
      new ParseIntPipe({ errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE }),
    )
    id: number,
  ) {
    return this.productorService.findOne(id);
  }

  //@Roles('admin')
  @Patch(':id')
  @ApiOperation({ summary: 'update a Productor data' })
  update(
    @Param(
      'id',
      new ParseIntPipe({ errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE }),
    )
    id: number,
    @Body() updateProductorDto: UpdateProductorDto,
  ) {
    return this.productorService.update(id, updateProductorDto);
  }

  @Roles('admin')
  @ApiOperation({ summary: 'Delete a Productor By ID' })
  @Delete(':id')
  remove(
    @Param(
      'id',
      new ParseIntPipe({ errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE }),
    )
    id: number,
  ) {
    return this.productorService.remove(id);
  }
}
