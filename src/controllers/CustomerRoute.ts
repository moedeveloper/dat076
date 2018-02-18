import { Service } from "typedi";
import { CustomerRepo } from "../repositories/CustomerRepo";
import {Response, Request} from "express"

@Service()
export class CustomerRoute {
    repo: CustomerRepo;
    constructor(repo:CustomerRepo){
        this.repo = repo
    }

    getCustomers = async (req: Request, res: Response) => {
    
        var promises = [];
        promises.push(this.repo.getcustomers().then(function (data) {
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