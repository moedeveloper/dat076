import {Response, Request} from "express"
import { Container } from "typedi";
import {OrmRepository, OrmManager} from "typeorm-typedi-extensions";
import {Service} from "typedi";
import { GroupRepo } from "../repositories/GroupRepo";
import { RoleEntity, roles } from "../entities/roles";

@Service()
export class GroupRoute{
    repo: GroupRepo;
    constructor(repo:GroupRepo){
        this.repo = repo
    }

    //getbyid
    getUserRole = async(req: Request, res: Response) => {
        this.repo.getUserById(req.params["id"]).then((data) =>{
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

    initiateRoles = async() =>{
        let list: Array<roles> = [roles.admin, roles.customer, roles.employee]
        console.log("lenght is ", list.length)
        for(let i=0; i<list.length; i++){
            let role = list[i]
            let r = new RoleEntity()
            r.role = role

            this.repo.initiateRolesRepo(r).then((data)=>{
                console.log("data is ",  data)
            }).catch(error => console.log("error in initiating roles: ", error))
        } 
    }
}