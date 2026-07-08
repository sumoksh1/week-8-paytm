const express= require("express");
const zod = require("zod");
const router = express.Router();
const jwt = require("jsonwebtoken");
const { User } = require("../db");
const { JWT_SECRET } = require("../config");



const userSchema = zod.object({
    username: zod.string().min(2).max(100),
    password: zod.string().min(6).max(100),
    firstName: zod.string().min(2).max(100),
    lastName: zod.string().min(2).max(100)
});

router.post("/signup", async (req, res) => {
    const { username, password, firstName, lastName } = req.body;

    const{success, error} = userSchema.safeParse(req.body);
    if (!success) {
        return res.status(400).json({ message: "Email is already taken / Invalid input", error });
    }


    const existingUser = User.findOne({ username });
    if (existingUser._id) {
        return res.status(400).json({ message: "Email is already taken / Invalid input", error  });
    }

    const user = await User.create({username, password, firstName, lastName});
    const token = jwt.sign({ id: user._id }, JWT_SECRET);
    res.json({ message: "User created successfully", token });

    // Create a new user instance
    // const newUser = new User({
    //     username,
    //     password,
    //     firstName,
    //     lastName
    // });

    // try {
    //     // Save the user to the database
    //     await newUser.save();
    //     res.status(201).json({ message: "User created successfully", user: newUser });
    // } catch (error) {
    //     res.status(500).json({ message: "Error creating user", error });
    // }
})

module.exports = router;