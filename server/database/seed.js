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
    password: await bcrypt.hash('lelia', 10),
    highScore: 392,
    wolf: 93,
    sheep: 23,
  },
  {
    id: uuidv4(),
    name: 'poulet',
    email: 'poulet@gmail.com',
    password: await bcrypt.hash('poulet', 10),
    highScore: 3489,
    wolf: 90,
    sheep: 2,
  },
  {
    id: uuidv4(),
    name: 'tennis',
    email: 'tennis@gmail.com',
    password: await bcrypt.hash('tennis', 10),
    highScore: 12,
    wolf: 39,
    sheep: 940,
  },
]

const testCards = [
  {
    id: uuidv4(),
    report: 0,
    title: 'testCard 2',
    text: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with dLorem Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with dLorem Iptsrr',
    answer: true,
    author: 'lelia',
    true: 48,
    false: 2,
  },
  {
    id: uuidv4(),
    report: 0,
    title: 'testCard 3',
    text: 'this is the text for the testcard 3 and it is very good and i like it hahahaha lol i really like cheese poulet on the flux ?',
    answer: true,
    author: 'poulet',
    true: 34,
    false: 49,
  },
  {
    id: uuidv4(),
    report: 0,
    title: 'testCard 4',
    text: 'Selon vous Eric Zemmour sera t-il le prochain president francais ?',
    answer: true,
    author: 'tennis',
    true: 34,
    false: 5,
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
