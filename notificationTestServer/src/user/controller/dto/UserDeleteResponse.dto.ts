import { IsNotEmpty } from 'class-validator';

export class UserDeleteResponseDto {

  readonly id: string;

  readonly name: string;

  readonly fcmToken: string;
}