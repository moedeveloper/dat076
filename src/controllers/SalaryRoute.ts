import {Response, Request} from "express"
import { Container } from "typedi";
import {OrmRepository, OrmManager} from "typeorm-typedi-extensions";
import {Service} from "typedi";
import { SalaryRepo } from "../repositories/salaryRepo";

@Service()
export class SalaryRoute{
    repo: SalaryRepo;
    constructor(repo:SalaryRepo){
        this.repo = repo
    }

    getSalaries = async (req: Request, res: Response) => {
    
        var promises = [];
        promises.push(this.repo.getReports().then(function (data) {
            return data;
        }));
        Promise.all(promises).then(function (values) {
            var result = JSON.stringify({
                salaryApi: values[0]
            });
            res.end(result);
        });
    }

    //getbyid
    getSalary = async(req: Request, res: Response) => {
        this.repo.getReportById(req.params["id"]).then((data) =>{
            var result = JSON.stringify({
                salaryApi: data
            });
            res.end(result);
        })
    }
    //TODO craete
    createSalary = async(req: Request, res: Response) =>{
        // this.repo.createReport(req.body).then((data)=> {
        //     //res.status(201).send()
        //     var result = JSON.stringify({
        //         salaryApi: data
        //     });
        //     res.status(201).end(result);
        // })
    }
    //update
    updateSalary = async(req: Request, res: Response) =>{
        this.repo.updateReport(req.body).then((data)=> {
            //res.status(201).send()
            var result = JSON.stringify({
                salaryApi: data
            });
            res.status(201).end(result);
        })
    }
}