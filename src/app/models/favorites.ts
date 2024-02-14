import { Client } from "./client";
import { Product } from "./product";

export class Favorites {
    constructor(public _id:String,public list_name:String,public client:Client,public products:Product[],public pic:String){}
}
