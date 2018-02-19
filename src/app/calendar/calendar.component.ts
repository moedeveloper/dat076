import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery';
import 'fullcalendar';
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
	    	now: '2018-02-19',
		    editable: true, // enable draggable events
		    aspectRatio: 1.8,
		    scrollTime: '00:00', // undo default 6am scrollTime
		    header: {
		      left: 'today prev,next',
		      center: 'title',
		      right: 'agendaDay,timelineThreeDays,agendaWeek,month,listWeek'
		    },
		    defaultView: 'agendaDay',
		    views: {
		      timelineThreeDays: {
		        type: 'agendaDay',
		        duration: { days: 3 }
		      }
		    },
		    resourceLabelText: 'Rooms',
		    resources: [
		        { id: 'a', title: 'Room A' },
		        { id: 'b', title: 'Room B' },
		        { id: 'c', title: 'Room C' },
		        { id: 'd', title: 'Room D' }
		    ]
	       
	    });
	});

  }

}
