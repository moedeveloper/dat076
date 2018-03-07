import { Component, OnInit } from '@angular/core';
import { HttpModule } from '@angular/http';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  // Added by Mo3
  constructor(private http: HttpClient) { }

  ngOnInit() {
    // just for testing
    this.http.get('http://nat-mo3-demo.hard.ware.fi:3000/api/users').subscribe(data => {
      console.log(data);
    });
  }

}
