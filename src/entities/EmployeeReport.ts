import {Entity, Column, PrimaryGeneratedColumn} from 'typeorm'
import { BaseEntity } from 'typeorm/repository/BaseEntity';

@Entity("employeereport")
export class EmployeeReport extends BaseEntity{
    @PrimaryGeneratedColumn("uuid")
    id: string

    @Column()
    workinghours: any
}