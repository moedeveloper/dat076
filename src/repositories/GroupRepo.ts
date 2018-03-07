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

    getUserRoleById(id:string):Promise<Group>{
        return this.entityManager.getRepository(Group).findOneById(id)
    }

    removeUserRole(id:string){
        return this.entityManager.getRepository(Group).removeById(id)
    }

    saveUserToRole(group:Group){
        return this.entityManager.getRepository(Group).save(group)
    }

    initiateRolesRepo(roles:RoleEntity):Promise<RoleEntity>{
        console.log("in repo ", roles)
        return this.entityManager.getRepository(RoleEntity).save(roles)
    }
}