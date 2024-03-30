const PersonForm = ({addPhonebook, newName, newNumber, handlerInputPhonebook, handlerInputNumber}) => {
	return (
		<div>
		<form onSubmit={addPhonebook}>
			<div>
			name: <input value={newName} onChange={handlerInputPhonebook}/>
			</div>
			<div>
			number: <input value={newNumber} onChange={handlerInputNumber}/>
			</div>
			<div>
			<button type="submit">add</button>
			</div>
		</form>
		</div>
	)
}
export default PersonForm