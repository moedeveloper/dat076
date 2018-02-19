import "reflect-metadata";
import {ConnectionOptions} from "typeorm";
import { UserEntity } from "./../entities/UserEntity";
import { EventCalendar } from "../entities/EventCalendar";
import { Customer } from "../entities/Customer";
import { Treatement } from "../entities/Treatement";
import { UET } from "../entities/UET";
import { UserGroupAuth } from "../entities/UserGroupAuth";
import { SalaryReport } from "../entities/SalaryReport";
import { Product } from "../entities/Product";
import { Group } from "../entities/group";
import { EmployeeReport } from "../entities/EmployeeReport";
import { CustomerHistory } from "../entities/CustomerHistory";
import { Auth } from "../entities/Auth";

 export let dbOptions: ConnectionOptions = {
    type: "mysql",
    host: "eu-cdbr-azure-north-e.cloudapp.net",
    port: 3306,
    username: "b5d9d73b488cf1",
    password: "89053fff",
    database: "mo3dat076",
    entities: [
        UserEntity, UET, Customer, Treatement, EventCalendar, Auth, CustomerHistory, Group, Product, SalaryReport, UserGroupAuth //EmployeeReport,
    ],
    synchronize: true
}