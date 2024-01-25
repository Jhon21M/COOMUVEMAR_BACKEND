import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { DesicionService } from './desicion.service';
import { CreateDesicionDto } from './dto/create-desicion.dto';
import { UpdateDesicionDto } from './dto/update-desicion.dto';

@Controller('desicion')
export class DesicionController {
  constructor(private readonly desicionService: DesicionService) {}

  @Post()
  create(@Body() createDesicionDto: CreateDesicionDto) {
    return this.desicionService.create(createDesicionDto);
  }

  @Get()
  findAll() {
    return this.desicionService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.desicionService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateDesicionDto: UpdateDesicionDto) {
    return this.desicionService.update(+id, updateDesicionDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.desicionService.remove(+id);
  }
}
