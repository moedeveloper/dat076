import {Response, Request} from "express"
import { Container } from "typedi";

import {OrmRepository, OrmManager} from "typeorm-typedi-extensions";
import {Service} from "typedi";
import { AuthRepo } from "../repositories/authRepo";

@Service()
export class AuthRoute{
    repo: AuthRepo;
    constructor(repo:AuthRepo){
        this.repo = repo
    }
}