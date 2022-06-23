import { Get, Post, Body, Put, Delete, Param, Controller, UsePipes, Inject } from '@nestjs/common';
import { NotificationService } from '../service/notification.service';
import { PersonalNotificationRequestDto, PersonalNotificationResponseDto, NotificationHistoryResponseDto } from './dto';
import { HttpException } from '@nestjs/common/exceptions/http.exception';
import { ValidationPipe } from '../../shared/pipes/validation.pipe';

import {
  ApiTags
} from '@nestjs/swagger';

@ApiTags('notifications')
@Controller('notifications')
export class NotificationController {

  constructor(@Inject('NotificationService') private readonly notificationService: NotificationService) { }

  @UsePipes(new ValidationPipe())
  @Post()
  async pushMessage(@Body() requestDto: PersonalNotificationRequestDto): Promise<PersonalNotificationResponseDto> {
    return this.notificationService.pushMessage(requestDto);
  }

  @Get('/:userId')
  async findNotificationHistories(@Param('userId') userId: string): Promise<NotificationHistoryResponseDto[]> {
    console.log("aaaaaaa")
    console.log(userId)
    return await this.notificationService.findNotificationHistories(userId);
  }

}
