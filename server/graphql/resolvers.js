import { User, Card } from "../database/schemas.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

const resolvers = {
  Query: {
    users: async () => {
      return await User.find({});
    },

    cards: async () => {
      return await Card.find({});
    },

    randCard: async () => {
      const card = await Card.aggregate([{ $sample: { size: 1 } }]);
      return card[0];
    },

    leaderBoard: async () => {
      return await User.find({}).sort({ score: -1 }).limit(10);
    },

    myCards: async (_, { author }) => {
      return await Card.find({ author });
    },
  },

  Mutation: {
    register: async (_, { name, email, password }) => {
      const existingUser = await User.findOne({ name });

      if (existingUser) {
        throw new Error("Username already exists.");
      }

      const existingEmail = await User.findOne({ email });

      if (existingEmail) {
        throw new Error("Email already in use.");
      }

      const newUser = new User({
        name,
        email,
        password: await bcrypt.hash(password, 10),
        score: 0,
      });

      const user = await newUser.save();

      return jwt.sign(
        {
          id: user._id,
          email: user.email,
        },
        process.env.JWT_SECRET,
        {
          expiresIn: "1h",
        }
      );
    },

    login: async (_, { email, password }) => {
      const user = await User.findOne({ email });

      if (!user) {
        throw new Error("Credentials are incorrect...");
      }

      const passwordMatch = await bcrypt.compare(password, user.password);

      if (!passwordMatch) {
        throw new Error("Credentials are incorrect...");
      }

      return jwt.sign(
        {
          id: user._id,
          email: user.email,
        },
        process.env.JWT_SECRET,
        {
          expiresIn: "1h",
        }
      );
    },

    newCard: async (_, { title, text, answer, author }) => {
      const newCard = new Card({
        title,
        text,
        answer,
        author,
      });
      const res = await newCard.save();
      return res;
    },

    addScore: async (_, { name }) => {
      const user = await User.findOneAndUpdate(
        { name },
        { $inc: { score: 1 } },
        { new: true }
      );
      return user;
    },
  },
};

export default resolvers;
