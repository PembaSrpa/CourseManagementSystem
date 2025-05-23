import express from "express";
import { checkUserLogin, addUser } from "../components/user.js";
const router = express.Router();

// Add a sample route for demonstration
router.post("/checkUserLogin", checkUserLogin);
router.post("/addUser", addUser);

export default router;
