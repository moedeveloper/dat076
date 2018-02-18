import { OrmManager } from "typeorm-typedi-extensions";
import { CustomerRepo } from "./CustomerRepo";
import { EventCalendar } from "./../entities/EventCalendar";
import { EntityManager } from "typeorm";
import { UET } from "../entities/UET";
import { UserEntity } from "../entities/UserEntity";
import { UserRepository } from "../repositories/userRepo";
import { EventCalendarRepo } from "../repositories/EventCalendarRepo";
import { TreatementRepository } from "../repositories/TreatementRepo";
import { Treatement } from "../entities/Treatement";
import { Customer } from "../entities/Customer";
import { error } from "util";
import {Service} from "typedi";

export class UETRepository {
    readonly customerRepo: CustomerRepo;
    readonly treatRepo: TreatementRepository;
    readonly eventRepo: EventCalendarRepo;
    readonly userRepo: UserRepository;

    @OrmManager()
    private entityManager: EntityManager;

    constructor(@OrmManager() entityManager: EntityManager,
        userRepo:UserRepository, eventRepo: EventCalendarRepo,
        treatRepo: TreatementRepository, customerRepo: CustomerRepo) {
        this.entityManager = entityManager
        this.userRepo=userRepo
        this.eventRepo = eventRepo
        this.treatRepo = treatRepo
        this.customerRepo=customerRepo
    }

    getUETs(): Promise<UET[]>{
        return this.entityManager.getRepository(UET).find()
    }

    getUETById(id: string): Promise<UET> {
        return this.entityManager.getRepository(UET).findOneById(id)
    }

    user(userId:string):Promise<UserEntity>{
        return this.userRepo.getUserById(userId)
    }
    eventcalendar(evt:EventCalendar):Promise<EventCalendar>{
        return this.eventRepo.createevent(evt)
    }
    gettreatement(id:string):Promise<Treatement>{
        return this.treatRepo.gettreatement(id)
    }
    getcustomer(id:string):Promise<Customer>{
        return this.customerRepo.getcustomer(id)
    }

    getEventcalendar(id:string): Promise<EventCalendar>{
        return this.eventRepo.geteventcalendarById(id)
    }
    createUET(userId:string, event:EventCalendar, treatId:string, custId:string): Promise<UET>{
        let uet = new UET()

        //1. get user -> get its id
        //2. create event  -> get its id
        //3. get Treatemnet  -> get its id
        //4. get Customer -> get its id
        this.user(userId).then((data)=>{
            uet.userId = data.id
        }).catch(error => console.log("no record with provided id: ", error))
        this.gettreatement(treatId).then((data)=>{
            uet.treatementId = data.id
        }).catch(error => console.log("no record with provided id: ", error))
        this.eventcalendar(event).then((data)=>{
            uet.eventId = data.id
        }).catch(error => console.log("no record with provided id: ", error))

        this.getcustomer(custId).then((data)=>{
            uet.customerId = data.id
        }).catch(error => console.log("no record with provided id: ", error))

        //5. return new created uet
        return this.entityManager.getRepository(UET).save(uet)
    }

    removeUet(uetId: string){
        this.getUETById(uetId).then((data)=>{
            this.eventRepo.removeevent(data.eventId)
        }).catch(error => console.log("error while removing event:" + error))
        return this.entityManager.getRepository(UET).removeById(uetId)
    }

    // TODO check how to handle from front end
    // can update the event from the calendar
    // can update treatement
    updateUet(request: any) {
        this.getUETById(request).then((data)=>{
            // this.eventRepo.updateEventCalendar(data.eventId)
            // this.treatRepo.updateTreatement(data.treatementId)
            // this.userRepo.updateUser
        })
        // no need for return return
    }
}