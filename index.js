const express = require("express");
const jwt = require('jsonwebtoken');
const jwtPass = "12345";

const app = express();
app.use(express.json())
const allUsers = [
  {
    username: "nehasable45@xyz",
    password: "Neha",
    name: "Neha"
  },
  {
    username: "sable45@xyz",
    password: "ha",
    name: "ha"
  }
];

app.post("/signin", function(req, resp) {
  const username = req.body.username;
  const password = req.body.password;

  // Check if the user exists
  const validUser = allUsers.find(user => user.username === username && user.password === password);

  if (!validUser) {
    return resp.status(403).json({
      msg: "User doesn't exist or invalid credentials"
    });
  }

  // User is valid, generate a token
  const token = jwt.sign({ username }, jwtPass);
  resp.json({ token });
});

app.get("/users", function(req, resp) {
  // Placeholder for "/users" route
  resp.send("List of users");
});

app.listen(3000, () => {
  console.log("Server connected on port 3000");
});
