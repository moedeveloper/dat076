# Group project DAT076
This is a booking system for a group project in the Chalmers course DAT076

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
src ->
* app
  * Components
    * Component.html    - _Component template file._
    * Component.css     - _Component decorator._
    * Component.spec.ts - _Unit tests for your source files. Using the Jasmine javascript test framework through the Karma task runner when you use the 'ng test' command._
    * Component.ts
  * Models   - _Contains models of employees, events_ 
  * Services - _Contains services for fetching data from REST-API_
* assets
* enviroments
* index.html
* index.ts
