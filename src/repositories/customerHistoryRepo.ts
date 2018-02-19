import { OrmManager } from "typeorm-typedi-extensions";
import { EntityManager } from "typeorm";
import { Customer } from "../entities/Customer";
import {Service} from "typedi";
import { CustomerHistory } from "../entities/CustomerHistory";

export class CustomerHistoryRepo{
    @OrmManager()
    private entityManager: EntityManager;

    constructor(@OrmManager() entityManager: EntityManager) {
        this.entityManager = entityManager;
    }

    gethistories(): Promise<CustomerHistory[]> {
        return this.entityManager.getRepository(CustomerHistory).find()
    }
    gethistory(id:string):Promise<CustomerHistory>{
        return this.entityManager.getRepository(CustomerHistory).findOneById(id)
    }

    //do the math to get history multiple join and gets
    // depends on what we want to have in the history
    // C R and U
    createhistory(ch:CustomerHistory):Promise<CustomerHistory>{
        return this.entityManager.getRepository(CustomerHistory).save(ch)
    }
    removehistory(id:string){
        return this.entityManager.getRepository(CustomerHistory).removeById(id)
    }
    updatehistory(request:any){
        return this.entityManager.getRepository(CustomerHistory).save(request)
    }
}