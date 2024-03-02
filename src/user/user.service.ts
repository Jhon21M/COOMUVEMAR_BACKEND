import { ForbiddenException, Injectable } from '@nestjs/common';
import { EntityUser } from 'src/user/entities/user.entity';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async create(user: EntityUser): Promise<any> {
    return await this.prisma.usuario.create({
      data: {
        ...user,
      },
    });
  }

  async findAll() {
    return await this.prisma.usuario.findMany();
  }

  async findOneTrabajador(id: number) {
    const user = await this.prisma.usuario.findUnique({
      where: {
        id: typeof id === 'number' ? id : Number.parseInt(id),
      },
    });

    if (!user) throw new ForbiddenException('User Not Found on DB');

    return await this.prisma.trabajador.findUnique({
      where: {
        id: user.IDTrabajador,
      },
    });
  }

  async update(
    id: number,
    informacion: Partial<EntityUser>,
  ): Promise<EntityUser> {
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

    //send back the user deleted
    return this.prisma.usuario.delete({
      where: {
        id: user.id,
      },
    });
  }
}
