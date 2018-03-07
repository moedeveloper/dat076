import {Entity, Column, PrimaryGeneratedColumn, Double} from 'typeorm'
import { BaseEntity } from 'typeorm/repository/BaseEntity';

@Entity("treatement")
export class Treatement extends BaseEntity{
    @PrimaryGeneratedColumn("uuid")
    id: string

    @Column("varchar", { nullable: false})
    name: string

    @Column("varchar", { nullable: false})
    duration: string

    @Column("double", {nullable: false})
    price: number
}