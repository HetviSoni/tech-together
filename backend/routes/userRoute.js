const express = require("express");
const router = express.Router();
const {registerUser, loginUser,getUser,loginstatus, reportIncident} = require("../controllers/userController");
const protect = require("../middleware/authMiddleware");

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/getUser",protect, getUser);
router.get("/loggedin",loginstatus);
router.post("/report", reportIncident);


module.exports = router;