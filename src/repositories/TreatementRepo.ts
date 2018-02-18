import { OrmManager } from "typeorm-typedi-extensions";
import { EntityManager } from "typeorm";
import { Treatement } from "../entities/Treatement";
import {Service} from "typedi";

export class TreatementRepository{
    @OrmManager()
    private entityManager: EntityManager;

    constructor(@OrmManager() entityManager: EntityManager) {
        this.entityManager = entityManager;
    }

    gettreatements(): Promise<Treatement[]> {
        return this.entityManager.getRepository(Treatement).find()
    }

    createtreatement(treat:Treatement): Promise<Treatement>{
        return this.entityManager.getRepository(Treatement).save(treat)
    }
    gettreatement(id:string):Promise<Treatement>{
        return this.entityManager.getRepository(Treatement).findOneById(id)
    }

    updateTreatement(request:any){
        this.entityManager.getRepository(Treatement).save(request)
    }

    deleteTreatement(id: string){
        this.entityManager.getRepository(Treatement).removeById(id)
    }
}