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
                usersApi: values[0]
            });
            res.end(result);
        });
    }
}