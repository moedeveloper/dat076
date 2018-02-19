import {Response, Request} from "express"
import { Container } from "typedi";
import {OrmRepository, OrmManager} from "typeorm-typedi-extensions";
import {Service} from "typedi";
import { GroupRepo } from "../repositories/GroupRepo";

@Service()
export class GroupRoute{
    repo: GroupRepo;
    constructor(repo:GroupRepo){
        this.repo = repo
    }

    //getbyid
    getUserRole = async(req: Request, res: Response) => {
        this.repo.getUserRoleById(req.params["id"]).then((data) =>{
            var result = JSON.stringify({
                roleApi: data
            });
            res.end(result);
        })
    }
    // craete
    createUserRole = async(req: Request, res: Response) =>{
        this.repo.saveUserToRole(req.body).then((data)=> {
            //res.status(201).send()
            var result = JSON.stringify({
                roleApi: data
            });
            res.status(201).end(result);
        })
    }

    //Remove
    removeUserRole = async(req: Request, res: Response) =>{
        this.repo.removeUserRole(req.params["id"]).then(()=> {
            res.status(201).send()
        })
    }
}