import { Entity, PrimaryColumn, PrimaryGeneratedColumn, Column, BeforeInsert, JoinTable, ManyToMany, OneToMany, CreateDateColumn } from 'typeorm';
//import * as argon2 from 'argon2';

@Entity('notificationHistory')
export class NotificationHistoryEntity {

    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column()
    senderId: string;

    @Column()
    receiverId: string;

    @Column()
    category: string;

    @Column()
    title: string;

    @Column()
    body: string;

    @Column()
    imageSrc: string;

    @CreateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)" })
    createdAt: Date;

    constructor(senderId: string, receiverId: string, category: string, title: string, body: string, imageSrc: string) {
        this.senderId = senderId;
        this.receiverId = receiverId;
        this.category = category;
        this.title = title;
        this.body = body;
        this.imageSrc = imageSrc;
    }
}
