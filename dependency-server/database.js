const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/dependency", { useNewUrlParser: true });

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", function() {
  console.log("is Open!!");
});

const dependencySchema = new mongoose.Schema({
  name: String,
  data: String
});

const Dependency = mongoose.model("Dependency", dependencySchema);

const react = new Dependency({
  name: "react",
  data: JSON.stringify(require("./dist/react.json"))
});

react.save((error, depen) => {
  if (error) return console.error(error);
  console.log(depen);
});
