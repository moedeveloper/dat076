import "reflect-metadata";
import {ConnectionOptions} from "typeorm";
import { UserEntity } from "./../entities/UserEntity";
import { EventCalendar } from "../entities/EventCalendar";
import { Customer } from "../entities/Customer";
import { Treatement } from "../entities/Treatement";
import { UET } from "../entities/UET";

 export let dbOptions: ConnectionOptions = {
    type: "mysql",
    host: "eu-cdbr-azure-north-e.cloudapp.net",
    port: 3306,
    username: "b5d9d73b488cf1",
    password: "89053fff",
    database: "mo3dat076",
    entities: [
        UserEntity, UET, Customer, Treatement, EventCalendar
    ],
    synchronize: true
}