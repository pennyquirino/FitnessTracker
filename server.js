const express = require("express");
const morgan = require("morgan");
const mongoose = require("mongoose");
const app = express();
const PORT = process.env.PORT || 3000;


app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));
app.use(morgan("dev"));


mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/workout", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false
});

app.use(require("./routes/apiRoutes.js"));
app.use(require("./routes/htmlRoutes.js"));


app.listen(PORT, () => {
    console.log(`App is running on port ${PORT}`);
});