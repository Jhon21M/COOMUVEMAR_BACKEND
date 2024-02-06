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
import { Roles } from 'src/auth/decorator/roles.decorador';
import { RolesGuard } from 'src/auth/guard/auth.guard';
import { Role } from 'src/common/enum/role.enum';
import { JwtGuard } from 'src/auth/guard';

@ApiTags('desicion - APi')
@UseGuards(JwtGuard, RolesGuard)
@ApiBearerAuth()
@Controller({
  version: '1',
  path: 'desicion',
})
export class DesicionController {
  constructor(private readonly desicionService: DesicionService) {}

  @Post()
  @Roles(Role.Admin)
  @ApiOperation({ summary: 'Create a new desicion of Ficha' })
  create(
    @Body(new ValidationPipe()) createDesicionDto: CreateDesicionDto,
  ): Promise<EntityDesicion> {
    return this.desicionService.create(createDesicionDto);
  }

  @Get()
  @Roles(Role.Admin)
  @ApiOperation({ summary: 'Get  all Desicion data from DB' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'API is up',
  })
  async findAll() {
    return await this.desicionService.findAll();
  }

  @Get(':id')
  @Roles(Role.Admin)
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
  @Roles(Role.Admin)
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

  @Delete(':id')
  @Roles(Role.Admin)
  @ApiOperation({ summary: 'Delete a Desicion from DB By ID' })
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
