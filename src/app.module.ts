import { Module } from '@nestjs/common';
import { ProductorModule } from './productor/productor.module';
import { ProductorController } from './productor/productor.controller';
import { ProductorService } from './productor/productor.service';
import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './auth/auth.module';
import { AuthController } from './auth/auth.controller';
import { AuthService } from './auth/auth.service';
import { UserModule } from './user/user.module';
import { UserController } from './user/user.controller';
import { UserService } from './user/user.service';
import { FincaModule } from './finca/finca.module';
import { InspectorModule } from './inspector/inspector.module';
import { FichaModule } from './ficha/ficha.module';
import { SecFichaModule } from './sec-ficha/sec-ficha.module';
import { DatoModule } from './dato/dato.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    AuthModule,
    PrismaModule,
    ProductorModule,
    UserModule,
    FincaModule,
    InspectorModule,
    FichaModule,
    SecFichaModule,
    DatoModule,
  ],
  controllers: [ProductorController, AuthController, UserController],
  providers: [ProductorService, AuthService, UserService],
})
export class AppModule {}
