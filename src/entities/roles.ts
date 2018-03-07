import {Entity, Column, PrimaryGeneratedColumn, PrimaryColumn} from 'typeorm'
import { BaseEntity } from 'typeorm/repository/BaseEntity';

export enum roles{
    customer = "customer",
    employee= "employee",
    admin= "admin"
}

@Entity("roles")
export class RoleEntity extends BaseEntity{
    
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column("varchar")
    role: string
}
