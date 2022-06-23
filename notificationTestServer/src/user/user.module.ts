import {MiddlewareConsumer, Module, NestModule, RequestMethod} from '@nestjs/common';
import { UserController } from './controller/user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './entity/user.entity';
import { UserServiceImpl } from './service/user.service.impl';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity])],
  providers: [{
    provide: 'UserService',
    useClass: UserServiceImpl
  }],
  controllers: [
    UserController
  ],
})
export class UserModule {}