import { Component, OnInit, ViewChild } from '@angular/core';
import { FormsModule }   from '@angular/forms';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import {User} from '../utils/user';
import {Treatment} from '../utils/treatment';
import * as $ from 'jquery';
import 'fullcalendar';
import 'fullcalendar/dist/locale/sv.js';
import 'fullcalendar-scheduler';

@Component({
  selector: 'app-caledar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css']
})
export class CalendarComponent implements OnInit {
  @ViewChild('content') private content;
  content2 = this.content;
  closeResult: string;
  startTime = {hour: 13, minute: 30};
  endTime = {hour: 13, minute: 30};
  eventTitle: string;
  eventEmployee: User;
  eventTreatment: Treatment;
  calendar;

  constructor(private modalService: NgbModal) {  }

  //dummy data until backend connection

  employees = [
    new User(1, "Mo", "Mortada", "0700123123"),
    new User(2, "David", "Iliefski", "0700123423"),
    new User(3, "Simon", "Mare", "0700545543"),
    new User(4, "Carl", "Albertsson", "0700123759"),
    new User(5, "Joachim", "Von Anka", "0700543987")
  ];
  treatments = [
    new Treatment(1, "Haircut", "--"),
    new Treatment(2, "Prep", "--"),
    new Treatment(3, "Wash", "--"),
    new Treatment(4, "Trim", "--"),
    new Treatment(5, "Extensions", "--")
  ];



  ngOnInit(
  ) {

  	console.log($);
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
		      right: 'agendaDay,agendaWeek,month,listWeek'
		    },
        allDaySlot: false,
		    defaultView: 'agendaDay',
		    resourceLabelText: 'Employees',
		    resources: [
		        { id: 'Mo', title: 'Mo' },
		        { id: 'David', title: 'David' },
		        { id: 'Simon', title: 'Simon' },
		        { id: 'Carl', title: 'Carl' }
		    ],
        events: [
          {title: 'abc', description: 'Some insane treatment', resourceId: 'Mo', start: '2018-02-22T11:00:00', end: '2018-02-22T12:30:00'},
          {title: 'cde', description: 'really shitty treatment over here', resourceId: 'Simon', start: '2018-02-22T10:00:00', end: '2018-02-22T12:00:00'}
        ],
        selectable: true,
        selectHelper: true,
        select: function(start, end, jsEvent, view, resource) {
          //this opens in the wrong scope and the modal is not shown correctly
          //self.open(self.content);
          var title = prompt('Event Title:');

          //TODO: ajax call to store event in DB

          containerEl.fullCalendar('renderEvent', {title: "title", description: 'NEW FRESH TREATMENTS', resourceId: resource.id, start: start, end: end});
          containerEl.fullCalendar('unselect');
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


  }

  createEvent(){
    console.log(this.eventTitle)
    console.log(this.eventEmployee)
    console.log(this.eventTreatment)
    console.log(this.startTime)
    console.log(this.endTime)
    //this.calendar.fullCalendar('renderEvent', {title: "title", description: 'NEW FRESH TREATMENTS', resourceId: resource.id, start: start, end: end});
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
