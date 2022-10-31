import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { District } from 'src/typeorm/entities/district.entity';
import { Province } from 'src/typeorm/entities/province.entity';
import { Ward } from 'src/typeorm/entities/ward.entity';
import { AreaController } from './area.controller';
import { AreaService } from './area.service';

@Module({
  imports: [TypeOrmModule.forFeature([Province, District, Ward])],
  controllers: [AreaController],
  providers: [AreaService],
})
export class AreaModule {}
