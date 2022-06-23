import { IsNotEmpty } from 'class-validator';

export class UserReadResponseDto {

  readonly id: string;

  readonly name: string;

  readonly fcmToken: string;

  constructor(id: string, name: string, fcmToken: string){
    this.id = id;
    this.name = name;
    this.fcmToken = fcmToken;
  }
}