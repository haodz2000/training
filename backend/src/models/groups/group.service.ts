import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Group } from 'src/typeorm/entities/group.entity';
import { Repository } from 'typeorm';
import { GroupDto } from './dto/group.dto';
import { IGroup } from './interfaces/group.interface';

@Injectable()
export class GroupService {
  constructor(
    @InjectRepository(Group)
    private readonly groupRepository: Repository<Group>,
  ) {}

  async findAll(): Promise<IGroup[]> {
    try {
      const groups = await this.groupRepository.find();
      if (groups) {
        return groups;
      }
      throw new HttpException('Not found group', HttpStatus.NOT_FOUND);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async findOne(id: number): Promise<IGroup> {
    try {
      const group = await this.groupRepository.findOne({ id });
      if (group) {
        return group;
      }
      throw new HttpException('Not found group', HttpStatus.NOT_FOUND);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async create(groupDto: GroupDto): Promise<IGroup> {
    try {
      return await this.groupRepository.save(groupDto);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async update(id: number, updateGroupDto: GroupDto): Promise<IGroup> {
    try {
      await this.groupRepository.update({ id }, updateGroupDto);
      const group = await this.groupRepository.findOne({ id });
      return group;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async delete(id: number): Promise<{ message: string }> {
    try {
      await this.groupRepository.delete({ id });
      return { message: 'Success' };
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
