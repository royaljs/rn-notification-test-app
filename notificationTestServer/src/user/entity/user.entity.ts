import {Entity, PrimaryColumn, Column, BeforeInsert, JoinTable, ManyToMany, OneToMany} from 'typeorm';
//import * as argon2 from 'argon2';

@Entity('user')
export class UserEntity {

  @PrimaryColumn()
  id: string;

  @Column()
  name: string;

  @Column({nullable: true})
  fcmToken: string;

  constructor(id: string, name: string, fcmToken: string){
    this.id = id;
    this.name = name;
    this.fcmToken = fcmToken;
  }
}
