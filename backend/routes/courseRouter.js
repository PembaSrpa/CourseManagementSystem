import express from 'express';
import { createCourse, getCourses, getCourseById, updateCourse, deleteCourse } from '../components/course.js';



const router = express.Router();

router.get("/getcourse",getCourses)
router.get("/getcourse/:id",getCourseById)
router.post("/createcourse",createCourse)
router.post("/updatecourse/:id",updateCourse)
router.post("/deletecourse/:id",deleteCourse)


export default router;