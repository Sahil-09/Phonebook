import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Subject } from "rxjs";
import { map } from "rxjs/operators";
import { Contacts } from "./contac.inteface";

@Injectable({
    providedIn:'root'
})

export class ContactService{
    PhoneList=new Subject<any>()
    Dltswitch=false
    constructor(private http:HttpClient){}

    GetContact(){
        this.http.get<Contacts[]>("https://phonebook9.herokuapp.com/api/get").pipe(map(data=>{
            let res:Contacts[]=[] 
            for(let a of data){
              res.push(a)
             }
             return res
            })).subscribe((data: Contacts[])=>{
                console.log(data)
                this.PhoneList.next(data)
            })
    }

    

    
}