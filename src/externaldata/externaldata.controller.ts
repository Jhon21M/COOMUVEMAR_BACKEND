import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpStatus,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';
import { ExternaldataService } from './externaldata.service';
import { CreateExternaldataDto } from './dto/create-externaldatum.dto';
import { UpdateExternaldatumDto } from './dto/update-externaldatum.dto';
import { Roles } from 'src/auth/decorator';
import { Role } from 'src/common/enum/role.enum';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiTags,
  ApiTooManyRequestsResponse,
} from '@nestjs/swagger';
import { JwtGuard } from 'src/auth/guard';
import { RolesGuard } from 'src/auth/guard/auth.guard';

@ApiTags('ExternalDATA - API')
@ApiTooManyRequestsResponse({
  status: HttpStatus.TOO_MANY_REQUESTS,
  description: 'Too many requests in a short time',
})
@UseGuards(JwtGuard, RolesGuard)
@ApiBearerAuth()
@Controller({
  version: '1',
  path: 'externaldata',
})
export class ExternaldataController {
  constructor(private readonly externaldataService: ExternaldataService) {}

  @Post()
  @Roles(Role.User, Role.Admin)
  @ApiOperation({ summary: 'post DATA from app Movil' })
  create(
    @Body(new ValidationPipe()) createExternaldatumDto: CreateExternaldataDto,
  ) {
    return this.externaldataService.create(createExternaldatumDto);
  }

  @Get()
  findAll() {
    return this.externaldataService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.externaldataService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateExternaldatumDto: UpdateExternaldatumDto,
  ) {
    return this.externaldataService.update(+id, updateExternaldatumDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.externaldataService.remove(+id);
  }
}
