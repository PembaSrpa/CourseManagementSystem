import { db } from "../config/db.js";

export const addSubject = async (req, res) => {
	const { code, subject, course } = req.body;

	const sql = "INSERT INTO subject (code, subject, course) VALUES (?, ?, ?)";
	db.query(sql, [code, subject, course], (err, result) => {
		if (err) {
			console.error("Error adding subject:", err);
			return res.status(500).json({ error: "Error adding subject" });
		}
		return res.send({
			message: "subject added successfully",
			result,
		});
	});
};

export const getSubject = (req, res) => {
	const sql = "SELECT * FROM subject";
	db.query(sql, (err, result) => {
		if (err) {
			console.error("Error fetching subject:", err);
			return res.status(500).json({ error: "Error fetching subject" });
		}
		return res.send({
			message: "subject data fetched successfully",
			result,
		});
	});
};

export const updateSubject = (req, res) => {
	const { id } = req.params;
	const { code, subject, course } = req.body;

	const sql =
		"UPDATE subject SET code = ?, subject = ?, course = ? WHERE id = ?";
	db.query(sql, [code, subject, course, id], (err, result) => {
		if (err) {
			console.error("Error updating Subject:", err);
			return res.status(500).json({ error: "Error updating Subject" });
		}
		return res.send({
			message: "Subject updated successfully",
			result,
		});
	});
};
export const deleteSubject = (req, res) => {
	const { id } = req.params;
	const sql = "DELETE FROM subject WHERE id = ?";
	db.query(sql, [id], (err, result) => {
		if (err) {
			console.error("Error deleting subject:", err);
			return res.status(500).json({ error: "Error deleting subject" });
		}
		return res.send({
			message: "subject deleted successfully",
			result,
		});
	});
};

export const getSubjectById = (req, res) => {
	const { id } = req.params;
	const sql = "SELECT * FROM subject WHERE id = ?";
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
		});
	});
};
