import { NotificationHistoryResponseDto } from '../controller/dto';
export interface NotificationService {
  pushMessage(message: any): any;
  findNotificationHistories(userId: string): Promise<NotificationHistoryResponseDto[]>;
}