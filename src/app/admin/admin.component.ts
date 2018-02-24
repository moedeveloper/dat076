import { Component, OnInit } from '@angular/core';
import {User} from './user';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  constructor() { }

  //dummy data
  employees = [
    new User(1, "Mo", "Mortada", "0700123123"),
    new User(2, "David", "Iliefski", "0700123423"),
    new User(3, "Simon", "Mare", "0700545543"),
    new User(4, "Carl", "Albertsson", "0700123759"),
    new User(5, "Joachim", "Von Anka", "0700543987")
  ];
  customers = ["Mo", "David", "Simon", "Carl", "Joachim"];
  treatments = ["Mo", "David", "Simon", "Carl", "Joachim"];
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
  update(list, item){

  }
  add(list, item){
    //list.push(item);
  }




}
