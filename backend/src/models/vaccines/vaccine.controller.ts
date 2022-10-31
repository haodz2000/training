import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { Roles } from '../auth/decorators/roles.decorator';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/role.guard';
import { Role } from '../auth/role.enum';
import { VaccineCreateDto } from './dto/vaccine-create.dto';
import { VaccineUpdateDto } from './dto/vaccine-update.dto';
import { VaccineService } from './vaccine.service';

@Controller('vaccines')
export class VaccineController {
  constructor(private readonly vaccineService: VaccineService) {}

  @Get('/')
  async findAll() {
    return await this.vaccineService.findAll();
  }

  @Get('/:id')
  async findOne(
    @Param(
      'id',
      new ParseIntPipe({ errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE }),
    )
    id: number,
  ) {
    return await this.vaccineService.findOne(id);
  }

  @Roles(Role.Admin)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @UsePipes(new ValidationPipe())
  @Post('/')
  async create(@Body() vaccineCreateDto: VaccineCreateDto) {
    return await this.vaccineService.create(vaccineCreateDto);
  }

  @Roles(Role.Admin)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @UsePipes(new ValidationPipe())
  @Patch('/:id')
  async update(
    @Param(
      'id',
      new ParseIntPipe({ errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE }),
    )
    id: number,
    @Body()
    vaccineUpdateDto: VaccineUpdateDto,
  ) {
    return await this.vaccineService.update(id, vaccineUpdateDto);
  }

  @Roles(Role.Admin)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Delete('/:id')
  async delete(
    @Param(
      'id',
      new ParseIntPipe({ errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE }),
    )
    id: number,
  ) {
    return await this.vaccineService.delete(id);
  }
}
