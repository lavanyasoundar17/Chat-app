const express = require("express");
const cors = require("cors"); //using cors because frontend and backend are running in different portals
const app = express();
const userRoutes = require("./users");
const { firebaseConfig } = require("./firebase-config");
const { initializeApp } = require("firebase/app");
const { getAuth } = require("firebase/auth");

const firebaseApp = initializeApp(firebaseConfig);
const auth = getAuth(firebaseApp);
const cookieParser = require("cookie-parser");

// Middleware

app.use(cors());
app.use(express.json());
app.use(cookieParser());

app.use("/api/user", userRoutes);

app.listen(5000, () => {
  console.log("Server is running on portal 5000");
});
