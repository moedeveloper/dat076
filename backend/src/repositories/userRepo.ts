import {UserEntity} from "../entities/UserEntity"
import { Group } from "./../entities/Group";
import { GroupRepo } from "./GroupRepo";
import {getManager, EntityManager} from "typeorm"
import { Repository } from "typeorm/repository/Repository";
import {Service} from "typedi";
import {OrmRepository, OrmManager} from "typeorm-typedi-extensions";
import { error } from "util";

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
        // let group = new Group()
        // group.role = req.role
        // let user = new UserEntity()   
        // user.firstname = req.firstname
        // user.lastname = req.lastname
        // user.telefon = req.telefon
        // let saveUser = this.entityManager.getRepository(UserEntity).save(user)
        
        // saveUser.then((data)=>{
        //     group.userId = data.id
        //     // save role in group

        //     this.groupRepo.saveUserToRole(group)
        // }).catch(error => console.log("no records in data : ", error))

        return this.entityManager.getRepository(UserEntity).save(req)
    }

    getcuserbyquery(query:string):Promise<UserEntity[]>{
        return this.entityManager.getRepository(UserEntity)
        .createQueryBuilder("user")
        .where("user.firstname = :firstname OR user.lastname = :lastname OR user.telefon = :telefon", {firstname: query, lastname: query, telefon: query})
        .getMany()
    }

    group_getUsersByRoleId(role:string):Promise<Group[]>{
        return this.groupRepo.getUsersByRoleId(role)
    }

    getusersbyroleid(role:string): Promise<UserEntity[]>{
        console.log("rols is " + role)
        return this.entityManager.getRepository(UserEntity)
        .createQueryBuilder("user")
        .where("user.roleId = :role", {role: role})
        .getMany()

        // //var userPromis: any[]=[]
        // var roleArray: Promise<Group[]> [] = []
        // var userPromis: Promise<UserEntity>[] = []
        // roleArray.push(this.group_getUsersByRoleId(role).then((rs)=>{
        //     return rs
        // }))

        // // Promise.all(roleArray).then((u)=>{
        // //     console.log("length is " + u[0].length)
        // //     for(let v = 0; v <  u.length; v++){
        // //         let userID = u[v][v].userId
        // //         console.log(userID + "id u")
        // //         userPromis.push(this.getUserById(userID).then((x)=>{
        // //             return x
        // //         }))
        // //     }
            
        // // })
        // console.log("array is  ", roleArray[0])
        
        // return userPromis   
    }
}
