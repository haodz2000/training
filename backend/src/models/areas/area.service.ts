import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { District } from 'src/typeorm/entities/district.entity';
import { Province } from 'src/typeorm/entities/province.entity';
import { Ward } from 'src/typeorm/entities/ward.entity';
import { Repository } from 'typeorm';
import { IDistrict } from './interfaces/district.interface';
import { IProvince } from './interfaces/province.interface';
import { IWard } from './interfaces/ward.interface';

@Injectable()
export class AreaService {
  constructor(
    @InjectRepository(Province)
    private readonly provinceRepository: Repository<Province>,

    @InjectRepository(District)
    private readonly districtRepository: Repository<District>,

    @InjectRepository(Ward)
    private readonly wardRepository: Repository<Ward>,
  ) {}

  async findAllProvince(): Promise<IProvince[] | undefined> {
    try {
      const provinces = await this.provinceRepository.find();
      return provinces;
    } catch (error) {
      throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async findDistricts(id: number): Promise<IDistrict[] | undefined> {
    try {
      const districts = await this.districtRepository.find({
        where: { provinceId: id },
      });
      return districts as IDistrict[];
    } catch (error) {
      throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async findWards(id: number): Promise<IWard[]> {
    try {
      const wards = await this.wardRepository.find({
        where: { districtId: id },
      });
      return wards;
    } catch (error) {
      throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
