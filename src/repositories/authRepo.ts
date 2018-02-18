import { OrmManager } from "typeorm-typedi-extensions";
import { EntityManager } from "typeorm";
import { Auth } from "../entities/Auth";
import {Service} from "typedi";

export class AuthRepo{
    @OrmManager()
    private entityManager: EntityManager;

    constructor(@OrmManager() entityManager: EntityManager) {
        this.entityManager = entityManager;
    }

    // TODO HASSH

    // getauth(): Promise<Auth[]> {
    //     return this.entityManager.getRepository(Auth).find()
    // }

    // createauth(customer:Auth):Promise<Auth>{
    //     return this.entityManager.getRepository(Auth).save(customer)
    // }
}