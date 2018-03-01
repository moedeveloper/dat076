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

    getUserById(userId: string): Promise<UserEntity> {
        return this.entityManager.getRepository(UserEntity).findOneById(userId)
    }

    removeUser(userId: string){
        return this.entityManager.getRepository(UserEntity).removeById(userId)
    }

    updateUser(request: any) {
        return this.entityManager.getRepository(UserEntity).save(request)
    }

    createUser(user:UserEntity){
        return this.entityManager.getRepository(UserEntity).save(user)
    }

    getcuserbyquery(query:string):Promise<UserEntity[]>{
        return this.entityManager.getRepository(UserEntity)
        .createQueryBuilder("user")
        .where("user.firstname = :firstname OR user.lastname = :lastname OR user.telefon = :telefon", {firstname: query, lastname: query, telefon: query})
        .getMany()
    }
}