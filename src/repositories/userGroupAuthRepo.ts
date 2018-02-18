import {getManager, EntityManager} from "typeorm"
import { Repository } from "typeorm/repository/Repository";
import {Service} from "typedi";
import {OrmRepository, OrmManager} from "typeorm-typedi-extensions";
import { UserGroupAuth } from "../entities/UserGroupAuth";

export class UserGroupAuthRepo {

    @OrmManager()
    private entityManager: EntityManager;

    constructor(@OrmManager() entityManager: EntityManager) {
        this.entityManager = entityManager;
    }

    getUserGroupAuthById(ugaId: string): Promise<UserGroupAuth> {
        return this.entityManager.getRepository(UserGroupAuth).findOneById(ugaId)
    }

    removeUserGroupAuth(id: string){
        return this.entityManager.getRepository(UserGroupAuth).removeById(id)
    }

    updateUserGroupAuth(request: any) {
        //TODO see how to handle from front end
        return this.entityManager.getRepository(UserGroupAuth).save(request)
    }

    createUserGroupAuth(uga:UserGroupAuth){
        return this.entityManager.getRepository(UserGroupAuth).save(uga)
    }
}