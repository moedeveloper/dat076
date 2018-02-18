import {Entity, Column, PrimaryGeneratedColumn} from 'typeorm'
import { BaseEntity } from 'typeorm/repository/BaseEntity';

@Entity("salaryReport")
export class SalaryReport extends BaseEntity{
    @PrimaryGeneratedColumn()
    id: string

    // TODO add attbr
}