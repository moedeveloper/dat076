import {Response, Request} from "express"
import { Container } from "typedi";
import {OrmRepository, OrmManager} from "typeorm-typedi-extensions";
import {Service} from "typedi";
import { ProductRepo } from "../repositories/productRepo";

@Service()
export class ProductRoute{
    repo: ProductRepo;
    constructor(repo:ProductRepo){
        this.repo = repo
    }

    getProducts = async (req: Request, res: Response) => {
    
        var promises = [];
        promises.push(this.repo.getProducts().then(function (data) {
            return data;
        }));
        Promise.all(promises).then(function (values) {
            var result = JSON.stringify({
                productApi: values[0]
            });
            res.end(result);
        });
    }

    //getbyid
    getProduct = async(req: Request, res: Response) => {
        this.repo.getProductById(req.params["id"]).then((data) =>{
            var result = JSON.stringify({
                productApi: data
            });
            res.end(result);
        })
    }
    // craete
    createProduct = async(req: Request, res: Response) =>{
        this.repo.createProduct(req.body).then((data)=> {
            //res.status(201).send()
            var result = JSON.stringify({
                productApi: data
            });
            res.status(201).end(result);
        })
    }
    //update
    updateProduct = async(req: Request, res: Response) =>{
        this.repo.updateProduct(req.body).then((data)=> {
            //res.status(201).send()
            var result = JSON.stringify({
                productApi: data
            });
            res.status(201).end(result);
        })
    }
    //Remove
    removeProduct = async(req: Request, res: Response) =>{
        this.repo.removeProduct(req.params["id"]).then(()=> {
            res.status(201).send()
        })
    }
}