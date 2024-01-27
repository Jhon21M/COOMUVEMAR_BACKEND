import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { EditUserDto } from './dto';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async update(id: number, informacion: EditUserDto): Promise<EditUserDto> {
    return await this.prisma.usuario.update({
      where: {
        id: typeof id === 'number' ? id : Number.parseInt(id),
      },
      data: {
        ...informacion,
      },
    });
  }

  findOneUserByID(id: number) {
    return this.prisma.usuario.findUnique({
      where: {
        id: typeof id === 'number' ? id : Number.parseInt(id),
      },
    });
  }

  remove(id: number) {
    return this.prisma.usuario.delete({
      where: {
        id: typeof id === 'number' ? id : Number.parseInt(id),
      },
    });
  }
}
