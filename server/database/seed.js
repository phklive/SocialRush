import mongoose from 'mongoose'
import { User, Card } from './schemas.js'
import { v4 as uuidv4 } from 'uuid'
import bcrypt from 'bcryptjs'

const connectDB = async () => {
  try {
    await mongoose.connect('mongodb://127.0.0.1:27017/trueorfalse')
    console.log('connected to database')
  } catch (error) {
    console.log(error.message)
  }
}

const testUsers = [
  {
    id: uuidv4(),
    name: 'lelia',
    email: 'lelia@gmail.com',
    password: await bcrypt.hash('very very strong password', 10),
    score: 12,
  },
  {
    id: uuidv4(),
    name: 'poulet',
    email: 'poulet@gmail.com',
    password: await bcrypt.hash('very very strong password', 10),
    score: 3489,
  },
  {
    id: uuidv4(),
    name: 'tennis',
    email: 'tennis@gmail.com',
    password: await bcrypt.hash('very very strong password', 10),
    score: 12,
  },
]

const testCards = [
  {
    id: uuidv4(),
    title: 'testCard 2',
    text: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with dLorem Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with dLorem Iptsrr',
    answer: true,
    author: 'lelia',
  },
  {
    id: uuidv4(),
    title: 'testCard 3',
    text: 'this is the text for the testcard 3',
    answer: true,
    author: 'poulet',
  },
  {
    id: uuidv4(),
    title: 'testCard 4',
    text: 'this is the text for the testcard 4',
    answer: true,
    author: 'tennis',
  },
]


const seedDB = async () => {
  await User.deleteMany({})
  await User.insertMany(testUsers)

  await Card.deleteMany({})
  await Card.insertMany(testCards)

  await mongoose.connection.close()
  console.log('Seeding complete, disconnected from database')
}

connectDB()
seedDB()
