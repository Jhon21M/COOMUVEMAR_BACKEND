import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ExternaldataService } from './externaldata.service';
import { CreateExternaldatumDto } from './dto/create-externaldatum.dto';
import { UpdateExternaldatumDto } from './dto/update-externaldatum.dto';

@Controller('externaldata')
export class ExternaldataController {
  constructor(private readonly externaldataService: ExternaldataService) {}

  @Post()
  create(@Body() createExternaldatumDto: CreateExternaldatumDto) {
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
  update(@Param('id') id: string, @Body() updateExternaldatumDto: UpdateExternaldatumDto) {
    return this.externaldataService.update(+id, updateExternaldatumDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.externaldataService.remove(+id);
  }
}
