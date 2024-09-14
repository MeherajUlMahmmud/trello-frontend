const ErrorMessage = ({ errorMessage }: { errorMessage: string }) => {
	return (
		<div className='text-center text-red-500 text-sm mb-5'>
			<p>{errorMessage}</p>
		</div>
	)
}

export default ErrorMessage