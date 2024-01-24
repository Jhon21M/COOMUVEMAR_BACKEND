import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { DatoService } from './dato.service';
import { CreateDatoDto } from './dto/create-dato.dto';
import { UpdateDatoDto } from './dto/update-dato.dto';

@Controller('dato')
export class DatoController {
  constructor(private readonly datoService: DatoService) {}

  @Post()
  create(@Body() createDatoDto: CreateDatoDto) {
    return this.datoService.create(createDatoDto);
  }

  @Get()
  findAll() {
    return this.datoService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.datoService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateDatoDto: UpdateDatoDto) {
    return this.datoService.update(+id, updateDatoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.datoService.remove(+id);
  }
}
