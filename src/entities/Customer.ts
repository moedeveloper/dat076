import {Entity, Column, PrimaryGeneratedColumn} from 'typeorm'
import { BaseEntity } from 'typeorm/repository/BaseEntity';

@Entity("customer")
export class Customer extends BaseEntity{
    @PrimaryGeneratedColumn("uuid")
    id: string

    @Column("varchar", { nullable: false})
    userId: string
    
    @Column("varchar", { nullable: false})
    authId: string

    @Column("varchar", { nullable: false})
    historyId: string
}