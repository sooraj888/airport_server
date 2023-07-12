const uri =
  "mongodb+srv://soorajsagar888:12345678S@cluster0.3sugc8e.mongodb.net/?retryWrites=true&w=majority";
const mongoose = require("mongoose");

const start = async () => {
  try {
    await mongoose.connect(uri);
    console.log("connected to db ");
  } catch (error) {
    console.error(error);
  }
};

start();
