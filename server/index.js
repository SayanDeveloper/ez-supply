const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
const User = require("./models/user");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

app.use(cors());
app.use(express.json());

mongoose.connect('mongodb://localhost:27017/test-signup');

app.post("/api/register", async (req, res) => {
    console.log(req.body);
    try{
        const user = await User.create({
            name: req.body.name,
            email: req.body.email,
            password: req.body.password,
        });
        res.json({ status: "ok" });
    }   catch(err) {
        res.json({ status: 'error', error: `${err.message}` });
    }
    res.json({ status: "ok" });
})

app.post("/api/login", async (req, res) => {
    const user = await User.findOne({
        email: req.body.email, 
        password: req.body.password,
    })

    if (user) {
        const token = jwt.sign({
            name: user.name,
            email: user.email,
        }, 'callitsecret');

        return res.json({ status: "ok", user: token });
    }   else {
        return res.json({ status: "error", user: false });
    }
})

app.get('/api/info', async (req, res) => {
	const token = req.headers['x-access-token']

	try {
		const decoded = jwt.verify(token, 'callitsecret');
		const email = decoded.email;
		const user = await User.findOne({ email: email });

		return res.json({ status: 'ok', user: user });
	} catch (error) {
		console.log(error)
		res.json({ status: 'error', error: 'invalid token' })
	}
})

app.listen(7000, () => {
    console.log("Server running on 7000...");
})