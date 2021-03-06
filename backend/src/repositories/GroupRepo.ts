import { OrmManager } from "typeorm-typedi-extensions";
import { RoleEntity } from "./../entities/roles";
import { EntityManager } from "typeorm";
import {Service} from "typedi";
import { Group } from "../entities/group";

export class GroupRepo{
    @OrmManager()
    private entityManager: EntityManager;

    constructor(@OrmManager() entityManager: EntityManager) {
        this.entityManager = entityManager;
    }

    getUserById(id:string):Promise<Group>{
        return this.entityManager.getRepository(Group).findOneById(id)
    }

    removeUserRole(id:string){
        return this.entityManager.getRepository(Group).removeById(id)
    }

    saveUserToRole(group:Group){
        return this.entityManager.getRepository(Group).save(group)
    }

    initiateRolesRepo(roles:RoleEntity):Promise<RoleEntity>{
        console.log("in repo " + roles)
        return this.entityManager.getRepository(RoleEntity).save(roles)
    }

    getUsersByRoleId(roleId:string):Promise<Group[]>{
        return this.entityManager.getRepository(Group)
        .createQueryBuilder("group")
        .where("group.roleId = :roleId", {roleId: roleId})
        .getMany()
    }

    getRoles():Promise<RoleEntity[]>{
        return this.entityManager.getRepository(RoleEntity).find()
    }

    async getUserRoleId(id:string){
        console.log("here in getUserRoleId") 
        return await this.entityManager.getRepository(Group)
        .createQueryBuilder("group")
        .where("group.userId = :userId", {userId:id})
        .getOne()
    }
}