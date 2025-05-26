import { db } from "../config/db.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
const JWT_SECRET = process.env.JWT_SECRET || "your_jwt_secret";

export const checkUserLogin = (req, res) => {
	const { email, password } = req.body;

	const q = "SELECT * FROM users WHERE email = ?";
	db.query(q, [email], async (error, result) => {
		if (error) return res.status(500).send(error);
		if (result.length === 0) {
			return res.status(401).send({
				message: "Login unsuccessful",
				error: "Email doesn't exist",
			});
		}
		const user = result[0];
		const match = await bcrypt.compare(password, user.password);
		if (match) {
			const { password, ...userData } = user;
			const token = jwt.sign({ id: user.id, email: user.email }, JWT_SECRET, {
				expiresIn: "1h",
			});
			return res.status(200).send({
				message: "Login successful",
				user: userData,
				token,
			});
		}
		return res.status(401).send({
			message: "Login unsuccessful",
			error: "Invalid password",
		});
	});
};

export const addUser = async (req, res) => {
	const { email, password } = req.body;
	const hashedPassword = await bcrypt.hash(password, 10);
	const q = "INSERT INTO users (email, password) VALUES (?, ?)";
	db.query(q, [email, hashedPassword], (error, result) => {
		if (error) return res.status(500).send(error);
		return res.status(200).send({
			message: "User added successfully",
			user: { id: result.insertId, email },
		});
	});
};
