import { useQuery, gql } from '@apollo/client'
import React, { useState } from 'react'
import Card from '../design/Card'
import '../styles/index.css'

export const MYCARDS_QUERY = gql`
query MyCards {
  myCards {
    id
    title
    text
    answer
  }
}
`

const MyCards: React.FC = () => {
  const { loading, error, data  } = useQuery(MYCARDS_QUERY, {fetchPolicy: 'no-cache'})

  const [start, setStart] = useState(0)
  const [end, setEnd] = useState(3)

  const handlePrevious = () => {
    setStart((oldState) => oldState - 3)
    setEnd((oldState) => oldState - 3)
  }

  const handleNext = () => {
    setStart((oldState) => oldState + 3)
    setEnd((oldState) => oldState + 3)
  }

	if (loading) return <p>loading...</p>
	if (error) return <p>{error.message}</p>

	return (
		<div className="mt-10 flex flex-col">
      {data.myCards.slice(start,end).map((card: any) => (
				<Card
					key={card.id}
					id={card.id}
					title={card.title}
					text={card.text}
					answer={card.answer}
				/>
			))}
			<div className="flex flex-row gap-4">
        <button disabled={start === 0} className="accountBtn flex-1" onClick={handlePrevious}>
					Previous
				</button>
        <button disabled={end >= data.myCards.length} className="accountBtn flex-1" onClick={handleNext}>
					Next
				</button>
			</div>
		</div>
	)
}

export default MyCards
