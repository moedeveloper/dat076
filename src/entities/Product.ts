import {Entity, Column, PrimaryGeneratedColumn} from 'typeorm'
import { BaseEntity } from 'typeorm/repository/BaseEntity';

@Entity("product")
export class Product extends BaseEntity{
    @PrimaryGeneratedColumn()
    id: string

    @Column({length:100})
    name: string
    @Column("double")
    price: number
}