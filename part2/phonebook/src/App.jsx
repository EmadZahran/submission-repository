import { useState } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: '1' }
  ]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newSearch, setNewSearch] = useState('')

  const handleNewname = (event) => {
    setNewName(event.target.value)
  }

  const handleNewNumber = (event) => {
    setNewNumber(event.target.value)
  }

  const handleSearch = (event) => {
    setNewSearch(event.target.value)
  }

  const existingPerson = persons.find((person) => person.name === newName || person.number === newNumber)

  const add = (event) => {
    event.preventDefault()
    if(newName === '' || newNumber === ''){
      alert(newName ? `You cannot leave the number field blank.` : 'You cannot leave the name field blank.')
      return
    }
    if (existingPerson){
      alert(`${existingPerson.name} is already added to phonebook with ${existingPerson.number} number`)
      return
    }

    const nameObject = {
      name: newName, 
      number: newNumber,
      id: String(persons.length + 1),
    }

    setPersons(persons.concat(nameObject))
    setNewName('')
    setNewNumber('')
  }

  const filteredPersons = persons.filter((person) =>
    person.name.toLowerCase().includes(newSearch.toLowerCase())
  )

  return (
    <div>
      <h2>Phonebook</h2>

      <Filter onSearch={handleSearch} searchValue={newSearch} />

      <h3>Add a new</h3>

      <PersonForm 
        onNameChange={handleNewname}
        onNumberChange={handleNewNumber}
        newName={newName}
        newNumber={newNumber}
        onSubmit={add}
      />

      <h3>Numbers</h3>

      <Persons persons={filteredPersons} />
    </div>
  )
}

export default App
