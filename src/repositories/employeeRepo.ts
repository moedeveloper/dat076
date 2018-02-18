import { OrmManager } from "typeorm-typedi-extensions";
import { EntityManager } from "typeorm";
import {Service} from "typedi";
import { EmployeeReport } from "../entities/EmployeeReport";

export class EmployeeRepo{
    @OrmManager()
    private entityManager: EntityManager;

    constructor(@OrmManager() entityManager: EntityManager) {
        this.entityManager = entityManager;
    }

    getreports(): Promise<EmployeeReport[]> {
        return this.entityManager.getRepository(EmployeeReport).find()
    }

    createreport(report:EmployeeReport):Promise<EmployeeReport>{
        return this.entityManager.getRepository(EmployeeReport).save(report)
    }
    getreport(id:string):Promise<EmployeeReport>{
        return this.entityManager.getRepository(EmployeeReport).findOneById(id)
    }

    removereport(id:string){
        return this.entityManager.getRepository(EmployeeReport).removeById(id)
    }

    updatereport(request:any){
        return this.entityManager.getRepository(EmployeeReport).save(request)
    }
}