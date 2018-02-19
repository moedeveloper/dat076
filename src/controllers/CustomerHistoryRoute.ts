import {Response, Request} from "express"
import { Container } from "typedi";
import {OrmRepository, OrmManager} from "typeorm-typedi-extensions";
import {Service} from "typedi";
import { CustomerHistoryRepo } from "../repositories/customerHistoryRepo";

@Service()
export class CustomerHistoryRoute{
    repo: CustomerHistoryRepo;
    constructor(repo:CustomerHistoryRepo){
        this.repo = repo
    }

    getHistories = async (req: Request, res: Response) => {
    
        var promises = [];
        promises.push(this.repo.gethistories().then(function (data) {
            return data;
        }));
        Promise.all(promises).then(function (values) {
            var result = JSON.stringify({
                historyApi: values[0]
            });
            res.end(result);
        });
    }

    //getbyid
    getHistory = async(req: Request, res: Response) => {
        this.repo.gethistory(req.params["id"]).then((data) =>{
            var result = JSON.stringify({
                historyApi: data
            });
            res.end(result);
        })
    }
    // craete
    createHistory = async(req: Request, res: Response) =>{
        this.repo.createhistory(req.body).then((data)=> {
            //res.status(201).send()
            var result = JSON.stringify({
                historyApi: data
            });
            res.status(201).end(result);
        })
    }
    //update
    updateHistory = async(req: Request, res: Response) =>{
        this.repo.updatehistory(req.body).then((data)=> {
            //res.status(201).send()
            var result = JSON.stringify({
                historyApi: data
            });
            res.status(201).end(result);
        })
    }
    //Remove
    removeHistory = async(req: Request, res: Response) =>{
        this.repo.removehistory(req.params["id"]).then(()=> {
            res.status(201).send()
        })
    }
}