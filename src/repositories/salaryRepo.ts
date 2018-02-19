import { SalaryReport } from "./../entities/SalaryReport";
import {getManager, EntityManager} from "typeorm"
import { Repository } from "typeorm/repository/Repository";
import {Service} from "typedi";
import {OrmRepository, OrmManager} from "typeorm-typedi-extensions";

export class SalaryRepo {

    @OrmManager()
    private entityManager: EntityManager;

    constructor(@OrmManager() entityManager: EntityManager) {
        this.entityManager = entityManager;
    }

    // maybe return just reports for one week 
    // TODoScuss
    getReports(): Promise<SalaryReport[]>{
        return this.entityManager.getRepository(SalaryReport).find()
    }

    getReportById(reportId: string): Promise<SalaryReport> {
        return this.entityManager.getRepository(SalaryReport).findOneById(reportId)
    }

    updateReport(request: any) {
        return this.entityManager.getRepository(SalaryReport).save(request)
    }

    //TODO See how to handl report and what we want to include
    createReport(report:SalaryReport){
         //return this.entityManager.getRepository(SalaryReport).save(user)
    }
}