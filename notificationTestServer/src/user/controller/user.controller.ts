import { Get, Post, Body, Put, Delete, Param, Controller, UsePipes, Inject } from '@nestjs/common';
import { UserService } from '../service/user.service';
import { UserCreateRequestDto, UserCreateResponseDto, UserReadResponseDto, UserUpdateRequestDto, UserUpdateResponseDto, UserDeleteResponseDto} from './dto';
import { HttpException } from '@nestjs/common/exceptions/http.exception';
import { User } from './user.decorator';
import { ValidationPipe } from '../../shared/pipes/validation.pipe';

import {
  ApiTags
} from '@nestjs/swagger';
import { UserEntity } from '../entity/user.entity';

@ApiTags('users')
@Controller('users')
export class UserController {

  constructor(@Inject('UserService') private readonly userService: UserService) { }

  @UsePipes(new ValidationPipe())
  @Post()
  async createUser(@Body() requestDto: UserCreateRequestDto) : Promise<UserCreateResponseDto>{
    return this.userService.createUser(requestDto);
  }

  @Get()
  async findAllUsers(): Promise<UserReadResponseDto[]> {
    const errors = { User: ' not found' };
    const responsetDto = await this.userService.findAll();
    if (!responsetDto) throw new HttpException({ errors }, 401);
    return responsetDto;
  }

  @Get('/:id')
  async findUser(@Param('id') id: string): Promise<UserReadResponseDto> {
    console.log(id)
    const errors = { User: ' not found' };
    const requestDto = await this.userService.findUserById(id);
    if (!requestDto) throw new HttpException({ errors }, 401);
    return requestDto;
  }

  @Post(':id/update')
  async updateUser(@Param('id') id: string, @Body() requestDto: UserUpdateRequestDto) : Promise<UserUpdateResponseDto>{
    return await this.userService.update(id, requestDto);
  }

  @Delete('/:id')
  async deleteUser(@Param('id') id: string) : Promise<UserDeleteResponseDto>{
    return await this.userService.delete(id);
  }
}
