import React from 'react'

const ErrorMessage = ({ errorMessage }: { errorMessage: string }) => {
	return (
		<div>
			<p>{errorMessage}</p>
		</div>
	)
}

export default ErrorMessage