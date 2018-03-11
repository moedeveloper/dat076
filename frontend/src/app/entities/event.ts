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
