import * as express from 'express'
import * as bodyParser from 'body-parser'
import "reflect-metadata"
import {createConnection, useContainer} from "typeorm"
import * as appConfig from "./common/ormconfig"
import {Container} from "typedi";

import { UserEntity } from "./entities/UserEntity" 
import {UserRoute} from "./controllers/user"

/**
 * Controllers (route handlers).
 */
import { connect } from 'http2';
import { UETRoute } from './controllers/UETRoute';
import { Connection } from 'typeorm/connection/Connection';
import { TreatementRoute } from './controllers/TreatementRoute';
import { CustomerRoute } from './controllers/CustomerRoute';
import { EventCalendarRoute } from './controllers/EventCalendarRoute';
import { UserGroupAuthRoute } from './controllers/UserGroupAuthRoute';
import { GroupRoute } from './controllers/GroupRoute';



 
/**
 * Create Express server.
 */
const app = express()
 
/**
 * Express configuration.
 */
app.set("port", process.env.PORT || 3000)

app.use(function(req, res, next){
	res.setHeader('Access-Control-Allow-Origin', '*');
	res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type, Authorization');
    next();
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

/**
 * Create connection to DB using configuration provided in 
 * appconfig file.
 * useContainr for DI
 */
useContainer(Container);
createConnection(appConfig.dbOptions).then(async connection => {
  console.log("Connected to DB: ");
}).catch(error => console.log("TypeORM connection error: ", error));

/**
 * Primary app routes.
 */
let usercContainer = Container.get(UserRoute)
app.get("/api/users", usercContainer.getusers)
app.post("/api/user", usercContainer.createuser)
app.get("/api/user/:id", usercContainer.getuser)
app.delete("/api/user/:id", usercContainer.removeuser)
app.put("/api/user/", usercContainer.updateuser)
app.get("/api/user/:query", usercContainer.getuserbyQuery)


// Event is a user->Event-> treatement
let uetcontainer = Container.get(UETRoute)
app.get("/api/uets", uetcontainer.getuets)
app.get("/api/uet/:id", uetcontainer.getuet)
app.post("/api/uet/", uetcontainer.createuet)
app.delete("/api/uet/:id", uetcontainer.deleteuet)
app.put("/api/uet", uetcontainer.updateuet)

//
let tcontainer = Container.get(TreatementRoute)
app.get("/api/treatements", tcontainer.getTreatements)
app.get("/api/treatement/:id", tcontainer.gettreatement)
app.post("/api/treatement/", tcontainer.createtreatement)
app.delete("/api/treatement/:id", tcontainer.deletetreatement)
app.put("/api/treatement", tcontainer.updatetreatement)
//
let ccontainer = Container.get(CustomerRoute)
app.get("/api/customers", ccontainer.getCustomers)
app.get("/api/customer/:id", ccontainer.getcustomer)
app.post("/api/customer/", ccontainer.createcustomer)
app.delete("/api/customer/:id", ccontainer.deletecustomer)
app.put("/api/customer", ccontainer.updatecustomer)

let econtainer = Container.get(EventCalendarRoute)
app.get("/api/eventcalendars", econtainer.getEventCalendars)
app.get("/api/eventcalendar/:id", econtainer.geteventcalendar)
app.post("/api/eventcalendar/", econtainer.createeventcalendar)
app.delete("/api/eventcalendar/:id", econtainer.deleteeventcalendar)
app.put("/api/eventcalendar", econtainer.updateeventcalendar)

let acontainer = Container.get(UserGroupAuthRoute)
app.get("/api/userGroupAuthRoute/:id", acontainer.getUserGroupAuthById)
app.post("/api/userGroupAuthRoute/", acontainer.createUserGroupAuth)
app.delete("/api/userGroupAuthRoute/:id", acontainer.deleteUserGroupAuthById)
app.put("/api/userGroupAuthRoute", acontainer.updateUserGroupAuth)

let rolecontainer = Container.get(GroupRoute)
app.get("/api/role/:id", rolecontainer.getUserRole)
app.post("/api/role/", rolecontainer.createUserRole)
app.delete("/api/role/:id", rolecontainer.removeUserRole)

/**
 * Start Express server.
 */
app.listen(app.get("port"), () => {
  console.log(("  App is running at http://localhost:%d in %s mode"), app.get("port"), app.get("env"));
  console.log("  Press CTRL-C to stop\n")
});

module.exports = app