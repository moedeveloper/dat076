import { Component, OnInit, ViewChild } from '@angular/core';
import { FormsModule }   from '@angular/forms';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import {NgbDateStruct} from '@ng-bootstrap/ng-bootstrap';
import {User} from '../utils/user';
import {Treatment} from '../utils/treatment';
import * as $ from 'jquery';
import 'fullcalendar';
import 'fullcalendar/dist/locale/sv.js';
import 'fullcalendar-scheduler';

import { EmployeeService } from '../utils/employee.service';
import { TreatmentService } from '../utils/treatment.service';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css'],
})
export class CalendarComponent implements OnInit {
  @ViewChild('content') private content;
  content2 = this.content;
  closeResult: string;
  startTime = {hour: 13, minute: 30};
  endTime = {hour: 13, minute: 30};
  eventDate = {year: 2018, month: 3, day: 4}
  eventTitle: string;
  eventEmployee: User;
  eventTreatment: Treatment;
  calendar;


  constructor(private modalService: NgbModal, private employeeService : EmployeeService, private treatmentService : TreatmentService) {  }

  //dummy data until backend connection

  employees : any;
  treatments : any;



  ngOnInit() {

    this.employeeService.getEmployees().then(data => {
      console.log(data);
      this.employees = data;

      this.treatmentService.getTreatments().then(resData => {
        console.log(resData);
        this.treatments = resData;

        var self = this;
        $(function() {
        let containerEl: JQuery = $('#calendar');
        self.setCalender(containerEl);
          //console.log(containerEl);

        containerEl.fullCalendar({
          schedulerLicenseKey: 'CC-Attribution-NonCommercial-NoDerivatives',
          // options here
          locale: 'sv',
          timezone: 'local',
          firstDay: 1,
          editable: true, // enable draggable events
          aspectRatio: 1.8,
          minTime: '08:00',
          maxTime: '20:00',
          header: {
            left: 'today prev,next',
            center: 'title',
            right: 'agendaDay,agendaWeek,month'
          },
          allDaySlot: false,
          defaultView: 'agendaDay',
          resourceLabelText: 'Employees',
          resources: [
              { id: self.employees[0].id, title: self.employees[0].firstname },
              { id: self.employees[1].id, title: self.employees[1].firstname },
              { id: self.employees[2].id, title: self.employees[2].firstname }
          ],
          selectable: true,
          selectHelper: true,
          select: function(start, end, jsEvent, view, resource) {
            self.eventDate.year = start.year()
            self.eventDate.month = start.month()+1
            self.eventDate.day = start.date()
            self.startTime.hour = start.hour()
            self.startTime.minute = start.minute()
            self.endTime.hour = end.hour()
            self.endTime.minute = end.minute()
            self.employeeService.getEmployee(resource.id).then(data => {
              self.eventEmployee = data; // check why this only happens in this scope
              console.log(self.eventEmployee) // this gives correct employee
            })
            console.log(self.eventEmployee) // this gives nothing
            self.open(self.content);
          },
          eventRender: function(event, element) {
            element.find('.fc-title').append("<br/>" + event.description);
            element.find(".fc-bg").css("pointer-events","none");
            element.append("<div style='position:absolute;bottom:0px;right:0px' ><button type='button' id='btnDeleteEvent' class='btn btn-block btn-primary btn-flat'>X</button></div>" );
            element.find("#btnDeleteEvent").click(function(){

              //TODO: ajax call to remove event in DB

              $('#calendar').fullCalendar('removeEvents',event._id);
            });
          }
        });
      });
      })
  })
  }

  createEvent(){
    var year: string = String(this.eventDate.year)
    var month: string = String(this.eventDate.month)
    var day: string = String(this.eventDate.day)
    var startHour: string = String(this.startTime.hour)
    var startMinute: string = String(this.startTime.minute)
    var endHour: string = String(this.endTime.hour)
    var endMinute: string = String(this.endTime.hour)
    if (month.length == 1){
      month = "0" + month
    }
    if (day.length == 1){
      day = "0" + day
    }
    if (startHour.length == 1){
      startHour = "0" + startHour
    }
    if (startMinute.length == 1){
      startMinute = "0" + startMinute
    }
    if (endHour.length == 1){
      endHour = "0" + endHour
    }
    if (endMinute.length == 1){
      endMinute = "0" + endMinute
    }
    var date = year+'-'+month+'-'+day+'T'
    $('#calendar').fullCalendar('renderEvent', {title: this.eventTitle, description: this.eventTreatment.name,
      resourceId: this.eventEmployee.id, start: date+startHour+':'+startMinute+':00',
      end: date+endHour+':'+endMinute+':00'});

      // TODO: Ajax call to store event in DB
  }

  getAvailableTimes(){
    var events = $('#calendar').fullCalendar('clientEvents', function(evt){
      return evt;
    });
    var d = new Date()
    d.setHours(d.getHours()+1)
    var amount = 5
    var availableTimes = []
    while (availableTimes.length < amount){
      var available: boolean = true
      if (d.getHours() > 19 || d.getHours() < 8){ // If salon is closed
        available = false
      } else {
        for (var i in events){ // If part of the next hour is occupied by another event
          if (d.getHours() >= events[i].start.hour() && (d.getHours() < events[i].end.hour() || (d.getHours() == events[i].end.hour() && events[i].end.minute() != 0))){
            available = false
          }
        }
      }
      if (available == true){
        var start = new Date(d.getTime())
        var end = new Date(d.getTime())
        start.setMinutes(0)
        end.setMinutes(0)
        start.setSeconds(0)
        end.setSeconds(0)
        end.setHours(end.getHours() + 1)
        availableTimes.push([start, end])
      }
      d.setHours(d.getHours()+1)
    }
    console.log(availableTimes)
    return availableTimes
  }

  setCalender(calendar){
    this.calendar = calendar;
  }

  //modal open
  open(content) {
  console.log(content)
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
