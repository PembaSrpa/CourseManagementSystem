import { db } from "../config/db.js";

export const createTeacher = (req, res) => {
    const { name, email, subject } = req.body;

    const sql = "INSERT INTO teacher (name, email, subject) VALUES ( ?, ?,?)";
    db.query(sql, [name, email, subject], (err, result) => {
        if (err) {
            console.error("Error creating teacher:", err);
            return res.status(500).json({ error: "Error creating teacher" });
        }
        return res.send({
            message: "Teacher created successfully",
            result,
        });
    });
};

export const getTeachers = (req, res) => {
    const sql = "SELECT * FROM teacher";
    db.query(sql, (err, result) => {
        if (err) {
            console.error("Error fetching teachers:", err);
            return res
                .status(500)
                .json({ error: "Error fetching Teacher data" });
        }
        return res.send({
            message: "Teacher data fetched successfully",
            result,
        });
    });
};

export const updateTeacher = (req, res) => {
    const { id } = req.params;
    const { name, email, subject } = req.body;

    const sql =
        "UPDATE teacher SET name = ?, email = ?, subject = ? WHERE id = ?";
    db.query(sql, [name, email, subject, id], (err, result) => {
        if (err) {
            console.error("Error updating teacher:", err);
            return res.status(500).json({ error: "Error updating teacher" });
        }
        return res.send({
            message: "Teacher updated successfully",
            result,
        });
    });
};

export const deleteTeacher = (req, res) => {
    const { id } = req.params;
    const sql = "DELETE FROM teacher WHERE id = ?";
    db.query(sql, [id], (err, result) => {
        if (err) {
            console.error("Error deleting teacher:", err);
            return res.status(500).json({ error: "Error deleting teacher" });
        }
        return res.send({
            message: "Teacher deleted successfully",
            result,
        });
    });
};

export const getTeacherById = (req, res) => {
    const { id } = req.params;
    const sql = "SELECT * FROM teacher WHERE id = ?";
    db.query(sql, [id], (err, result) => {
        if (err) {
            console.error("Error fetching teacher:", err);
            return res.status(500).json({ error: "Error fetching teacher" });
        }
        if (result.length === 0) {
            return res.status(404).json({ error: "Teacher not found" });
        }
        return res.send({
            message: "Teacher fetched successfully",
            result,
        });
    });
};
