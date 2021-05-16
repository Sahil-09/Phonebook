import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import{map} from 'rxjs/operators'
import {  FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { Contacts } from './contac.inteface';
import { ContactService } from './contact.service';

@Component({
  selector: 'app-contactlist',
  templateUrl: './contactlist.component.html',
  styleUrls: ['./contactlist.component.css']
})
export class ContactlistComponent implements OnInit {
  @ViewChild('form') nform: NgForm | undefined;

  contactform=new FormGroup({
    Name:new FormControl(null,Validators.required),
    phnumber:new FormControl(null,[Validators.required,Validators.minLength(10)])
  })

  Editmode=false;
  indexnumber:number=0
  dltmode=false;
  dltname:string='';
  constructor(private http:HttpClient,private Contactser:ContactService) { }
  
  PhoneList:Contacts[]= []

  ngOnInit() {
    this.contactform=new FormGroup({
      Name:new FormControl(null,Validators.required),
      phnumber:new FormControl(null,[Validators.required,Validators.minLength(10)])
    })

    this.Contactser.PhoneList.subscribe(dataa=>{
      this.PhoneList=dataa
    })
  }

  rform(form:any){
    console.log(form)
  }


  Add() {
    if(this.nform?.value){
      if(!this.Editmode){
        let data=this.nform.value;
        this.http.post('http://localhost:3000/api/add',data).subscribe(res=>{
        this.Contactser.GetContact()
        this.PhoneList.push(data)
        })
        console.log(data);
        this.nform?.resetForm()
      }
      else{
        let data=this.PhoneList[this.indexnumber]._id;
        this.http.patch("http://localhost:3000/api/update/"+data,this.nform.value).subscribe(dat=>{
          this.PhoneList[this.indexnumber]=this.nform?.value;
          this.nform?.resetForm()
          this.Editmode=false
        })
      }
      
    }
    
  }

  fill(event:{Name:string,phnumber:number,index:number}){
    this.Editmode=true;
    this.indexnumber=event.index
    this.nform?.setValue({Name:event.Name,phnumber:event.phnumber})
  }

  reset(){
    this.nform?.resetForm()
    this.Editmode=false
  }

  dltswitch(index:number){
    this.dltmode=true;
    this.indexnumber=index
    console.log(this.indexnumber)
    this.dltname=this.PhoneList[this.indexnumber].Name
  }

  Delete(){
    let data=this.PhoneList[this.indexnumber]._id
    this.http.delete("http://localhost:3000/api/delete/"+data).subscribe()
    this.PhoneList.splice(this.indexnumber,1)
  }

  closeswitch(){
    this.dltmode=false
  }
}
