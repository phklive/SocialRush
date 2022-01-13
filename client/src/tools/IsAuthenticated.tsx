import React from 'react'
import { gql, useQuery } from '@apollo/client'

interface IsAuthenticatedProps {
	children?: React.ReactNode
}

const IS_LOGGED_IN = gql``

const IsAuthenticated: React.FC<IsAuthenticatedProps> = ({ children }) => {
	const { loading, error, data } = useQuery(IS_LOGGED_IN)

	console.log(data)

	if (loading) return <p>loading...</p>
	if (error) return <p>{error.message}</p>

	return <>{children}</>
}

export default IsAuthenticated
