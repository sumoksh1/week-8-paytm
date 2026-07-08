const express= require("express");
const router = express.Router();

router.post("/users", async (req, res) => {
    const { username, password, firstName, lastName } = req.body;

    // Create a new user instance
    const newUser = new User({
        username,
        password,
        firstName,
        lastName
    });

    try {
        // Save the user to the database
        await newUser.save();
        res.status(201).json({ message: "User created successfully", user: newUser });
    } catch (error) {
        res.status(500).json({ message: "Error creating user", error });
    }
})

module.exports = router;