import {UserEntity} from "../entities/UserEntity"
import {getManager} from "typeorm"

export class UserRepository{
    getAllUsers(){
        return getManager().getRepository(UserEntity).find();
    }

    saveUser(user: UserEntity){
        console.log("from repository")
        return getManager().getRepository(UserEntity).save(user);
    }
}