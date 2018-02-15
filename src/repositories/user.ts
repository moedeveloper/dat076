import {UserEntity} from "../entities/UserEntity"
import {getManager, EntityManager} from "typeorm"
import { Repository } from "typeorm/repository/Repository";
import {Service} from "typedi";
import {OrmRepository, OrmManager} from "typeorm-typedi-extensions";

export class UserRepository {

    @OrmManager()
    private entityManager: EntityManager;

    constructor(@OrmManager() entityManager: EntityManager) {
        this.entityManager = entityManager;
    }

    getUsers(): Promise<UserEntity[]>{
        return this.entityManager.getRepository(UserEntity).find()
    }
}