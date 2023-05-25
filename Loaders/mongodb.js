const mongoose = require("mongoose");

async function startDB() {
  await mongoose.connect(
    "mongodb+srv://usuario:GJZKbBS9u5rEG0Fl@cluster0.zt4vdbg.mongodb.net/?retryWrites=true&w=majority"
  );
}

module.exports = startDB;
