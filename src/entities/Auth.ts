import {Entity, Column, PrimaryGeneratedColumn} from 'typeorm'
import { BaseEntity } from 'typeorm/repository/BaseEntity';

@Entity("auth")
export class Auth extends BaseEntity{
    @PrimaryGeneratedColumn()
    id: string

    @Column({length:100})
    username: string

    @Column({length:100})
    password: string
}