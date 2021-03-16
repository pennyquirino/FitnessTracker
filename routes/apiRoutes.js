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


router.put("/api/workouts/:id", (req, res) => {
    console.log(req.body);
    Workout.findOneAndUpdate(
        { _id: req.params.id },
        { $push: { exercises: req.body }},
        { new: true }

    ).then((dbWorkout) => res.json(dbWorkout));
});

router.get("api/workouts", (req, res) => {
    Workout.find({})
    .sort({date: -1})
    .then((dbWorkout) => {
        res.json(dbWorkout);
    })
    .catch((err) => {
        res.status(400).json(err);
    });
});

router.get("/api/workouts/range", (req, res) => {
    Workout.aggregate ([
        {
            $addFields: {
                totaleDuration: { "$sum: $exercises.duration"},
            },
        },
    ]).sort({ date: -1})
    .limit(7)
    .then((dbWorkout) => {
        res.json(dbWorkout);
    })
    .catch((err) => {
        res.status(400).json(err);
    });
});

module.exports = router;