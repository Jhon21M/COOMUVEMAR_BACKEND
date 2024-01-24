import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { SecFichaService } from './sec-ficha.service';
import { CreateSecFichaDto } from './dto/create-sec-ficha.dto';
import { UpdateSecFichaDto } from './dto/update-sec-ficha.dto';

@Controller('sec-ficha')
export class SecFichaController {
  constructor(private readonly secFichaService: SecFichaService) {}

  @Post()
  create(@Body() createSecFichaDto: CreateSecFichaDto) {
    return this.secFichaService.create(createSecFichaDto);
  }

  @Get()
  findAll() {
    return this.secFichaService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.secFichaService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateSecFichaDto: UpdateSecFichaDto) {
    return this.secFichaService.update(+id, updateSecFichaDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.secFichaService.remove(+id);
  }
}
