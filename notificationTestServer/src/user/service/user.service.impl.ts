import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, getRepository, DeleteResult } from 'typeorm';
import { UserEntity } from '../entity/user.entity';
import { UserCreateRequestDto, UserCreateResponseDto, UserReadResponseDto, UserUpdateRequestDto, UserUpdateResponseDto, UserDeleteResponseDto } from '../controller/dto';
import { validate } from 'class-validator';
import { HttpException } from '@nestjs/common/exceptions/http.exception';
import { HttpStatus } from '@nestjs/common';
import { UserService } from './user.service'

@Injectable()
export class UserServiceImpl implements UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>
  ) { }

  async findAll(): Promise<UserEntity[]> {
    return await this.userRepository.find();
  }

  async findUserById(id: string): Promise<UserReadResponseDto> {
    return this.userRepository.findOne(id).then((data) :UserReadResponseDto => {
      return new UserReadResponseDto(data.id, data.name, data.fcmToken);
    })
    .catch((err): any => {
      console.log("**")
      console.log(err)
    }
    );
  }

  async createUser(dto: UserCreateRequestDto): Promise<UserCreateResponseDto> {

    const { id, name, fcmToken } = dto;
    const qb = await getRepository(UserEntity)
      .createQueryBuilder('user')
      .where('user.id = :id', { id })

    const user = await qb.getOne();

    if (user) {
      const errors = { username: 'Username and email must be unique.' };
      throw new HttpException({ message: 'Input data validation failed', errors }, HttpStatus.BAD_REQUEST);

    }

    let newUser = new UserEntity(id, name, fcmToken);

    const errors = await validate(newUser);
    if (errors.length > 0) {
      const _errors = { username: 'Userinput is not valid.' };
      throw new HttpException({ message: 'Input data validation failed', _errors }, HttpStatus.BAD_REQUEST);

    } else {
      const savedUser = await this.userRepository.save(newUser);
      return savedUser;
    }

  }

  async update(id: string, dto: UserUpdateRequestDto): Promise<UserUpdateResponseDto> {
    let toUpdate = await this.userRepository.findOne(id);

    let updated = Object.assign(toUpdate, dto);
    return await this.userRepository.save(updated);
  }

  async delete(id: string): Promise<UserDeleteResponseDto> {
    return null;
    //return await this.userRepository.delete({ id: id});
  }

}
