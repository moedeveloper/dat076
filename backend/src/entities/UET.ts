import {Entity, Column, PrimaryGeneratedColumn, Double, OneToOne, JoinColumn} from 'typeorm'
import { Treatement } from "./Treatement";
import { BaseEntity } from 'typeorm/repository/BaseEntity';
import { EventCalendar } from '../entities/EventCalendar';
import { UserEntity } from '../entities/UserEntity';
import { Customer } from '../entities/Customer';

@Entity("userEventTreatement")
export class UET extends BaseEntity{
    @PrimaryGeneratedColumn("uuid")
    id: string

    // //@OneToOne(type => UserEntity)
    // @Column("varchar", { nullable: false})
    // userId: string
    // @Column("varchar", { nullable: false})
    // treatementId: string
    // @Column("varchar", { nullable: false})
    // costumerId: string
    // @Column("varchar", { nullable: false})
    // eventId: string

    @Column("varchar", { nullable: false})
    employeeId:string
    @Column("varchar", { nullable: false})
    eventId:string
    @Column("varchar", { nullable: false})
    treatmentId:string
    @Column("varchar", { nullable: false})
    customerId: string
}