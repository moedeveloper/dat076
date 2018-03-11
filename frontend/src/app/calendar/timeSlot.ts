

export class TimeSlot {
    private _year: string;
    private _month: string;
    private _day: string;
    private _startHour: string;
    private _startMinute: string;
    private _endHour: string;
    private _endMinute: string;
    constructor(private startTime: Moment, private endTime: Moment,
         private eventDate: EventDate) {
            this._year = String(this.eventDate.year);
            this._month = String(this.eventDate.month);
            this._day = String(this.eventDate.day);
            this._startHour = String(this.startTime.hour);
            this._startMinute = String(this.startTime.minute);
            this._endHour = String(this.endTime.hour);
            this._endMinute = String(this.endTime.minute);
            console.log('constructing timeSlot...');
            // TOFIX
            if (this._month.length === 1) {
                this._month = '0' + this._month;
            }
            if (this._day.length === 1) {
                this._day = '0' + this._day;
            }
            if (this._startHour.length === 1) {
                this._startHour = '0' + this._startHour;
            }
            if (this._startMinute.length === 1) {
                this._startMinute = '0' + this._startMinute;
            }
            if (this._endHour.length === 1) {
                this._endHour = '0' + this._endHour;
            }
            if (this._endMinute.length === 1) {
                this._endMinute = '0' + this._endMinute;
            }

    }

    getDate() {
        return this._year + '-' + this._month + '-' + this._day + 'T';
    }

    getStartTimeISO8601() {
        return this.getDate() + this._startHour + ':' + this._startMinute + ':00Z';
    }

    getEndTimeISO8601() {
        return this.getDate() + this._endHour + ':' + this._endMinute + ':00Z';
    }
}


export class EventDate {
    year: number;
    month: number;
    day: number;
    constructor(y: number, m: number, d: number) {
        this.day = d;
        this.month = m;
        this.year = y;
    }
}
export class Moment {
    hour: number;
    minute: number;
    constructor(h: number, m: number) {
        this.minute = m;
        this.hour = h;
    }
}
