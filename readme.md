# API Documentation

# User API
app.get("/api/users" -> returns a list of users (see user entities to se attributes)
app.post("/api/user" -> create a new user parameters to be sent as a json format {"firstname", "lastname", "telefon"}; returns new created user
app.get("/api/user/:id" -> returns one use, id should be sent as parameter ex : 57e9c601-913f-4851-9794-722a95d1867d
app.delete("/api/user/:id" -> no return, id sent as parameter in url
app.put("/api/user/" -> update an old user, the whole user entities should be sent, returns new updated user
app.get("/api/user/:query" -> search one use by using firstname, lastname, telefon as query-> returns one user.


# User/Customer, Treatement and event API Join Table

app.get("/api/uets"  -> returns all uets "UserEventTreatement". (see )
app.get("/api/uet/:id" -> returns one uet by using its id as parameter.
app.post("/api/uet/" -> create new uet: the customerId, the event entities and treatmentid should be sent as parameters the api handle cascading. it retuns the new created uet
app.delete("/api/uet/:id" -> remove uet. uet id should be sent as a parameter, the api handle cascading  it removes the one event but not customer and treatement.
app.put("/api/uet" -> update one uet, the whole uet should be sent in body as json format, it returns the new updated uet. - TODO discuss with the team


# Treatement


app.get("/api/treatements" -> returns all treamtents (see treatement entities for attributes)
app.get("/api/treatement/:id" -> returns one treatement, treatement id should be sent as parameter
app.post("/api/treatement/" -> create one treatment and returns it.
app.delete("/api/treatement/:id" -> remove one treatement, no return
app.put("/api/treatement" -> update one treatement and returns it.
