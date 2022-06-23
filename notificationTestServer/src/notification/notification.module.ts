import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { NotificationController } from './controller/notification.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from '../user/entity/user.entity'
import { NotificationServiceImpl } from './service/notification.service.impl';
import { NotificationHistoryEntity } from './entity/notification.entity';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity]), TypeOrmModule.forFeature([NotificationHistoryEntity])],
  providers: [{
    provide: 'NotificationService',
    useClass: NotificationServiceImpl
  }],
  controllers: [
    NotificationController
  ],
})
export class NotificationModule { }