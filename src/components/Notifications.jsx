const Notification = ({ message, notifType }) => {

	const notifGreen = {
		color: 'green',
		backgroundColor: 'lightgrey',
		borderColor: 'darkgreen',
		border: '5px solid green',
		borderRadius: '3px',
		margin: '5px',
		padding: "15px",
		fontSize: '20px'
	}
	const notifRed = {
		color: 'red',
		backgroundColor: 'lightgrey',
		borderColor: 'red',
		border: '5px solid red',
		borderRadius: '3px',
		margin: '5px',
		padding: "15px",
		fontSize: '20px'
	}

	return (
		<div style={notifType ? notifGreen : notifRed}>
			{message}
		</div>
	)
}

export default Notification