import CardUI from '../design/CardUI'

interface ErrorMessageProps {
  message: string 
}

const ErrorMessage: React.FC<ErrorMessageProps> = ({message}) => {
  return (
    <CardUI>
      <p className="self-center">
        {message}
      </p>
    </CardUI>
  )
}

export default ErrorMessage
