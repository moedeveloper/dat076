import {Response, Request} from "express"
import {UserRepository} from "../repositories/user"
import {UserEntity} from "../entities/UserEntity"
import { Container } from "typedi";

import {OrmRepository, OrmManager} from "typeorm-typedi-extensions";
import {Service} from "typedi";

@Service()
export class UserRoute{
    repo: UserRepository;
    constructor(repo:UserRepository){
        console.log("constructor")
        //repo = Container.get(UserRepo)
        this.repo = repo
        console.log("done..")
    }

    getusers = async (req: Request, res: Response) => {
    
        var promises = [];
        
        //let tr = UserRequests.repo.getUsers()
        //console.log("After tr " + tr)
        promises.push(this.repo.getUsers().then(function (data) {
            return data;
        }));
        Promise.all(promises).then(function (values) {
            var json = JSON.stringify({
                usersApi: values[0]
            });
            res.end(json);
        });
    }
}