import {getManager, EntityManager} from "typeorm"
import { Repository } from "typeorm/repository/Repository";
import {Service} from "typedi";
import {OrmRepository, OrmManager} from "typeorm-typedi-extensions";
import { Product } from "../entities/Product";

export class ProductRepo {

    @OrmManager()
    private entityManager: EntityManager;

    constructor(@OrmManager() entityManager: EntityManager) {
        this.entityManager = entityManager;
    }

    getProducts(): Promise<Product[]>{
        return this.entityManager.getRepository(Product).find()
    }

    getProductById(productId: string): Promise<Product> {
        return this.entityManager.getRepository(Product).findOneById(productId)
    }

    removeProduct(productId: string){
        return this.entityManager.getRepository(Product).removeById(productId)
    }

    updateProduct(request: any) {
        return this.entityManager.getRepository(Product).save(request)
    }

    createProduct(product:Product){
        return this.entityManager.getRepository(Product).save(product)
    }
}