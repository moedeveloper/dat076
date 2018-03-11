# Group project DAT076
This is a booking system for a group project in the Chalmers course DAT076

This frontend is build using [Angular 5](https://angular.io/) for MVC and [ng-bootstrap](https://ng-bootstrap.github.io/#/home) + [bootstrap 4](https://getbootstrap.com/) for some visual elements.

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
cd /PATH/TO/PROJECT
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
