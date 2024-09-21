const ErrorMessage = ({ errorMessage, isError = true }: { errorMessage: string, isError?: boolean }) => {
	return (
		<div className={`text-center ${isError ? 'text-red-600' : 'text-green-600'} text-sm`}>
			<p>{errorMessage}</p>
		</div>
	)
}

export default ErrorMessage;
