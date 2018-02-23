import { OrmManager } from "typeorm-typedi-extensions";
import { EntityManager } from "typeorm";
import { Customer } from "../entities/Customer";
import {Service} from "typedi";

export class CustomerRepo{
    @OrmManager()
    private entityManager: EntityManager;

    constructor(@OrmManager() entityManager: EntityManager) {
        this.entityManager = entityManager;
    }

    getcustomers(): Promise<Customer[]> {
        return this.entityManager.getRepository(Customer).find()
    }

    createcustomer(customer:Customer):Promise<Customer>{
        return this.entityManager.getRepository(Customer).save(customer)
    }
    getcustomer(id:string):Promise<Customer>{
        return this.entityManager.getRepository(Customer).findOneById(id)
    }
    removecustomer(id:string){
        return this.entityManager.getRepository(Customer).removeById(id)
    }

    updatecustomer(request:any){
        return this.entityManager.getRepository(Customer).save(request)
    }
}