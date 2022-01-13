import React from 'react'
import '../styles/index.css'

interface CardUIProps {
	children: any
}

const CardUI: React.FC<CardUIProps> = ({ children }) => {
	return (
		<div className="center shadow-2xl shadow-black bg-slate-300 p-2 max-h-fit w-1/2 rounded-xl flex flex-col border-gray-400 border-4">
			{children}
		</div>
	)
}

export default CardUI
