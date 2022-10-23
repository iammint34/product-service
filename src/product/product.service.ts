import { Injectable } from "@nestjs/common";

@Injectable({})
export class productService {
    getList(filters?: {}) {
        return `Welcome to IMS product Module`
    }


}