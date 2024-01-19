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
} from '@nestjs/common';
import { ProductorService } from './productor.service';
import { CreateProductorDto } from './dto/create-productor.dto';
import { UpdateProductorDto } from './dto/update-productor.dto';
import { JwtGuard } from 'src/auth/guard';
import { ApiOkResponse, ApiTags, ApiTooManyRequestsResponse, ApiResponse, ApiOperation } from '@nestjs/swagger';
import { EntityProductor } from './entities/productor.entity';
import { HttpExceptionFilter } from 'src/http-exception/http-exception.filter';
import { ValidationPipe2 } from 'src/validation/validation.pipe';
import { Roles } from 'src/auth/decorator/roles.decorador';

//@UseGuards(JwtGuard)
@ApiTags('Productor - API')
@ApiOperation({ summary: 'Health check' })
@ApiResponse({
  status: HttpStatus.OK,
  description: 'API is up',
})
@ApiTooManyRequestsResponse({
  status: HttpStatus.TOO_MANY_REQUESTS,
  description: 'Too many requests in a short time',
})
//@UseFilters(new HttpExceptionFilter())
@Controller('productores')
export class ProductorController {
  constructor(private readonly productorService: ProductorService) {}

  @Post()
  create(
    @Body(new ValidationPipe2()) createProductorDto: CreateProductorDto,
  ): Promise<EntityProductor> {
    return this.productorService.create(createProductorDto);
  }

  @Get()
  // @ApiOkResponse({ type: EntityProductor, isArray: true }) // devolver una respuesta interceptando y transformando los datos, de tipo entities
  async findAll() {
    return await this.productorService.findAll();
  }

  @Get(':id')
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
  update(
    @Param(
      'id',
      new ParseIntPipe({ errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE }),
    )
    id: number,
    @Body() updateProductorDto: UpdateProductorDto,
  ): Promise<EntityProductor> {
    return this.productorService.update(id, updateProductorDto);
  }

  @Roles('admin')
  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.productorService.remove(id);
  }
}
