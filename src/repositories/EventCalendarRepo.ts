import { OrmManager } from "typeorm-typedi-extensions";
import { EntityManager } from "typeorm";
import { EventCalendar } from "../entities/EventCalendar";
import { UET } from "../entities/UET";

export class EventCalendarRepo {
    @OrmManager()
    private entityManager: EntityManager;

    constructor(@OrmManager() entityManager: EntityManager) {
        this.entityManager = entityManager;
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