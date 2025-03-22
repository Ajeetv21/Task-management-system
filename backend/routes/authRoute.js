const express = require("express")
const router = express.Router();
const authMiddleware = require("../middlerwares/authMiddleware")
const roleMiddleware = require("../middlerwares/roleMiddleware")
const {register,login}  = require("../controllers/authController")

router.post("/register",register);
router.post("/login",login);
module.exports = router;

