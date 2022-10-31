import { VaccineRegistrationService } from './vaccine_registration.service';
import { VaccineRegistrationController } from './vaccine_registration.controller';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { VaccineRegistration } from 'src/typeorm/entities/vaccine_registration.entity';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from '../auth/constants';

@Module({
  imports: [
    TypeOrmModule.forFeature([VaccineRegistration]),
    JwtModule.register({
      secret: jwtConstants.secret,
    }),
  ],
  controllers: [VaccineRegistrationController],
  providers: [VaccineRegistrationService],
  exports: [VaccineRegistrationModule],
})
export class VaccineRegistrationModule {}
