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
                customerApi: values[0]
            });
            res.end(result);
        });
    }

    getcustomer = async (req:Request, res:Response) => {
        this.repo.getcustomer(req.params["id"]).then((data) =>{
            var result = JSON.stringify({
                customerApi: data
            });
            res.end(result);
        })
    }

        // craete
    createcustomer = async(req: Request, res: Response) =>{
        this.repo.createcustomer(req.body).then((data)=> {
            //res.status(201).send()
            var result = JSON.stringify({
                customerApi: data
            });
            res.status(201).end(result);
        })
    }
    //update
    updatecustomer = async(req: Request, res: Response) =>{
        this.repo.updatecustomer(req.body).then((data)=> {
            //res.status(201).send()
            var result = JSON.stringify({
                customerApi: data
            });
            res.status(201).end(result);
        })
    }
    //Remove
    deletecustomer = async(req: Request, res: Response) =>{
        this.repo.removecustomer(req.params["id"]).then(()=> {
            res.status(201).send()
        })
    }
}