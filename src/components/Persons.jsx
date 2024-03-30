const Persons = ({name, number, toggleDelete}) => {
	
	return(
		<div>
				{ name+ " " +number + " " }
			<button onClick={toggleDelete}>
				delete
			</button>
		</div>
	)
}
export default Persons