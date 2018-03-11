# Group project DAT076
This is a booking system for a group project in the Chalmers course DAT076

This frontend is build using [Angular 5](https://angular.io/) for MVC and [ng-bootstrap](https://ng-bootstrap.github.io/#/home) + [bootstrap 4](https://getbootstrap.com/) for some visual elements.

![alt text](https://scontent-arn2-1.xx.fbcdn.net/v/t35.0-12/s2048x2048/28945881_10210986506489770_942997736_o.png?oh=7e5c2b69b1c57d4fa65cbf8a62777f16&oe=5AA722EE)

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites
Both the CLI and generated project have dependencies that require Node 6.9.0 or higher, together with NPM 3 or higher.

#### Installing Angular CLI
```
npm install -g @angular/cli
```

#### Serving the project via a development server
```
cd /PATH/TO/PROJECT/frontend
npm install
ng serve --open
```

## Project Structure

Angular 5 uses "components" which consists of a template, decorator, model and a test- file such as:
* Components
    * Component.html    - _Component template file._
    * Component.css     - _Component decorator._
    * Component.spec.ts - _Unit tests for your source files. Using the Jasmine javascript test framework through the Karma task runner when you use the 'ng test' command._
    * Component.ts - _Component model logic_


src ->
* app
  * Admin   - _Contains the template, model, decorator and test file for the component admin_
    * files
  * App-routing   - _Contains the logic for routing within the app_
    * files
  * Calendar - _Contains the template, model, decorator and test file for the component calendar_
    * files
  * Entities   - _Contains models of employees, customers, events and treatments_
    * files
  * Utils - _Contains services for fetching data from REST-API_
    * files
  
  * app.component.css - _Decorator for the main app component, the upper menu toolbar_
  * app.component.html - _Template for the main app component_
  * app.component.spec.ts - _Tests for the main app component_
  * app.component.ts - _Model logic for the main app component_
  * app.module.ts - _Handles global imports and components_ 

## Project description
Angular 5 is a component and module based JS-framework described as using a "MV-whatever" structure and handles the value binding between the Model and the View of a component. This project is built upon Angular for the frontend and Node, Express and mySql for the backend. 

The services running on the frontend uses @Angular/http for http-request to the server.

The starting page of the application is the calendar, which is controlled by calendar.component.ts and whose template is calendar.component.html. Here, we initialize data stored in the database and use it to display events on the calendar (fullcalendar.io). Fullcalendar has some default functions and expose an API for being able to define what happens when specific things are made with the calendar, such as adding an event to it, or selecting a timespan.
We also have the toolbar at the top which is the root app component and is constantly running. Here, we can switch between the calendar and the admin component. Calendar and admin populate the rest of the screen area under the toolbar. The admin component is intended for an admin and is used to manage tables of employees, customers, treatments and events. Admin.component.ts contains the model for admin and admin.component.html contains its template. Changes made here are also stored in the database. This happens with the use of the services in Utils. The services send http requests with data in a json format to the backend.

Most of the user interaction with the application is through modals, which are structured in the HTML-files for each component. The buttons map to functions in the components' typescript files.



