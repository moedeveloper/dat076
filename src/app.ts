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
 * Start Express server.
 */
app.listen(app.get("port"), () => {
  console.log(("  App is running at http://localhost:%d in %s mode"), app.get("port"), app.get("env"));
  console.log("  Press CTRL-C to stop\n")
});

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
let container = Container.get(UserRoute)
app.get("/users", container.getusers)
//app.post("/user", userController.saveuser)
module.exports = app