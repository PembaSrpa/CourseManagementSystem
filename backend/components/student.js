import { db } from "../config/db";

export const createStudent = (req, res) => {
    const {name, email, course } = req.body;

    const sql = "INSERT INTO student (name, email, course) VALUES ( ?, ?,?)";
    db.query(sql, [name, email, course], (err, result) => {
        if (err) {
            console.error("Error creating course:", err);
            return res.status(500).json({ error: "Error creating course" });
        }
        return res.send({
            message: "Course created successfully",
            result,
        })
    });
}   

export const getStudents = (req, res) => { 
    const sql = "SELECT * FROM student";
    db.query(sql, (err, result) => {
        if (err) {
            console.error("Error fetching students:", err);
            return res.status(500).json({ error: "Error fetching Student data" });
        }
        return res.send({
            message: "Student data fetched successfully",
            result,
        })
    });
}
 export const updateStudent = (req, res) => { 
    const { id } = req.params;
    const { name, email, course } = req.body;

    const sql = "UPDATE student SET name = ?, email = ?, course = ? WHERE id = ?";
    db.query(sql, [name, email, course, id], (err, result) => {
        if (err) {
            console.error("Error updating course:", err);
            return res.status(500).json({ error: "Error updating course" });
        }
        return res.send({
            message: "Course updated successfully",
            result,
        })
    });
}


export const deleteStudent = (req, res) => {
    const { id } = req.params;
    const sql = "DELETE FROM student WHERE id = ?";
    db.query(sql, [id], (err, result) => {
        if (err) {
            console.error("Error deleting course:", err);
            return res.status(500).json({ error: "Error deleting course" });
        }
        return res.send({
            message: "Course deleted successfully",
            result,
        })
    });
}   

export const getStudentById = (req, res) => {   
    const { id } = req.params;
    const sql = "SELECT * FROM student WHERE id = ?";
    db.query(sql, [id], (err, result) => {
        if (err) {
            console.error("Error fetching course:", err);
            return res.status(500).json({ error: "Error fetching course" });
        }
        if (result.length === 0) {
            return res.status(404).json({ error: "Course not found" });
        }
        return res.send({
            message: "Course fetched successfully",
            result,
        })
    });
}
