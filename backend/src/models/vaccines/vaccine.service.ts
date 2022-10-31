import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Vaccine } from 'src/typeorm/entities/vaccine.entity';
import { Repository } from 'typeorm';
import { VaccineCreateDto } from './dto/vaccine-create.dto';
import { VaccineUpdateDto } from './dto/vaccine-update.dto';
import { IVaccine } from './interfaces/vaccine.interface';

@Injectable()
export class VaccineService {
  constructor(
    @InjectRepository(Vaccine)
    private vaccineRepository: Repository<Vaccine>,
  ) {}
  async findAll(): Promise<IVaccine[]> {
    try {
      const vaccines = await this.vaccineRepository.find();
      if (vaccines) {
        return vaccines;
      }
      throw new HttpException('Vaccine not found', HttpStatus.NOT_FOUND);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async findOne(id: number): Promise<IVaccine> {
    try {
      const vaccine = await this.vaccineRepository.findOne({ id });
      if (vaccine) {
        return vaccine;
      }
      throw new HttpException('Vaccine not found', HttpStatus.NOT_FOUND);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async create(vaccineCreateDto: VaccineCreateDto): Promise<IVaccine> {
    try {
      const code = vaccineCreateDto.code;
      const exitsVC = await this.vaccineRepository.findOne({ where: { code } });
      if (!exitsVC) {
        return await this.vaccineRepository.save(vaccineCreateDto);
      } else {
        throw new HttpException('Vaccine Exits', HttpStatus.NOT_ACCEPTABLE);
      }
    } catch (error) {
      throw new HttpException(error.message, 500);
    }
  }

  async update(id: number, vaccineUpdateDto: VaccineUpdateDto) {
    try {
      await this.vaccineRepository.update({ id }, vaccineUpdateDto);
      return await this.vaccineRepository.findOne(id);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async delete(id: number): Promise<{ message: string }> {
    try {
      await this.vaccineRepository.delete({ id });
      return { message: 'Success' };
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
