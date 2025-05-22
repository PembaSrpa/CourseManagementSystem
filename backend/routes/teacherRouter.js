import express from 'express';
import { createTeacher, deleteTeacher, getTeacherById, getTeachers, updateTeacher } from '../components/teacher.js';


const router = express.Router();



router.get("/getteacher", getTeachers)
router.post("/createteacher", createTeacher)
router.post("/updateteacher/:id", updateTeacher)
router.post("/deleteteacher/:id", deleteTeacher)
router.get("/getteacher/:id", getTeacherById)




export default router;