import {Response, Request} from "express"
import {UserRepository} from "../repositories/user"
import {UserEntity} from "../entities/UserEntity"

// TODO make dp injection instead
export let getusers = async (req: Request, res: Response) => {
    let userRepo: UserRepository = new UserRepository()

    userRepo.getAllUsers().then((result:any)=>{
        console.log("Result: "+ result)
        res.send(result)
    })
}

export let saveuser = async (req: Request, res: Response) =>{
    let userRepo: UserRepository = new UserRepository()
    let userEntity: UserEntity = new UserEntity()

    console.log("Received SaveEmployee ==> POST: now")
    console.log(req.body)

    userEntity.firstname = req.body.firstname
    userEntity.lastname = req.body.lastname
    userEntity.telefon = req.body.telefon

    userRepo.saveUser(userEntity).then((result: any)=>{
        console.log("result : "+ result)
        res.send(result);
    })
}