import { useEffect, useState } from "react"
import Filter from "./components/Filter"
import PersonForm from "./components/PersonForm"
import Persons from "./components/Persons"
import axios from "axios"
import phonebookServices from './services/persons'
import Notification from "./components/Notifications"

function App() {

  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [searchInput, setSearchInput] = useState('')

  //handles notification feature
  const [ goNotify, setGoNotify] = useState('')
  const [ notifActive, setNotifActive] = useState(false)
  const [ isSuccess, setIsSuccess] = useState(false)

  //Fetch data from the server
  useEffect(() => {
    phonebookServices
      .getAll()
      .then(phonebookRecords => {
        setPersons(phonebookRecords)
      })
  }, [])

  //Function notification timer to turn off
  function notifTimerOff() {
    setTimeout(() => {
      setGoNotify(null)
      setNotifActive(false)
      setIsSuccess(false)
  }, 2000)
  }

  const addPhonebook = (event) => {
    event.preventDefault()
    const matchedNames = persons.filter(person => person.name.toLowerCase() === newName.toLowerCase());
    //Converting array value into data type number
    const matchedIdsString = matchedNames.map(person => person.id).join(',');
    const personId = parseInt(matchedIdsString, 10)

    const newPhonebookObject = {
      name: newName,
      number: newNumber,
      id: persons.length + 1
}

      if (matchedNames.length > 0 ){
        const confirmed = window.confirm(newName + " is already added to the phonebook, replace the old number with a new one?")
          if(confirmed){
            const phonebook = persons.find(person => person.id === personId)
            const changedNumber = {...phonebook, number: newNumber}
            phonebookServices
              .update(personId, changedNumber)
              .then(returnedPhonebook => {
                setPersons(persons.map(person => person.id !== personId ? person : returnedPhonebook))
                setNotifActive(true)
                setGoNotify(
                  `${changedNumber.name} number has been changed`
                )
                setIsSuccess(true)
                notifTimerOff()
              })
              .catch (error => {
                setGoNotify(
                  `Information of ${phonebook.name} has already been removed from server`
                )
                setNotifActive(true)
                notifTimerOff()
                setPersons(persons.filter(person => person.id !== personId))
              })
          }

      } else {
      phonebookServices
        .create(newPhonebookObject)
        .then(phonebookRecords => {
          setPersons(persons.concat(phonebookRecords))
        })
        setGoNotify(
          `${newName} is added to the phonebook`
        )
        setNotifActive(true)
        setIsSuccess(true)
        notifTimerOff()
    }
    setNewName('')
    setNewNumber('')
  }

  const toggleSelectedDeletionOf = id => {
    const deletedPerson = persons.find(person => person.id === id)
    phonebookServices
      .remove(id)
      .then(()=> {
        setPersons(newPersonObjects => newPersonObjects.filter(person => person.id !== id))
        setGoNotify(
          `${deletedPerson.name} is removed from the server`
        )
        setNotifActive(true)
        notifTimerOff()
      })
      .catch(error => 
        window.alert('Problem occur to the server'))
  }

  const handlerInputPhonebook = (event) => {
    setNewName(event.target.value)
  }
  const handlerInputNumber = (event) => {
    setNewNumber(event.target.value)
  }

  const handlerPhonebookFilter = (event) => {
    setSearchInput(event.target.value)
  }

  const personsToShow = persons.filter(person => person.name.toLowerCase().includes(searchInput.toLowerCase()))
  
  return(
    <>
    <div>
      <h2>Phonebook</h2>
        {notifActive ?
          <Notification message={goNotify} notifType ={isSuccess}/> 
          :
          null
        }
        <Filter value={searchInput} onChange={handlerPhonebookFilter}/>
      <h2>add new</h2>
        <PersonForm
        addPhonebook={addPhonebook}
        newName={newName}
        newNumber={newNumber}
        handlerInputNumber={handlerInputNumber}
        handlerInputPhonebook={handlerInputPhonebook}
        />
      <h2>Numbers</h2>
        {personsToShow
          .map(person => (
            <Persons 
            key={person.id} 
            name={person.name} 
            number={person.number}
            toggleDelete={() => toggleSelectedDeletionOf(person.id)}
            />
          ))
        }
    </div>

    </>
  )
  
}

export default App
