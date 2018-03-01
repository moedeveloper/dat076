import { Component, OnInit } from '@angular/core';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import {User} from '../utils/user';
import {Treatment} from '../utils/treatment';
import { EmployeeService } from '../utils/employee.service';
import { TreatmentService } from '../utils/treatment.service';

import {Db} from '../utils/db';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  isDataAvailable:boolean = false;
  selectedEmployee : any;

  closeResult: string;
  newUser = new User(null, "", "", "");
  //dummy data
  employees : any;
    
  customers = ["Mo", "David", "Simon", "Carl", "Joachim"];

  testUser = {
    firstname: "Krille", 
    lastname: "Åberg",
    telefon: "37373738282"
  }
  testTreatment = {
    name: "Long Hair",
    duration: "1h",
    price: 200,
    id: "8c990364-ed4e-45bc-b3b4-1cd9d3b8a5aa"
  }

  treatments = [
    new Treatment(1, "Haircut", "--"),
    new Treatment(2, "Prep", "--"),
    new Treatment(3, "Wash", "--"),
    new Treatment(4, "Trim", "--"),
    new Treatment(5, "Extensions", "--")
  ];

  selectedCustomer;
  selectedTreatment;

  constructor(private modalService: NgbModal, private employeeService: EmployeeService, private treatmentService: TreatmentService) {}

  ngOnInit() {
    // TODO: either get all data at once or just employees and then the others if those tabs are opened

    console.log("ngOnInit!!! ->")
    
    this.employeeService.getEmployees().then(data => {
      console.log("inside get Emp ->")
      console.log(data);
      this.employees = data;
      this.selectedEmployee = this.employees[0];
      this.isDataAvailable = true;
      
      console.log(this.employees)
      
    })
    
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
    //this.employees.push(this.newUser);
    //var name = ;
    //var lname = ;
    //var phone = ;
    //this.newUser = new User(null, name,lname, phone);
    //add this newUser to db
    //this.employeeService.createEmployee(this.newUser);
    
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
