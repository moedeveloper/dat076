import {Entity, Column, PrimaryGeneratedColumn} from 'typeorm'
import { BaseEntity } from 'typeorm/repository/BaseEntity';

@Entity("product")
export class Product extends BaseEntity{
    @PrimaryGeneratedColumn("uuid")
    id: string

    @Column()
    name: string
    @Column("double")
    price: number
}