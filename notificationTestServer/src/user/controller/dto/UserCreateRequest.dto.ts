import { IsNotEmpty } from 'class-validator';

export class UserCreateRequestDto {

  @IsNotEmpty()
  readonly id: string;

  @IsNotEmpty()
  readonly name: string;

  readonly fcmToken: string;
}