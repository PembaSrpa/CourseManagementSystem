import express from 'express';
// import checkUser from '../middleware/checkUser.js';
const router = express.Router();

// Add a sample route for demonstration
router.get('/test', (req, res) => {
    res.json({ message: 'User router is working!' });
});

export default router;