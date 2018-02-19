import {Entity, Column, PrimaryGeneratedColumn} from 'typeorm'
import { BaseEntity } from 'typeorm/repository/BaseEntity';

@Entity("group")
export class Group extends BaseEntity{
    @PrimaryGeneratedColumn("uuid")
    id: string

    @Column()
    role: string
    @Column()
    userId: string
}