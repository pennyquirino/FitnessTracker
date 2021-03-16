const router = require("express").Router();
const Workout = require("../models/Workout");


router.post("/api/workouts", (req, res) => {
    Workout.create(req.body)
    .then((dbWorkout) => {
        res.json(dbWorkout);
    })
    .catch( (err) => {
        res.status(400).json(err);
    });
});