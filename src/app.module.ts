import { Module } from '@nestjs/common';
import { ProductorModule } from './productor/productor.module';
import { ProductorController } from './productor/productor.controller';
import { ProductorService } from './productor/productor.service';
import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from './prisma/prisma.module';
import { GoogleModule } from './common/google_cloud/google.module';
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
import { InfoDatoModule } from './info-dato/info-dato.module';
import { DocumentoModule } from './documento/documento.module';
import { DesicionModule } from './desicion/desicion.module';
import { APP_FILTER, APP_GUARD } from '@nestjs/core';
import { RolesGuard } from './auth/guard/auth.guard';
import { DashboardModule } from './dashboard/dashboard.module';
import { PrismaExceptionFilter } from './common/filters/prisma.filter.exception';
import { NestjsFormDataModule } from 'nestjs-form-data';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    NestjsFormDataModule,
    AuthModule,
    PrismaModule,
    GoogleModule,
    ProductorModule,
    UserModule,
    FincaModule,
    InspectorModule,
    FichaModule,
    SecFichaModule,
    DatoModule,
    InfoDatoModule,
    DocumentoModule,
    DesicionModule,
    DashboardModule,
  ],
  controllers: [ProductorController, AuthController, UserController],
  providers: [
    ProductorService,
    AuthService,
    UserService,
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    },
    {
      provide: APP_FILTER,
      useClass: PrismaExceptionFilter,
    },
    // {
    //   provide: APP_FILTER,
    //   useClass: HttpExceptionFilter,
    // },
  ],
})
export class AppModule {}
