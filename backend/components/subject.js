import {db} from "../config/db.js";

export  const addFees = async (req, res) => {
    const { code, subject, course } = req.body;

    const sql = "INSERT INTO fees (code, subject, course) VALUES (?, ?, ?)";
    db.query(sql, [code, subject, course], (err, result) => {
        if (err) {
            console.error("Error adding subject:", err);
            return res.status(500).json({ error: "Error adding subject" });
        }
        return res.send({
            message: "subject added successfully",
            result,
        })
    });
}

export const getFees = (req, res) => {  
    const sql = "SELECT * FROM fees";
    db.query(sql, (err, result) => {
        if (err) {
            console.error("Error fetching subject:", err);
            return res.status(500).json({ error: "Error fetching subject" });
        }
        return res.send({
            message: "subject data fetched successfully",
            result,
        })
    });
}

export const updateFees = (req, res) => {
    const { id } = req.params;
    const { code, subject, course } = req.body;

    const sql = "UPDATE fees SET code = ?, subject = ?, course = ? WHERE id = ?";
    db.query(sql, [code, subject, course, id], (err, result) => {
        if (err) {
            console.error("Error updating fees:", err);
            return res.status(500).json({ error: "Error updating fees" });
        }
        return res.send({
            message: "Fees updated successfully",
            result,
        })
    });
}
export const deleteFees = (req, res) => {
    const { id } = req.params;
    const sql = "DELETE FROM fees WHERE id = ?";
    db.query(sql, [id], (err, result) => {
        if (err) {
            console.error("Error deleting subject:", err);
            return res.status(500).json({ error: "Error deleting subject" });
        }
        return res.send({
            message: "subject deleted successfully",
            result,
        })
    });
}

export const getFeesById = (req, res) => {
    const { id } = req.params;
    const sql = "SELECT * FROM fees WHERE id = ?";
    db.query(sql, [id], (err, result) => {
        if (err) {
            console.error("Error fetching subject:", err);
            return res.status(500).json({ error: "Error fetching subject" });
        }
        if (result.length === 0) {
            return res.status(404).json({ error: "subject not found" });
        }
        return res.send({
            message: "subject fetched successfully",
            result,
        })
    });
}

