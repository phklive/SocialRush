import CardUI from '../design/CardUI'

const ErrorMessage = (error: string) => {
  return (
    <CardUI>
      <p className="self-center">
        {error}
      </p>
    </CardUI>
  )
}

export default ErrorMessage
