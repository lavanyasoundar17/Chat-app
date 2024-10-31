const express = require("express");
const router = express.Router({ mergeParams: true });
const {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} = require("firebase/auth");

// middleware that is specific to this router

router.post("/", (req, res) => {
  const userData = { ...req.body, password: atob(req.body.password) };

  const auth = getAuth();
  createUserWithEmailAndPassword(auth, userData.email, userData.password)
    .then((userCredential) => {
      // Signed up
      const user = userCredential.user;
      // create user collection on success

      res.send({ status: "success", message: "registration successful" });
      // ...
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      if (errorCode === "auth/email-already-in-use") {
        res.status(400);
        res.send({
          status: "failure",
          message: "Email already registered.",
        });
      } else {
        res.status(500);
        res.send({
          status: "failure",
          message: "User registration was unsuccessful",
        });
      }
    });

  //res.send({ res: "success" });
});

router.post("/login", (req, res) => {
  const { email, password } = {
    ...req.body,
    password: atob(req.body.password),
  };
  const auth = getAuth();
  signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Signed in
      const user = userCredential.user;
      console.log("login success", user.uid);
      res.send({
        status: "success",
        message: "logged in successfully",
      });
      // ...
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      // console.log(error);

      if (errorCode === "auth/invalid-credential") {
        res.status(400);
        res.send({
          status: "failure",
          message: "Invalid credentials",
        });
      } else {
        res.status(500);
        res.send({
          status: "failure",
          message: "Login failed",
        });
      }
    });
});

module.exports = router;
