import {Entity, Column, PrimaryGeneratedColumn} from 'typeorm'
import { BaseEntity } from 'typeorm/repository/BaseEntity';

@Entity("customer")
export class CustomerHistory extends BaseEntity{
    @PrimaryGeneratedColumn()
    id: string
}