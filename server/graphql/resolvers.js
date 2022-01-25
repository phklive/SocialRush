import {User, Card} from "../database/schemas.js";
import bcrypt from "bcryptjs";
import {v4 as uuidv4} from 'uuid'

const resolvers = {
  Query: {
    isAuth: async (_, args, {req}) => {

      if (!req.session.user) {
        return false
      }

      return true
    },

    getUser: async (_, args, {req}) => {
      if (!req.session.user) throw new Error('You are not authenticated!')

      return await User.findOne({id: req.session.user.id})
    },

    getUsers: async (_, args, {req}) => {
      return await User.find({});
    },

    getCards: async () => {
      return await Card.find({});
    },

    getRandomCard: async () => {
      const card = await Card.aggregate([{$sample: {size: 1}}]);
      return card[0];
    },

    getLeaderBoard: async () => {
      return await User.find({}).sort({score: -1}).limit(10);
    },

    getUserCards: async (_, args, {req}) => {
      if (!req.session.user) throw new Error('You are not authenticated!')

      return await Card.find({author: req.session.user.name}).sort({_id: -1})
    },

    getUserRanking: async (_, args, {req}) => {
      if (!req.session.user) throw new Error('You are not authenticated!')

      const users = await User.find({}).sort({highScore: -1})

      const user = users.findIndex((user) => user.name === req.session.user.name) + 1 

      return user
    }
  },

  Mutation: {
    registerUser: async (_, {name, email, password}, {req}) => {
      const existingUser = await User.findOne({name});

      if (existingUser) {
        throw new Error("Username already exists.");
      }

      const existingEmail = await User.findOne({email});

      if (existingEmail) {
        throw new Error("Email already in use.");
      }

      const newUser = new User({
        id: uuidv4(),
        name,
        email,
        password: await bcrypt.hash(password, 10),
        highScore: 0,
        wolf: 0,
        sheep: 0,
      });

      const user = await newUser.save()

      const res = {
        name: user.name,
        email: user.email,
        id: user.id,
      }

      req.session.user = res

      return true
    },

    loginUser: async (_, {email, password}, {req}) => {
      const user = await User.findOne({email});

      if (!user) {
        throw new Error("Credentials are incorrect...");
      }

      const passwordMatch = await bcrypt.compare(password, user.password);

      if (!passwordMatch) {
        throw new Error("Credentials are incorrect...");
      }

      const res = {
        name: user.name,
        email: user.email,
        id: user.id,
      }

      req.session.user = res

      return true
    },

    logoutUser: async (_, args, {req}) => {
      if (!req.session.user) throw new Error('You are not authenticated!')

      req.session.destroy()

      return true
    },

    createCard: async (_, {title, text, answer}, {req}) => {
      if (!req.session.user) {
        throw new Error('You are not authenticated!')
      }

      const newCard = new Card({
        id: uuidv4(),
        report: 0,
        title,
        text,
        author: req.session.user.name,
        true: answer === true ? 1 : 0,
        false: answer === false ? 1 : 0,
      });

      return await newCard.save();
    },

    deleteCard: async (_, {id}) => {
      return Card.findOneAndDelete({id})
    },

    gameFinished: async (_, {score, wolf, sheep}, {req}) => {
      if (!req.session.user) {
        throw new Error('You are not authenticated!')
      }
      const user = await User.findOne({id: req.session.user.id})

      if (user.highScore > score) return User.findOneAndUpdate({id: req.session.user.id}, {$inc: { wolf: wolf, sheep: sheep }}, {new: true})

      return User.findOneAndUpdate({id: req.session.user.id}, {$inc: {highScore: score, wolf: wolf, sheep: sheep }}, {new: true}) 
    },

    addCardReport: async (_, {id}) => {
      const card = await Card.findOneAndUpdate({id}, {$inc: {report: 1}}, {new: true})
      return card
    },

    addCardAnswer: async (_, {id, bool}) => {
      if (bool === true) return await Card.findOneAndUpdate({id}, {$inc: {true: 1}}, {new: true})
      if (bool === false) return await Card.findOneAndUpdate({id}, {$inc: {false: 1}}, {new: true})
    },

  },
};

export default resolvers;
