import express from "express";
import {
	getSubject,
	addSubject,
	updateSubject,
	deleteSubject,
	getSubjectById,
} from "../components/subject.js";

const router = express.Router();

router.get("/getSubject", getSubject);
router.post("/addSubject", addSubject);
router.post("/updateSubject/:id", updateSubject);
router.post("/deleteSubject/:id", deleteSubject);
router.get("/getSubject/:id", getSubjectById);

export default router;
