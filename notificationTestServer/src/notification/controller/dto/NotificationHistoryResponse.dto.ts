import { IsNotEmpty } from 'class-validator';

export class NotificationHistoryResponseDto {

    @IsNotEmpty()
    senderId: string;

    @IsNotEmpty()
    receiverId: string;

    @IsNotEmpty()
    category: string;

    @IsNotEmpty()
    title: string;

    @IsNotEmpty()
    body: string;

    imageSrc: string;

    @IsNotEmpty()
    createdAt: Date;


}