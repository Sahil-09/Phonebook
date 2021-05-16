import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Contacts } from '../contac.inteface';
import { ContactService } from '../contact.service';

@Component({
  selector: 'app-listpreview',
  templateUrl: './listpreview.component.html',
  styleUrls: ['./listpreview.component.css']
})
export class ListpreviewComponent implements OnInit {

  constructor(private Contactser:ContactService) { }
  @Output() dataem= new EventEmitter()
  @Output() index= new EventEmitter()
  List:Contacts[]=[]

  ngOnInit(){
    console.log("this works?")
    this.Contactser.GetContact()
    this.Contactser.PhoneList.subscribe(data=>{
      this.List=data
    })
  }
  edit(Name:string,phnumber:number,index:number){
    let data={Name:Name,phnumber:phnumber,index}
    this.dataem.emit(data)
  }

  dlt(i:number){
    this.index.emit(i)
  }

}
