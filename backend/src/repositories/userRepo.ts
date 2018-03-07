import {UserEntity} from "../entities/UserEntity"
import { GroupRepo } from "./GroupRepo";
import {getManager, EntityManager} from "typeorm"
import { Repository } from "typeorm/repository/Repository";
import {Service} from "typedi";
import {OrmRepository, OrmManager} from "typeorm-typedi-extensions";
import { Group } from "../entities/group";

export class UserRepository {
    readonly groupRepo: GroupRepo
    @OrmManager()
    private entityManager: EntityManager;

    constructor(@OrmManager() entityManager: EntityManager, groupRepo: GroupRepo) {
        this.entityManager = entityManager;
        this.groupRepo = groupRepo;
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

    createUser(req:any){
        let group = new Group()
        group.role = req.role
        let user = new UserEntity()   
        user.firstname = req.firstname
        user.lastname = req.lastname
        user.telefon = req.telefon
        let saveUser = this.entityManager.getRepository(UserEntity).save(user)
        
        saveUser.then((data)=>{
            group.userId = data.id
            // save role in group

            this.groupRepo.saveUserToRole(group)
        }).catch(error => console.log("no records in data : ", error))

        return saveUser
    }

    getcuserbyquery(query:string):Promise<UserEntity[]>{
        return this.entityManager.getRepository(UserEntity)
        .createQueryBuilder("user")
        .where("user.firstname = :firstname OR user.lastname = :lastname OR user.telefon = :telefon", {firstname: query, lastname: query, telefon: query})
        .getMany()
    }
}