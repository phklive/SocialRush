import CardUI from "../design/CardUI"
import {useNavigate} from 'react-router-dom'

const NotFound: React.FC = () => {
  const navigate = useNavigate()
  return (
    <CardUI>
    <h1 className="cardTitle">404 - Page not found...</h1>
      <button className="mt-9 text-3xl self-center hover:text-blue-800" onClick={() => {navigate('/')}}>
      Go back to home
      </button>
    </CardUI>
  )
}

export default NotFound
