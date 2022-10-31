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
import { CreateSiteDto } from './dto/create-site.dto';
import { UpdateSiteDto } from './dto/update-site.dto';
import { SiteService } from './site.service';

@Controller('sites')
export class SiteController {
  constructor(private readonly siteService: SiteService) {}

  @Get()
  async findAll() {
    return await this.siteService.findAll();
  }

  @Get('/:id')
  async findOne(
    @Param(
      'id',
      new ParseIntPipe({ errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE }),
    )
    id: number,
  ) {
    return await this.siteService.findOne(id);
  }

  @UsePipes(new ValidationPipe())
  @Roles(Role.Admin)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Post()
  async create(@Body() createSiteDto: CreateSiteDto) {
    return await this.siteService.create(createSiteDto);
  }

  @UsePipes(new ValidationPipe())
  @Roles(Role.Admin)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Patch('/:id')
  async update(
    @Param(
      'id',
      new ParseIntPipe({ errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE }),
    )
    id: number,
    @Body() updateSiteDto: UpdateSiteDto,
  ) {
    return await this.siteService.update(id, updateSiteDto);
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
    return await this.siteService.delete(id);
  }
}
