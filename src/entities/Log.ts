import {Entity, Column, PrimaryGeneratedColumn, Double} from 'typeorm'
import { BaseEntity } from 'typeorm/repository/BaseEntity';

@Entity("log")
export class Log extends BaseEntity{
    @PrimaryGeneratedColumn()
    id: string

    @Column()
    time: any

    @Column({length:100})
    action: string

    @Column({length:100})
    userId: string
}