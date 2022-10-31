import { GroupService } from './group.service';
import { GroupController } from './group.controller';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Group } from 'src/typeorm/entities/group.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Group])],
  controllers: [GroupController],
  providers: [GroupService],
})
export class GroupModule {}
