import { Component, OnInit } from '@angular/core';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import {User} from '../utils/user';
import {Treatment} from '../utils/treatment';

import {Db} from '../utils/db';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  closeResult: string;

  constructor(private modalService: NgbModal) {}
  newUser = new User(null, "", "", "");
  //dummy data
  employees = [
    new User(1, "Mo", "Mortada", "0700123123"),
    new User(2, "David", "Iliefski", "0700123423"),
    new User(3, "Simon", "Mare", "0700545543"),
    new User(4, "Carl", "Albertsson", "0700123759"),
    new User(5, "Joachim", "Von Anka", "0700543987")
  ];
  customers = ["Mo", "David", "Simon", "Carl", "Joachim"];

  treatments = [
    new Treatment(1, "Haircut", "--"),
    new Treatment(2, "Prep", "--"),
    new Treatment(3, "Wash", "--"),
    new Treatment(4, "Trim", "--"),
    new Treatment(5, "Extensions", "--")
  ];
  selectedEmployee = this.employees[0];
  selectedCustomer;
  selectedTreatment;

  ngOnInit() {
    // TODO: either get all data at once or just employees and then the others if those tabs are opened
    /*
    this.employees = [];
    this.customers = [];
    this.treatments = [];
    */
  }

   onSelect(clickedItem) {
     switch(clickedItem) {
       case clickedItem: typeof User;
        this.selectedEmployee = clickedItem;
        break;
       case clickedItem=="Customer":
        this.selectedCustomer = clickedItem;
        break;
        case clickedItem=="Treatment":
         this.selectedTreatment = clickedItem;
         break;
       default:
        break;
    }
  }

  delete(list, item){
    let index = list.indexOf(item);
    if (index > -1){
      list.splice(index, 1);
    }
    item = list[index+1];
    // TODO: AJAX call
  }
  update(list, oldItem, newItem){
    let index = list.indexOf(oldItem);
    list[index] = newItem;
  }

  onSubmit(){
    console.log("onSubmit");
  }

  createEmployee(){
    this.employees.push(this.newUser);
    this.newUser = new User(null, "", "", "");
    //add this newUser to db
  }

   //modal open
   open(content) {
    this.modalService.open(content).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return  `with: ${reason}`;
    }
  }
}
