import express from 'express';
import { getFees, addFees, updateFees, deleteFees,getFeesById } from '../components/subject.js';

const router = express.Router();

router.get("/getfees", getFees);
router.post("/addfees", addFees);
router.post("/updatefees/:id", updateFees);
router.post("/deletefees/:id", deleteFees);
router.get("/getfees/:id", getFeesById);


export default router;
