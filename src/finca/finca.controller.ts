import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { FincaService } from './finca.service';
import { CreateFincaDto } from './dto/create-finca.dto';
import { UpdateFincaDto } from './dto/update-finca.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('users - APi')
@Controller({
  version: '1',
  path: 'finca',
})
export class FincaController {
  constructor(private readonly fincaService: FincaService) {}

  @Post()
  create(@Body() createFincaDto: CreateFincaDto) {
    return this.fincaService.create(createFincaDto);
  }

  @Get()
  findAll() {
    return this.fincaService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.fincaService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateFincaDto: UpdateFincaDto) {
    return this.fincaService.update(+id, updateFincaDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.fincaService.remove(+id);
  }
}
