import { Component, OnInit } from '@angular/core';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import {User} from '../utils/user';
import {Treatment} from '../utils/treatment';

import { EmployeeService } from '../utils/employee.service';
import { TreatmentService } from '../utils/treatment.service';
import { EventService} from '../utils/event.service';

import {Db} from '../utils/db';
import { timeout } from 'q';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  selectedEmployee : User;
  selectedTreatment : Treatment;
  selectedEvent : Event;

  employees : User[];
  treatments : Treatment[];
  events : Event[];

  closeResult: string;

  newUser = new User(null, "", "", "");
  newTreatment = new Treatment(null, "", "", 0);

  //dummy data
  //customers = ["Mo", "David", "Simon", "Carl", "Joachim"];

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

  constructor(private modalService: NgbModal, private employeeService: EmployeeService, private treatmentService: TreatmentService,
    private eventService: EventService) {}

  ngOnInit() {
    // TODO: either get all data at once or just employees and then the others if those tabs are opened

      this.employeeService.getEmployees().then(data => {
        this.employees = data;
        this.selectedEmployee = this.employees[0];

        console.log(this.employees)

      })

      this.treatmentService.getTreatments().then(data => {
        this.treatments = data;
        this.selectedTreatment = this.treatments[1];

        console.log(this.treatments);
      });
  }

  // ---- Employee Methods ----

  createEmployee(){
    //this.employees.push(this.newUser);
    this.newUser = new User(null, this.newUser.firstname, this.newUser.lastname, this.newUser.telefon);
    //add this newUser to db
    this.employeeService.createEmployee(this.newUser).then(a => {
      console.log(a);
      this.employeeService.getEmployees().then(data => {
        this.employees = data;
        console.log(this.employees);
      });
    });    
  };

  updateEmployee(list, emp){

    emp.firstname = (<HTMLInputElement>document.getElementById('employeeFirstName')).value;
    emp.lastname = (<HTMLInputElement>document.getElementById('employeeLastName')).value;
    emp.telefon = (<HTMLInputElement>document.getElementById('employeeTelefon')).value;

    console.log('emp --->')
    console.log(emp);

    this.employeeService.updateEmployee(emp).then(a => {
      let index = list.indexOf(emp);
      list[index] = emp;
      console.log(a);
    });
  };

  deleteEmployee(list, item){

    this.employeeService.deleteEmployee(item.id);

    let index = list.indexOf(item);
    if (index > -1){
      list.splice(index, 1);
    }
    item = list[index+1];
  };

  // ---- Treatment Methods ----
  createTreatment(){
    this.newTreatment = new Treatment(null, this.newTreatment.name, this.newTreatment.duration, this.newTreatment.price);

    this.treatmentService.createTreatment(this.newTreatment).then(a => {
      console.log(a);
      this.treatmentService.getTreatments().then(data => {
        console.log('-----> data')
        console.log(data);
        this.treatments = data;
        console.log(this.treatments);
      });
    });
  };

  updateTreatment(list, treatment){
    treatment.name = (<HTMLInputElement>document.getElementById('treatmentName')).value;
    treatment.price = (<HTMLInputElement>document.getElementById('treatmentPrice')).value;
    treatment.duration = (<HTMLInputElement>document.getElementById('treatmentDuration')).value;

    console.log('treat -->')
    console.log(treatment);

    this.treatmentService.updateTreatment(treatment).then(a => {
      let index = list.indexOf(treatment);
      list[index] = treatment;
      console.log(a);
    });
  }

  deleteTreatment(list, item){
    this.treatmentService.deleteTreatment(item.id);

    let index = list.indexOf(item);
    if (index > -1){
      list.splice(index, 1);
    }
    item = list[index+1];
    // TODO: AJAX call
  };

  // ---------------------------

  onSelect(clickedItem, type) {
    switch(type) {
       case "employee": {
        this.selectedEmployee = clickedItem;
         break;
       } 
       case "treatment": {
        this.selectedTreatment = clickedItem;
         break;
       } 
       case "event": {
        this.selectedEvent = clickedItem;
        break;
       }
       default:
         break;
   }
 }

   //modal open
   open(content) {
   console.log(content);
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
