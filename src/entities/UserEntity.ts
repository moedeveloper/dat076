import {Entity, Column, PrimaryGeneratedColumn} from 'typeorm'
import { BaseEntity } from 'typeorm/repository/BaseEntity';

@Entity("user")
export class UserEntity extends BaseEntity{
    @PrimaryGeneratedColumn()
    id: string

    @Column({length:100})
    firstname: string

    @Column({length:100})
    lastname: string

    @Column({length:100})
    telefon: string
}