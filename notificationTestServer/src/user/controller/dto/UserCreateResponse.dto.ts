import { IsNotEmpty } from 'class-validator';

export class UserCreateResponseDto {

  readonly id: string;

  readonly name: string;

  readonly fcmToken: string;
}