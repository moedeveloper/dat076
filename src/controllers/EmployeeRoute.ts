import {Response, Request} from "express"
import { Container } from "typedi";
import {OrmRepository, OrmManager} from "typeorm-typedi-extensions";
import {Service} from "typedi";
import { EmployeeRepo } from "../repositories/EmployeeReport";


@Service()
export class EmployeeRoute{
    repo: EmployeeRepo;
    constructor(repo:EmployeeRepo){
        this.repo = repo
    }

    getReports = async (req: Request, res: Response) => {
    
        var promises = [];
        promises.push(this.repo.getreports().then(function (data) {
            return data;
        }));
        Promise.all(promises).then(function (values) {
            var result = JSON.stringify({
                eReportApi: values[0]
            });
            res.end(result);
        });
    }

    //getbyid
    getReport = async(req: Request, res: Response) => {
        this.repo.getreport(req.params["id"]).then((data) =>{
            var result = JSON.stringify({
                eReportApi: data
            });
            res.end(result);
        })
    }
    // craete
    createReport = async(req: Request, res: Response) =>{
        this.repo.createreport(req.body).then((data)=> {
            //res.status(201).send()
            var result = JSON.stringify({
                eReportApi: data
            });
            res.status(201).end(result);
        })
    }
    //update
    updateReport = async(req: Request, res: Response) =>{
        this.repo.updatereport(req.body).then((data)=> {
            //res.status(201).send()
            var result = JSON.stringify({
                eReportApi: data
            });
            res.status(201).end(result);
        })
    }
    //Remove
    removeReport = async(req: Request, res: Response) =>{
        this.repo.removereport(req.params["id"]).then(()=> {
            res.status(201).send()
        })
    }
}