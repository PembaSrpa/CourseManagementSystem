import express from "express";
import { checkUserLogin } from "../components/user.js";
const router = express.Router();

// Add a sample route for demonstration
router.post("/checkUserLogin", checkUserLogin);

export default router;
