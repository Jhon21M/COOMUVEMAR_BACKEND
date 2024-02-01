import { ForbiddenException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { EditUserDto } from 'src/user/dto';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async findAll() {
    return await this.prisma.usuario.findMany();
  }

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

  async findOneUserByID(id: number) {
    return await this.prisma.usuario.findUnique({
      where: {
        id: typeof id === 'number' ? id : Number.parseInt(id),
      },
    });
  }

  async remove(id: number) {
    const user = await this.prisma.usuario.findUnique({
      where: {
        id: typeof id === 'number' ? id : Number.parseInt(id),
      },
    });

    // if user does not exist throw exception
    if (!user) throw new ForbiddenException('User Not Found on DB');

    //send back the user
    return this.prisma.usuario.delete({
      where: {
        id: user.id,
      },
    });
  }
}
