import {Entity, Column, PrimaryGeneratedColumn, PrimaryColumn} from 'typeorm'
import { roles } from "./roles";
import { BaseEntity } from 'typeorm/repository/BaseEntity';

@Entity("user")
export class UserEntity extends BaseEntity{
    
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column("varchar", { nullable: false})
    firstname: string

    @Column("varchar", { nullable: false})
    lastname: string

    @Column("varchar", { nullable: false})
    telefon: string

    @Column("varchar", {nullable: false})
    roleId: string
}