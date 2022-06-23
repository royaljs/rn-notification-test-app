import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, getRepository, DeleteResult } from 'typeorm';
import { NotificationService } from './notification.service';
import { UserEntity } from '../../user/entity/user.entity';
import { NotificationHistoryEntity } from '../entity/notification.entity';
import admin from 'firebase-admin';
import { PersonalNotificationResponseDto, NotificationHistoryResponseDto } from '../controller/dto';

@Injectable()
export class NotificationServiceImpl implements NotificationService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
    @InjectRepository(NotificationHistoryEntity)
    private readonly notificationHistoryRepository: Repository<NotificationHistoryEntity>
  ) {
    admin.initializeApp({
      credential: admin.credential.applicationDefault(),
    });
  }

  public async pushMessage(message: any): Promise<any> {
    const user = await this.userRepository.findOne({
      where: {
        id: message.userId,
      },
    });
    const sender = await this.userRepository.findOne({
      where: {
        id: message.senderId,
      },
    });

    const fcmToken = user.fcmToken;
    return admin.messaging().sendToDevice(fcmToken, {
      notification: message.notification,
      data: {
        sender: JSON.stringify({
         name: sender.name,
        }),
        abc: ""
      }
    }).then(data => new PersonalNotificationResponseDto()).finally(() => {
      this.notificationHistoryRepository.save(new NotificationHistoryEntity(message.senderId, message.userId, "category", message.notification.title, message.notification.body, 'https://item.kakaocdn.net/do/e8b4f78f7a48fdba045ecbebefb7d18dd0bbab1214a29e381afae56101ded106'));
    });
  }

  public async findNotificationHistories(userId: string): Promise<NotificationHistoryResponseDto[]> {
    console.log(userId)

    return await this.notificationHistoryRepository.find({ where: { receiverId: userId } });

  }
}