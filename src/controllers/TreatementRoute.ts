import { Service } from "typedi";
import { TreatementRepository } from "../repositories/TreatementRepository";
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
                usersApi: values[0]
            });
            res.end(result);
        });
    }
}