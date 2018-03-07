import { EventCalendarRepo } from "../repositories/EventCalendarRepo";
import { Service } from "typedi";
import {Response, Request} from "express"
import {OrmRepository, OrmManager} from "typeorm-typedi-extensions";

@Service()
export class EventCalendarRoute{
    repo: EventCalendarRepo;
    constructor(repo:EventCalendarRepo){
        this.repo = repo
    }

    getEventCalendars = async (req: Request, res: Response) => {
        var promises = [];
        promises.push(this.repo.geteventcalendars().then(function (data) {
            return data;
        }));
        Promise.all(promises).then(function (values) {
            var result = JSON.stringify({
                evtApi: values[0]
            });
            res.end(result);
        });
    }

    geteventcalendar = async (req:Request, res:Response) => {
        this.repo.geteventcalendarById(req.params["id"]).then((data) =>{
            var result = JSON.stringify({
                evtApi: data
            });
            res.end(result);
        })
    }

        // craete
    createeventcalendar = async(req: Request, res: Response) =>{
        this.repo.createevent(req.body).then((data)=> {
            //res.status(201).send()
            var result = JSON.stringify({
                evtApi: data
            });
            res.status(201).end(result);
        })
    }
    //update
    updateeventcalendar = async(req: Request, res: Response) =>{
        this.repo.updateEventCalendar(req.body).then((data)=> {
            //res.status(201).send()
            var result = JSON.stringify({
                evtApi: data
            });
            res.status(201).end(result);
        })
    }
    //Remove
    deleteeventcalendar = async(req: Request, res: Response) =>{
        this.repo.removeevent(req.params["id"]).then(()=> {
            res.status(201).send()
        })
    }
}