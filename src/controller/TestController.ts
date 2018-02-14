import {getRepository} from "typeorm";
import {NextFunction, Request, Response} from "express";
import {Test} from "../entity/Test";

export class TestController{
    private testRepo = getRepository(Test);
    async getAll(req:Request, res:Response, next:NextFunction){
        return this.testRepo.find();
    }
}