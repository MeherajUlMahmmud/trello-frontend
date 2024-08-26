const ErrorMessage = ({ errorMessage }: { errorMessage: string }) => {
	return (
		<div className='errorMessage'>
			<p>{errorMessage}</p>
		</div>
	)
}

export default ErrorMessage