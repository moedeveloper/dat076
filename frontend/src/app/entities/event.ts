import { Time } from '@angular/common';
import { User } from './user';
import { Treatment } from './treatment';

export class EventCalendar {
    id: string;
    starttime: Time;
    endtime: Time;
}

export class EventEntities {
    customer: User;
    employee: User;
    treatment: Treatment;
    event: EventCalendar;
}

export class EventCalendarAttributes {
    public id: string;
    public title: string;
    public description: string;
    public resourceId: string;
    public start: any;
    public end: any;
}
