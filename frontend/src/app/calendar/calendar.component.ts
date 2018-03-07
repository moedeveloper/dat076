import { Component, OnInit } from '@angular/core';
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

  constructor() { }

  ngOnInit() {

  	console.log($);

  	$(function() {
    let containerEl: JQuery = $('#calendar');

    	console.log(containerEl);

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
          var title = prompt('Event Title:');

          //TODO: ajax call to store event in DB

          containerEl.fullCalendar('renderEvent', {title: title, description: 'NEW FRESH TREATMENTS', resourceId: resource.id, start: start, end: end});
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
}
