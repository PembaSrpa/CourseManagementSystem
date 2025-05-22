import { db } from "../config/db.js";

export const checkUserLogin = (req, res) => {
    console.log(req.body);
    const { email, password } = req.body;

    const q = "SELECT * FROM users WHERE email = ?";
    db.query(q, [email], (error, result) => {
        if (error) return res.status(500).send(error);
        if (result.length === 0) {
            return res.status(401).send({
                message: "Login unsuccessful",
                error: "Email doesn't exist",
            });
        }
        if (password === result[0].password) {
            const { password, ...user } = result[0];
            return res.status(200).send({
                message: "Login successful",
                user,
            });
        }
        return res.status(401).send({
            message: "Login unsuccessful",
            error: "Invalid password",
        });
    });
};
