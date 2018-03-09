import {Response, Request} from "express"
import { Customer } from "./../entities/Customer";
import { EventCalendar } from "./../entities/EventCalendar";
import {OrmRepository, OrmManager} from "typeorm-typedi-extensions";
import {Service} from "typedi";
import { UETRepository } from "../repositories/UETRepo";

@Service()
export class UETRoute{
    repo: UETRepository;
    constructor(repo:UETRepository){
        this.repo = repo
    }

    getuets = async (req: Request, res: Response) => {   
        var promises = [];
        promises.push(this.repo.getUETs().then(function (data) {
            return data;
        }));
        Promise.all(promises).then(function (values) {
            var result = JSON.stringify({
                uetsApi: values[0]
            });
            res.end(result);
        });
    }

    //getbyid
    getuet = async(req: Request, res: Response) => {
        this.repo.getUETById(req.params["id"]).then((data) =>{
            var result = JSON.stringify({
                uetApi: data
            });
            res.end(result);
        })
    }

    createuet = async(req: Request, res: Response) => {
        console.log(req.body)
        //let userId = req.body.userId
        let event = req.body.event
        let customerId = req.body.customerId
        let treatId = req.body.treatId
        this.repo.createUET(event, customerId, treatId).then((data) =>{
            var result = JSON.stringify({
                uetApi: data
            });
            res.end(result);
        }).catch(error => {
            console.log("no record with provided id: ", error)
            res.status(204).send()
        })
    }

    // TODO check how to handle from front end
    //update
    // this route wil update the event,treatement
    // and user, no need to return new get should
    // make from front end to get new user
    updateuet = async(req: Request, res: Response) =>{
        this.repo.updateUet(req.body)
        res.status(201).end();
    }
    //Remove
    deleteuet = async(req: Request, res: Response) =>{
        this.repo.removeUet(req.params["id"]).then(()=> {
            res.status(201).send()
        })
    }
}