import { AuthModule } from './models/auth/auth.module';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConsoleModule } from '@squareboat/nest-console';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './models/users/users.module';
import { ConfigModule } from '@nestjs/config';
import { typeOrmAsyncConfig } from './config/typeorm.config';
import { AdministrativeUnitModule } from './models/administrative_units/administrativeunit.module';
import { AreaModule } from './models/areas/area.module';
import { ForgotPasswordModule } from './models/forgot_password/forgot_password.module';
import { SiteModule } from './models/sites/site.module';
import { VaccineModule } from './models/vaccines/vaccine.module';
import { GroupModule } from './models/groups/group.module';
import { VaccineRegistrationModule } from './models/vaccine_registrations/vaccine_registration.module';
import { DocumentModule } from './models/documents/document.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    ConsoleModule,
    TypeOrmModule.forRootAsync(typeOrmAsyncConfig),
    UsersModule,
    AdministrativeUnitModule,
    AuthModule,
    AreaModule,
    ForgotPasswordModule,
    SiteModule,
    VaccineModule,
    GroupModule,
    VaccineRegistrationModule,
    DocumentModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
