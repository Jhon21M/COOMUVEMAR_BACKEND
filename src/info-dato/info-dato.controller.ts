import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { InfoDatoService } from './info-dato.service';
import { CreateInfoDatoDto } from './dto/create-info-dato.dto';
import { UpdateInfoDatoDto } from './dto/update-info-dato.dto';

@Controller('info-dato')
export class InfoDatoController {
  constructor(private readonly infoDatoService: InfoDatoService) {}

  @Post()
  create(@Body() createInfoDatoDto: CreateInfoDatoDto) {
    return this.infoDatoService.create(createInfoDatoDto);
  }

  @Get()
  findAll() {
    return this.infoDatoService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.infoDatoService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateInfoDatoDto: UpdateInfoDatoDto) {
    return this.infoDatoService.update(+id, updateInfoDatoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.infoDatoService.remove(+id);
  }
}
