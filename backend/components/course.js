import { db } from "../config/db.js";


export const createCourse = (req, res) => {
    const {name, description } = req.body;

    const sql = "INSERT INTO course (name, description) VALUES ( ?, ?)";
    db.query(sql, [name,description], (err, result) => {
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

export const getCourses = (req, res) => {
    const sql = "SELECT * FROM course";
    db.query(sql, (err, result) => {
        if (err) {
            console.error("Error fetching courses:", err);
            return res.status(500).json({ error: "Error fetching courses" });
        }
        return res.send({
            message: "Courses fetched successfully",
            result,
        })
    });
}


export const getCourseById = (req, res) => {
    const { id } = req.params;
    const sql = "SELECT * FROM course WHERE id = ?";
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

export const updateCourse = (req, res) => {
    const { id } = req.params;
    const { name, description } = req.body;

    const sql = "UPDATE course SET name = ?, description = ? WHERE id = ?";
    db.query(sql, [name, description, id], (err, result) => {
        if (err) {
            console.error("Error updating course:", err);
            return res.status(500).json({ error: "Error updating course" });
        }
        if (result.affectedRows === 0) {
            return res.status(404).json({ error: "Course not found" });
        }
        return res.send({
            message: "Course updated successfully",
            result,
        })
    });
}
export const deleteCourse = (req, res) => {
    const { id } = req.params;

    const sql = "DELETE FROM course WHERE id = ?";
    db.query(sql, [id], (err, result) => {
        if (err) {
            console.error("Error deleting course:", err);
            return res.status(500).json({ error: "Error deleting course" });
        }
        if (result.affectedRows === 0) {
            return res.status(404).json({ error: "Course not found" });
        }
        return res.send({
            message: "Course deleted successfully",
            result,
        })
    });
}
