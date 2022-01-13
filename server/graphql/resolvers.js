const { User, Card } = require("../database/schemas");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const resolvers = {
  Query: {
    me: async (_, args, { user }) => {
      if (!user) {
        throw new Error("You are not authenticated!");
      }
      return await User.findById(user.id);
    },
    users: async (_, args, { user }) => {
      console.log(user);
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
          expiresIn: "30d",
        }
      );
    },

    login: async (_, { email, password }) => {
      const user = await User.findOne({ email });

      if (!user) {
        throw new Error("Login error...");
      }

      const passwordMatch = await bcrypt.compare(password, user.password);

      if (!passwordMatch) {
        throw new Error("Login error...");
      }

      return jwt.sign(
        {
          id: user._id,
          email: user.email,
        },
        process.env.JWT_SECRET,
        {
          expiresIn: "30d",
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

module.exports = resolvers;
