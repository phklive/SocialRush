import { User, Card } from "../database/schemas.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { v4 as uuidv4 } from 'uuid'

const resolvers = {
  Query: {
    user: async (_, args, { req }) => {
      if (!req.user) {
        throw new Error("You are not authenticated!")
      }
      return await User.findOne({ name: req.user.name })
    },

    users: async () => {
      return await User.find({});
    },

    card: async (_, { title }) => {
      const card = await Card.findOne({ title })
      if (!card) {
        throw new Error("Card not found.")
      }
      return card
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

    myCards: async (_, { offset, limit }, { req }) => {
      if (!req.user) {
        throw new Error("You are not logged in!")
      }
      return await Card.find({ author: req.user.name })
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
        id: uuidv4(),
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
          name: user.name
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
          name: user.name
        },
        process.env.JWT_SECRET,
        {
          expiresIn: "1h",
        }
      );
    },

    newCard: async (_, { title, text, answer }, { req }) => {
      if (!req.user) {
        throw new Error("You are not authenticated!")
      }
      const newCard = new Card({
        id: uuidv4(),
        title,
        text,
        answer,
        author: req.user.name,
      });
      return await newCard.save();

    },

    modifyCard: async (_, { id, title, text, answer }) => {
      return Card.findOneAndUpdate({ id }, { title, text, answer }, { new: true })
    },

    deleteCard: async (_, { id }) => {
      return Card.findOneAndDelete({ id })
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
