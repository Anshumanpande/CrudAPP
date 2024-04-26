const mongoose = require("mongoose");
const db = `mongodb+srv://anshuman:test100@cluster0.0g5ddwj.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

mongoose
  .connect(db)
  .then(() => console.log("connection start"))
  .catch((error) => console.log(error.message));
