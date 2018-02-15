
import * as express from 'express'
import * as bodyParser from 'body-parser'
import "reflect-metadata"
import {createConnection} from "typeorm"
import * as appConfig from "./common/ormconfig"

import { UserEntity } from "./entities/UserEntity" 

/**
 * Controllers (route handlers).
 */
import * as userController from "./controllers/user"
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
 * Primary app routes.
 */
app.get("/users", userController.getusers)
app.post("/user", userController.saveuser)

/**
 * Create connection to DB using configuration provided in 
 * appconfig file.
 */
createConnection(appConfig.dbOptions).then(async connection => {
  //console.log(__dirname)
  console.log("Connected to DB: ");
  // let user = new UserEntity()
  // user.firstname ="moe"
  // user.lastname = "mmotto"
  // user.telefon = "0712132565"

  // let repo = connection.getRepository(UserEntity)

  // await repo.save(user)


  // let saved = await repo.find();
  // console.log("All users from the db: ", saved);
  
}).catch(error => console.log("TypeORM connection error: ", error));

module.exports = app