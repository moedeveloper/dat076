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
  closeResult: string;

  constructor(private modalService: NgbModal, private employeeService: EmployeeService, private treatmentService: TreatmentService) {}
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

  testUser = {
    firstname: "Carl", 
    lastname: "Albert",
    telefon: "0706145301"
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
   /*
    this.employeeService.getEmployees().then(data => {
    console.log(data);
   });

   this.employeeService.getEmployee('57e9c601-913f-4851-9794-722a95d1867d').then(data => {
    console.log(data);
   });
   */
  //Working 
  //this.employeeService.createEmployee(this.testUser);
   /*
   this.treatmentService.getTreatments().then(data => {
     console.log(data);
   });
   */
   /*
   this.employeeService.deleteEmployee("f333c0a1-f372-45f5-9f04-dad154a1d569");
   
  
   this.employeeService.searchEmployee("Carl").then(data => {
     console.log(data);
   })
   */
   
  //this.treatmentService.createTreatment(this.testTreatment);
  /*
  this.treatmentService.getTreatments().then(data => {
    console.log(data);
  })
  */
  /*
  this.treatmentService.getTreatment("8c990364-ed4e-45bc-b3b4-1cd9d3b8a5aa").then(data => {
    console.log(data);
  })
  

  
  })
  */
  //this.treatmentService.deleteTreatment("dbb600ee-6caa-4e03-853d-c6f135419a32");
    //this.treatmentService.updateTreatment(this.testTreatment).then(data => {
      //console.log(data);
    //})
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
