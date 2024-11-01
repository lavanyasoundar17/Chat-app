const express = require("express");
const router = express.Router({ mergeParams: true });
const {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
} = require("firebase/auth");

// middleware that is specific to this router

router.post("/", (req, res) => {
  const userData = { ...req.body, password: atob(req.body.password) };

  const auth = getAuth();
  createUserWithEmailAndPassword(auth, userData.email, userData.password)
    .then((userCredential) => {
      // Signed up
      const user = userCredential.user;
      updateProfile(auth.currentUser, {
        displayName: `${userData.firstName} ${userData.lastName}`,
      })
        .then(() => {
          console.log(getAuth());
          res.send({ status: "success", message: "registration successful" });
        })
        .catch((error) => handleUserRegistrationError(error, res));
    })
    .catch((error) => handleUserRegistrationError(error, res));
});

function handleUserRegistrationError(error, res) {
  const errorCode = error.code;
  const errorMessage = error.message;
  console.log(error);
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
}

router.post("/login", (req, res) => {
  const { email, password } = {
    ...req.body,
    password: atob(req.body.password),
  };
  const auth = getAuth();
  signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      const user = userCredential.user;
      console.log(user);
      res.cookie("uid", user.uid, { httpOnly: true, secure: true });
      res.send({
        status: "success",
        message: "logged in successfully",
        userDisplayName: user.displayName,
      });
    })
    .catch((error) => handleLoginError(error, res));
});

function handleLoginError(error, res) {
  const errorCode = error.code;
  const errorMessage = error.message;

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
}

module.exports = router;
