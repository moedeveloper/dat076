import {Entity, Column, PrimaryGeneratedColumn, Double} from 'typeorm'
import { BaseEntity } from 'typeorm/repository/BaseEntity';

@Entity("eventCalendar")
export class EventCalendar extends BaseEntity{
    @PrimaryGeneratedColumn("uuid")
    id: string

    @Column("varchar", { nullable: false})
    starttime: string

    @Column("varchar", { nullable: false})
    endtime:string
}