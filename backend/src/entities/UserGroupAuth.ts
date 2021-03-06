import {Entity, Column, PrimaryGeneratedColumn} from 'typeorm'
import { BaseEntity } from 'typeorm/repository/BaseEntity';

@Entity("userGroupAuth")
export class UserGroupAuth extends BaseEntity{
    @PrimaryGeneratedColumn("uuid")
    id: string
    userId: any
    privilegeId: any
    authId: any
}