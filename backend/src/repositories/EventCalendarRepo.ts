import { OrmManager } from "typeorm-typedi-extensions";
import { TreatementRepository } from "./TreatementRepo";
import { UserRepository } from "./userRepo";
import { EntityManager } from "typeorm";
import { EventCalendar } from "../entities/EventCalendar";
import { UET } from "../entities/UET";
import { UETRepository } from "./UETRepo";
import { UserEntity } from "../entities/UserEntity";
import { Treatement } from "../entities/Treatement";
import { resolve } from "path";

export class EventCalendarRepo {
    @OrmManager()
    private entityManager: EntityManager;
    readonly uetRepo : UETRepository
    readonly userRepo: UserRepository
    readonly treatRepo: TreatementRepository

    constructor(@OrmManager() entityManager: EntityManager, uetRepo: UETRepository,
     userRepo: UserRepository, treatRepo:TreatementRepository) {
        this.entityManager = entityManager
        this.uetRepo = uetRepo
        this.treatRepo = treatRepo
        this.userRepo = userRepo
    }

    geteventcalendars(): Promise<EventCalendar[]> {
        return this.entityManager.getRepository(EventCalendar).find()
    }

    createevent(evt: EventCalendar) : Promise<EventCalendar>{
        return this.entityManager.getRepository(EventCalendar).save(evt)
    }

    removeevent(eventId: string){
        return this.entityManager.getRepository(EventCalendar).removeById(eventId)
    }

    geteventcalendarById(eventId: string): Promise<EventCalendar>{
        return this.entityManager.getRepository(EventCalendar).findOneById(eventId)
    }

    updateEventCalendar(request: any) {
        return this.entityManager.getRepository(EventCalendar).save(request)
    }
}

