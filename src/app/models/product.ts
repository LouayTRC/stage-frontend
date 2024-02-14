import { Category } from "./category";

export class Product {
    constructor(public _id:String,public name:String,public qte:number,public description:String,public pic:String,public category:Category,public price:number,public status:number){}
}
