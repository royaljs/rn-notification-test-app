import { IsNotEmpty } from 'class-validator';

export class UserUpdateResponseDto {

  readonly id: string;

  readonly name: string;

  readonly fcmToken: string;
}