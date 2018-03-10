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
        this.userRepo = userRepo
        this.eventRepo = eventRepo
        this.treatRepo = treatRepo
        this.customerRepo = customerRepo
    }

    getUETs(): Promise<UET[]>{
        return this.entityManager.getRepository(UET).find()
    }

    getUETById(id: string): Promise<UET> {
        return this.entityManager.getRepository(UET).findOneById(id)
    }

    getUserAsync = async (id:string) =>{
        let user = await this.userRepo.getUserById(id)
        return user
    }

    
    async getCalendarEvents(): Promise<Event[]>{
           
        let listOfUet = await this.getUETs()
        let list: Event[] = new Array()

        for(let i = 0; i < listOfUet.length; i++){
            let evt = new Event()
            // console.log("id is cus" + listOfUet[i].customerId)
            // console.log("id is cus" + listOfUet[i].employeeId)
            // console.log("id is cus" + listOfUet[i].eventId)
            // console.log("id is cus" + listOfUet[i].treatmentId)
            try{
                let ct = await this.getUserAsync(listOfUet[i].customerId)
                let emp = await this.getUserAsync(listOfUet[i].employeeId)
                let ev = await this.eventRepo.geteventcalendarById(listOfUet[i].eventId)
                let treat = await this.treatRepo.gettreatement(listOfUet[i].treatmentId)

                evt.customer = new UserEntity()
                evt.customer.id = ct.id
                evt.customer.firstname = ct.firstname
                evt.customer.lastname = ct.lastname
                evt.customer.telefon = ct.telefon

                evt.employee = new UserEntity()
                evt.employee.id = ct.id
                evt.employee.firstname = emp.firstname
                evt.employee.lastname = emp.lastname
                evt.employee.telefon = emp.telefon

                evt.event = new EventCalendar()
                evt.event.id = ev.id
                evt.event.starttime = ev.starttime
                evt.event.endtime = ev.endtime

                evt.treatment = new Treatement()
                evt.treatment.id = treat.id
                evt.treatment.duration = treat.duration
                evt.treatment.name = treat.name
                evt.treatment.price = treat.price
                list.push(evt)

            } catch(ex){
                console.log("exception getCalendarEvents is " + ex)
            }
        }
        return list
    }


    getEventcalendar(id:string): Promise<EventCalendar>{
        return this.eventRepo.geteventcalendarById(id)
    }
    async createUET(req:any): Promise<UET>{

        //1. get user -> get its id -> employee
        //2. create event  -> get its id
        //3. get Treatemnet  -> get its id
        //4. get Customer -> get its id
        //5. return new created uet
        let uet = new UET()
        uet.employeeId = req.employeeId
        uet.customerId = req.customerId
        uet.treatmentId = req.treatmentId
        let event = new EventCalendar()
        event.starttime = req.starttime
        event.endtime = req.endtime

        let saveEvent = await this.eventRepo.createevent(event)
        uet.eventId = saveEvent.id

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

export class Event {
    employee: UserEntity
    customer: UserEntity
    treatment: Treatement
    event: EventCalendar
}