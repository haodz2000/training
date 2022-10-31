import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Site } from 'src/typeorm/entities/site.entity';
import { Repository } from 'typeorm';
import { CreateSiteDto } from './dto/create-site.dto';
import { UpdateSiteDto } from './dto/update-site.dto';
import { ISite } from './interfaces/site.interface';

@Injectable()
export class SiteService {
  constructor(
    @InjectRepository(Site)
    private readonly siteRepository: Repository<Site>,
  ) {}

  async findAll(): Promise<ISite[]> {
    try {
      const sites = await this.siteRepository.find({
        relations: ['ward', 'ward.district', 'ward.district.province'],
      });
      if (sites) {
        return sites;
      }
      throw new HttpException('Not exits Site', HttpStatus.NOT_FOUND);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async findOne(id: number): Promise<ISite> {
    try {
      const site = await this.siteRepository.findOne({
        where: { id },
        relations: ['ward', 'ward.district', 'ward.district.province'],
      });
      if (site) {
        return site;
      }
      throw new HttpException('Not exits Site', HttpStatus.NOT_FOUND);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async create(createSiteDto: CreateSiteDto): Promise<ISite> {
    try {
      const newSite = await this.siteRepository.save(createSiteDto);
      return newSite;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async update(id: number, updateSiteDto: UpdateSiteDto): Promise<ISite> {
    try {
      await this.siteRepository.update({ id }, updateSiteDto);
      const siteUpdate = await this.findOne(id);
      return siteUpdate;
    } catch (error) {
      throw new HttpException(error.message, 404);
    }
  }

  async delete(id: number): Promise<{ message: string }> {
    try {
      await this.siteRepository.delete({ id });
      return { message: 'Success' };
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
