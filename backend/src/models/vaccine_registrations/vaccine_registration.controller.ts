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
  Query,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { Roles } from '../auth/decorators/roles.decorator';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/role.guard';
import { Role } from '../auth/role.enum';
import { CreateRegistrationDto } from './dto/create_registration.dto';
import { QueryDto } from './dto/query.dto';
import { UpdateRegistrationDto } from './dto/update_registration.dto';
import { VaccineRegistrationService } from './vaccine_registration.service';

@Controller('vaccine-registrations')
export class VaccineRegistrationController {
  constructor(
    private readonly vaccineRegistrationService: VaccineRegistrationService,
  ) {}

  @Roles(Role.Admin, Role.User)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Get('/users')
  async findWithQuery(@Query() queryDto: QueryDto) {
    return this.vaccineRegistrationService.findWithQuery(queryDto);
  }

  @Roles(Role.Admin)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Get('/')
  async findAll() {
    return await this.vaccineRegistrationService.findAll();
  }

  @Roles(Role.Admin)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Get('/:id')
  async findOne(
    @Param(
      'id',
      new ParseIntPipe({ errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE }),
    )
    id: number,
  ) {
    return await this.vaccineRegistrationService.findOne(id);
  }

  @Roles(Role.Admin, Role.User)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @UsePipes(new ValidationPipe())
  @Post('/')
  async create(@Body() createRegistration: CreateRegistrationDto) {
    return await this.vaccineRegistrationService.create(createRegistration);
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
    @Body() updateRegistration: UpdateRegistrationDto,
  ) {
    return await this.vaccineRegistrationService.update(id, updateRegistration);
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
    return await this.vaccineRegistrationService.delete(id);
  }
}
