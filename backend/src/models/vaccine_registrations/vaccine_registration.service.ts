import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { VaccineRegistration } from 'src/typeorm/entities/vaccine_registration.entity';
import { Repository } from 'typeorm';
import { CreateRegistrationDto } from './dto/create_registration.dto';
import { QueryDto } from './dto/query.dto';
import { UpdateRegistrationDto } from './dto/update_registration.dto';
import { IPayloadToken } from './interfaces/payload_token.interface';
import {
  IVaccineRegistration,
  IVaccineRegistrationResponse,
} from './interfaces/vaccine_registration.interface';
import { Status } from './status.enum';

@Injectable()
export class VaccineRegistrationService {
  constructor(
    @InjectRepository(VaccineRegistration)
    private readonly vaccineResgistrationRepositoy: Repository<VaccineRegistration>,
    private readonly jwtService: JwtService,
  ) {}

  async findAll(): Promise<IVaccineRegistrationResponse[]> {
    try {
      const res: IVaccineRegistrationResponse[] =
        await this.vaccineResgistrationRepositoy.find({
          where: { status: Status.SUCCESS },
          relations: ['user'],
        });
      if (res) {
        const result = res.map((item) => {
          const { password, type, tokenResetPassword, ...rest } = item.user;
          const data = { password, type, tokenResetPassword, response: rest };
          item = { ...item, user: data.response };
          return item;
        });
        return result;
      }
      throw new HttpException('Not found data', HttpStatus.NOT_FOUND);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async findOne(id: number): Promise<IVaccineRegistration> {
    try {
      const data = await this.vaccineResgistrationRepositoy.findOne({
        where: { id },
        relations: ['site', 'vaccine', 'user'],
      });
      if (data) {
        return data;
      }
      throw new HttpException('Not found data', HttpStatus.NOT_FOUND);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async create(
    createRegistration: CreateRegistrationDto,
  ): Promise<IVaccineRegistration> {
    try {
      const userId = createRegistration.userId;
      const oldRequest = await this.vaccineResgistrationRepositoy.findOne({
        where: {
          userId: userId,
          status: Status.SUCCESS,
        },
      });
      if (oldRequest) {
        throw new HttpException(
          'Ban da dang ky tiem',
          HttpStatus.NOT_ACCEPTABLE,
        );
      }
      const code = `${new Date().getTime()}${userId}`;
      return await this.vaccineResgistrationRepositoy.save({
        code,
        ...createRegistration,
      });
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async update(
    id: number,
    updateRegistration: UpdateRegistrationDto,
  ): Promise<IVaccineRegistration> {
    try {
      await this.vaccineResgistrationRepositoy.update(
        { id },
        updateRegistration,
      );
      const update = await this.findOne(id);
      return update;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async delete(id: number): Promise<{ message: string }> {
    try {
      await this.vaccineResgistrationRepositoy.delete({ id });
      return { message: 'Success' };
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async findWithQuery(
    queryDto: QueryDto,
  ): Promise<IVaccineRegistration | IVaccineRegistration[]> {
    try {
      if (queryDto.token) {
        const payload: IPayloadToken = await this.jwtService.verify(
          queryDto.token,
        );
        if (payload) {
          if (queryDto.status == Status.SUCCESS) {
            return await this.vaccineResgistrationRepositoy.findOne({
              where: { userId: payload.id, status: queryDto.status },
              relations: ['site', 'vaccine'],
            });
          }
          if (queryDto.status == Status.COMPLETED) {
            return await this.vaccineResgistrationRepositoy.find({
              where: { userId: payload.id, status: queryDto.status },
              relations: ['site', 'vaccine'],
            });
          }
          return await this.vaccineResgistrationRepositoy.find({
            where: { userId: payload.id },
            relations: ['site', 'vaccine'],
          });
        } else {
          throw new HttpException('Token not valid', HttpStatus.NOT_ACCEPTABLE);
        }
      }
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
