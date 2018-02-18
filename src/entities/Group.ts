import {Entity, Column, PrimaryGeneratedColumn} from 'typeorm'
import { BaseEntity } from 'typeorm/repository/BaseEntity';

@Entity("group")
export class Group extends BaseEntity{
    @PrimaryGeneratedColumn()
    id: string

    @Column({length:100})
    role: string
    @Column({length:100})
    userId: string
}