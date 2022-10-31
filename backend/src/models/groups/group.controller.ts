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
import { GroupDto } from './dto/group.dto';
import { GroupService } from './group.service';

@Controller('groups')
export class GroupController {
  constructor(private readonly groupService: GroupService) {}

  @Get('/')
  async findAll() {
    return await this.groupService.findAll();
  }

  @Get('/:id')
  async findOne(
    @Param(
      'id',
      new ParseIntPipe({ errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE }),
    )
    id: number,
  ) {
    return await this.groupService.findOne(id);
  }

  @Roles(Role.Admin)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @UsePipes(new ValidationPipe())
  @Post('/')
  async create(@Body() groupDto: GroupDto) {
    return await this.groupService.create(groupDto);
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
    @Body() updateGroupDto: GroupDto,
  ) {
    return await this.groupService.update(id, updateGroupDto);
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
    return await this.groupService.delete(id);
  }
}
