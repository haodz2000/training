import { VaccineService } from './vaccine.service';
import { VaccineController } from './vaccine.controller';

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Vaccine } from 'src/typeorm/entities/vaccine.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Vaccine])],
  controllers: [VaccineController],
  providers: [VaccineService],
})
export class VaccineModule {}
