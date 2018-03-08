# API Documentation

This is a nodejs, typescript-es6 and typorm project. The service uses mysql database as an access layer.
The project contains gulpfile.js script that compiles and reload the node server during developement.

To run the project; clone the project from the master branch
1- `cd bankend`
2- `tsc && node dist/app.js` or just type
 `gulp` so the server should run on port 3000. 

 Once server runs, the entities are going to be created in mysql db.
 Please note that  `src/common/ormconfig.ts` contains db configuration, also `dropSchema : true` used will remove the old database and recreated at runtime (this attribute was used as a workaround to fix the timeout exception thrown by typeorm at startup and its used just for developement and not on the production server)

 bellow is the structure of the project: 
 * src
    * common: mysql database configuration and entity registration
    * controllers: contains the controllers
    * entities: contains all the entities
    * repositories: contains all the entity manager logic
    * app: contains all node configuration and middleware

In this project, typdi was used for dependency injection; `typdi` and `typeorm-typedi-extensions` are required.
The controllers are decorated as a `@Service` and the repository is injected in its constructor. to initialize dependencies at startup, the `Container` is capable to get it by typing `Container.get(controller)`. (Please see how depenencies are initilized in app.js)


Bellow is the documentation of the API:

Verb   | API Url               | Return type                   | Parameters       
-------|-----------------------|-------------------------------|------------------------------
Get    | /api/users            | all users entities            |
       | /api/user/:id         | one user entity               | user id
       | /api/user/:query      | one user entity               | firstname, lastname or telefon
       | /api/userrole/:roleId | one user entity               | roleId
       | /api/uets/            | all users,events & treatements|
       | /api/uet/:id          | one user,event & treatement   | uet Id
       | /api/treatements/     | all treatements entities      | 
       | /api/treatement/:id   | one treatement entity         | treatementId
       | /api/roles            | roles entities                |
POST   | /api/user             | new created user              | body request -> {"firstname",           
       |                       |                               |"lastname", "telefon", "roleId"}
       | /api/treatement       | new created treatement        | body req -> {"name", "duration"
       |                       |                               |  "price"}
       | /api/uet              | new created uet               | body req -> {"employeId", "customerId",
       |                       |                               | "eventId", "treatementId"}
DELETE | /api/user/:id         |                               | user id
       | /api/uet/:id          |                               | uet id
       | /api/treatement/:id   |                               | treatement id
       |                       |                               | Note: cascading is implemented
       |                       |                               | manually, typorm cascading didnt work
       |                       |                               | ordentling
PUT    | /api/user/            | updated user                  | user entities to be updated
       | /api/uet              |                               | TODO
       | /api/treatement       | updated treatement            | treatment entities to be updated
