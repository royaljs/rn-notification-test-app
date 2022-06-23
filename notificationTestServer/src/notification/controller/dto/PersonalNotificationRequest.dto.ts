import { IsNotEmpty } from 'class-validator';

export class PersonalNotificationRequestDto {

  @IsNotEmpty()
  readonly senderId: string;

  @IsNotEmpty()
  readonly userId: string;

  readonly notification: any;

}