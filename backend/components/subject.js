import {db} from "../config/db.js";

export  const addFees = async (req, res) => {
    const { code, subject, fees } = req.body;

    const sql = "INSERT INTO fees (code, subject, fees) VALUES (?, ?, ?)";
    db.query(sql, [code, subject, fees], (err, result) => {
        if (err) {
            console.error("Error adding fees:", err);
            return res.status(500).json({ error: "Error adding fees" });
        }
        return res.send({
            message: "Fees added successfully",
            result,
        })
    });
}

export const getFees = (req, res) => {  
    const sql = "SELECT * FROM fees";
    db.query(sql, (err, result) => {
        if (err) {
            console.error("Error fetching fees:", err);
            return res.status(500).json({ error: "Error fetching fees" });
        }
        return res.send({
            message: "Fees data fetched successfully",
            result,
        })
    });
}

export const updateFees = (req, res) => {
    const { id } = req.params;
    const { code, subject, fees } = req.body;

    const sql = "UPDATE fees SET code = ?, subject = ?, fees = ? WHERE id = ?";
    db.query(sql, [code, subject, fees, id], (err, result) => {
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
            console.error("Error deleting fees:", err);
            return res.status(500).json({ error: "Error deleting fees" });
        }
        return res.send({
            message: "Fees deleted successfully",
            result,
        })
    });
}

export const getFeesById = (req, res) => {
    const { id } = req.params;
    const sql = "SELECT * FROM fees WHERE id = ?";
    db.query(sql, [id], (err, result) => {
        if (err) {
            console.error("Error fetching fees:", err);
            return res.status(500).json({ error: "Error fetching fees" });
        }
        if (result.length === 0) {
            return res.status(404).json({ error: "Fees not found" });
        }
        return res.send({
            message: "Fees fetched successfully",
            result,
        })
    });
}

