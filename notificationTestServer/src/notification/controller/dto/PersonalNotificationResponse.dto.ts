import { IsNotEmpty } from 'class-validator';

export class PersonalNotificationResponseDto {

  @IsNotEmpty()
  readonly response: string;

}