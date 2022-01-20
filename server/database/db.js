import mongoose from "mongoose";

// Connect to database

const connectToDB = () => {
  mongoose.connect(process.env.DB || 'mongodb://127.0.0.1:27017/trueorfalse', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  const dataBase = mongoose.connection;
  dataBase.once("open", (_) => {
    console.log("Database connected:", process.env.DB);
  });

  dataBase.on(
    "error",
    console.error.bind(console, "MongoDB connection error:")
  );
};

export default connectToDB;
