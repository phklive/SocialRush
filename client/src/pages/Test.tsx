import React from 'react'
import { gql, useQuery } from '@apollo/client'

const TEST_QUERY = gql`
	query Query {
		test
	}
`

const Test: React.FC = () => {
	const { loading, error, data } = useQuery(TEST_QUERY)

	if (loading) return <p>loading...</p>
	if (error) return <p>{error.message}</p>

	return (
		<>
			<h1>{data.test}</h1>
		</>
	)
}

export default Test
