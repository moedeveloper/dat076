import {Entity, Column, PrimaryGeneratedColumn} from 'typeorm'
import { BaseEntity } from 'typeorm/repository/BaseEntity';

@Entity("auth")
export class Auth extends BaseEntity{
    @PrimaryGeneratedColumn("uuid")
    id: string

    @Column()
    username: string

    @Column()
    password: string
}