import mongoose from "mongoose";

// Connect to database

const connectToDB = () => {
  mongoose.connect(process.env.DB || 'mongodb+srv://phk:ZJqeilOJN88IjrQ1@trueorfalsedatabase.zjlxx.mongodb.net/trueorfalse?retryWrites=true&w=majority', {
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
