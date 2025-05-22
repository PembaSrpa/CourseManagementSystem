import express from 'express';
import { createStudent, deleteStudent, getStudentById, getStudents, updateStudent } from '../components/student.js';



const router = express.Router();


router.get("/getstudent", getStudents)
router.post("/createstudent", createStudent)   
router.post("/updatestudent/:id", updateStudent)
router.post("/deletestudent/:id", deleteStudent)
router.get("/getstudent/:id", getStudentById)



export default router;