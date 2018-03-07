import { UserGroupAuthRepo } from "../repositories/userGroupAuthRepo";
import { Service } from "typedi";
import {Response, Request} from "express"
import {OrmRepository, OrmManager} from "typeorm-typedi-extensions";

@Service()
export class UserGroupAuthRoute{
    repo: UserGroupAuthRepo;
    constructor(repo:UserGroupAuthRepo){
        this.repo = repo
    }

    getUserGroupAuthById = async (req:Request, res:Response) => {
        this.repo.getUserGroupAuthById(req.params["id"]).then((data) =>{
            var result = JSON.stringify({
                authApi: data
            });
            res.end(result);
        })
    }

        // craete
    createUserGroupAuth = async(req: Request, res: Response) =>{
        this.repo.createUserGroupAuth(req.body).then((data)=> {
            //res.status(201).send()
            var result = JSON.stringify({
                authApi: data
            });
            res.status(201).end(result);
        })
    }
    //update
    updateUserGroupAuth = async(req: Request, res: Response) =>{
        this.repo.updateUserGroupAuth(req.body).then((data)=> {
            //res.status(201).send()
            var result = JSON.stringify({
                authApi: data
            });
            res.status(201).end(result);
        })
    }
    //Remove
    deleteUserGroupAuthById = async(req: Request, res: Response) =>{
        this.repo.removeUserGroupAuth(req.params["id"]).then(()=> {
            res.status(201).send()
        })
    }
}