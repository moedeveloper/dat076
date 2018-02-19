import { Service } from "typedi";
import { TreatementRepository } from "../repositories/TreatementRepo";
import {Response, Request} from "express"
import {OrmRepository, OrmManager} from "typeorm-typedi-extensions";

@Service()
export class TreatementRoute{
    repo: TreatementRepository;
    constructor(repo:TreatementRepository){
        this.repo = repo
    }

    getTreatements = async (req: Request, res: Response) => {
    
        var promises = [];
        promises.push(this.repo.gettreatements().then(function (data) {
            return data;
        }));
        Promise.all(promises).then(function (values) {
            var result = JSON.stringify({
                treatApi: values[0]
            });
            res.end(result);
        });
    }

    gettreatement = async (req:Request, res:Response) => {
        this.repo.gettreatement(req.params["id"]).then((data) =>{
            var result = JSON.stringify({
                treatApi: data
            });
            res.end(result);
        })
    }

        // craete
    createtreatement = async(req: Request, res: Response) =>{
        this.repo.createtreatement(req.body).then((data)=> {
            //res.status(201).send()
            var result = JSON.stringify({
                treatApi: data
            });
            res.status(201).end(result);
        })
    }
    //update
    updatetreatement = async(req: Request, res: Response) =>{
        this.repo.updateTreatement(req.body).then((data)=> {
            //res.status(201).send()
            var result = JSON.stringify({
                treatApi: data
            });
            res.status(201).end(result);
        })
    }
    //Remove
    deletetreatement = async(req: Request, res: Response) =>{
        this.repo.deleteTreatement(req.params["id"]).then(()=> {
            res.status(201).send()
        })
    }
}