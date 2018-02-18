import {Response, Request} from "express"
import {UserRepository} from "../repositories/user"
import {UserEntity} from "../entities/UserEntity"
import { Container } from "typedi";

import {OrmRepository, OrmManager} from "typeorm-typedi-extensions";
import {Service} from "typedi";
import { Guid } from "./../Guid";
@Service()
export class UserRoute{
    repo: UserRepository;
    constructor(repo:UserRepository){
        this.repo = repo
    }

    getusers = async (req: Request, res: Response) => {
    
        var promises = [];
        promises.push(this.repo.getUsers().then(function (data) {
            return data;
        }));
        Promise.all(promises).then(function (values) {
            var result = JSON.stringify({
                usersApi: values[0]
            });
            res.end(result);
        });
    }

    //getbyid
    getuser = async(req: Request, res: Response) => {
        this.repo.getUserById(req.params["id"]).then((data) =>{
            var result = JSON.stringify({
                usersApi: data
            });
            res.end(result);
        })
    }
    // craete
    createuser = async(req: Request, res: Response) =>{
        this.repo.createUser(req.body).then((data)=> {
            //res.status(201).send()
            var result = JSON.stringify({
                usersApi: data
            });
            res.status(201).end(result);
        })
    }
    //update
    updateuser = async(req: Request, res: Response) =>{
        this.repo.updateUser(req.body).then((data)=> {
            //res.status(201).send()
            var result = JSON.stringify({
                usersApi: data
            });
            res.status(201).end(result);
        })
    }
    //Remove
    removeuser = async(req: Request, res: Response) =>{
        this.repo.removeUser(req.params["id"]).then(()=> {
            res.status(201).send()
        })
    }
}