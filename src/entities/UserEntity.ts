import {Entity, Column, PrimaryGeneratedColumn} from 'typeorm'

@Entity("user")
export class UserEntity{
    @PrimaryGeneratedColumn()
    id: string

    @Column({length:100})
    firstname: string

    @Column({length:100})
    lastname: string

    @Column({length:100})
    telefon: string
}