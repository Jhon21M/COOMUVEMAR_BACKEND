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
import { InfoDatoService } from './info-dato.service';
import { CreateInfoDatoDto } from './dto/create-info-dato.dto';
import { UpdateInfoDatoDto } from './dto/update-info-dato.dto';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { EntityInfoDato } from './entities';
import { JwtGuard } from 'src/auth/guard';
import { RolesGuard } from 'src/auth/guard/auth.guard';
import { Roles } from 'src/auth/decorator';
import { Role } from 'src/common/enum/role.enum';

@ApiTags('informaciondato - APi')
@UseGuards(JwtGuard, RolesGuard)
@ApiBearerAuth()
@Controller({
  version: '1',
  path: 'informaciondato',
})
export class InfoDatoController {
  constructor(private readonly infodatoService: InfoDatoService) {}

  @Post()
  @Roles(Role.User, Role.Admin)
  @ApiOperation({ summary: 'Create a new informaciondato' })
  create(
    @Body(new ValidationPipe()) createInfoDato: CreateInfoDatoDto,
  ): Promise<EntityInfoDato> {
    return this.infodatoService.create(createInfoDato);
  }

  @Get()
  @Roles(Role.User, Role.Admin)
  @ApiOperation({ summary: 'Get  all informacionDato data' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'API is up',
  })
  async findAll() {
    return await this.infodatoService.findAll();
  }

  @Get(':id')
  @Roles(Role.User, Role.Admin)
  @ApiOperation({ summary: 'Get one informacionDato data by ID' })
  findOne(
    @Param(
      'id',
      new ParseIntPipe({ errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE }),
    )
    id: number,
  ) {
    return this.infodatoService.findOne(id);
  }

  // no esta en el documento de team
  @Get('fichainfo/:id')
  @Roles(Role.User, Role.Admin)
  @ApiOperation({ summary: 'Get All informacionDato data from One IDFicha' })
  findAllInfoOneFicha(
    @Param(
      'id',
      new ParseIntPipe({ errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE }),
    )
    id: number,
  ) {
    return this.infodatoService.findAllInfoOneFicha(id);
  }

  @Patch(':id')
  @Roles(Role.Admin)
  @ApiOperation({ summary: 'update a informacionDato data by ID' })
  update(
    @Param(
      'id',
      new ParseIntPipe({ errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE }),
    )
    id: number,
    @Body() updateInfoDatoDto: UpdateInfoDatoDto,
  ) {
    return this.infodatoService.update(id, updateInfoDatoDto);
  }

  @Delete(':id')
  @Roles(Role.Admin)
  @ApiOperation({ summary: 'Delete a informacionDato from DB By ID' })
  remove(
    @Param(
      'id',
      new ParseIntPipe({ errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE }),
    )
    id: number,
  ) {
    return this.infodatoService.remove(id);
  }
}
