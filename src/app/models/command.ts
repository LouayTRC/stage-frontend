import { Admin } from "./admin";
import { Client } from "./client";
import { Product } from "./product";

export class Command {
    constructor(public _id:String,public Client:Client,public Admin:Admin,public Products:Product[],public date_cmmd:Date,public status:Number,public total:number){}
}
