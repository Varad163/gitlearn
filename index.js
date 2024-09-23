const express = require("express");
const app = express();
app.use(express.json());

const users = [];

// Signup route
app.post("/signup", function (req, res) {
  const username = req.body.username;
  const password = req.body.password;

  users.push({
    username: username,
    password: password,
    token: null, // To store the token later after sign in
  });

  res.json({
    message: "You are signed up",
  });

  console.log(users);
});

app.post("/signin", function (req, res) {
  const username = req.body.username;
  const password = req.body.password;

  // Use the find method for cleaner code
  const foundUser = users.find((user) => user.username === username && user.password === password);

  if (foundUser) {
    const token = "some-generated-token"; // In real-world apps, you should generate a JWT token or something similar.
    foundUser.token = token; // Assign the token to the user

    res.json({
      token: token,
      message: "Successfully signed in",
    });
  } else {
    res.status(401).json({
      message: "Invalid username or password",
    });
  }
});

// Me route
app.get("/me", function (req, res) {
  const token = req.headers.token;
  
  // Find user by token
  const foundUser = users.find((user) => user.token === token);

  if (foundUser) {
    res.json({
      username: foundUser.username,
      password: foundUser.password, // In real-world apps, never return the password in a response!
    });
  } else {
    res.status(401).json({
      message: "User not authenticated",
    });
  }
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
