  import { useState , useEffect } from 'react'
  import Filter from './components/Filter'
  import PersonForm from './components/PersonForm'
  import './index.css'
  import Persons from './components/Persons'
  import PersonsService from './services/persons'
  const Notification = ({ deleteMessage, addMessage , changeMessage , removeMessage}) => {

  if (deleteMessage){
    return (
      
      <div className='delete'>
        {deleteMessage}
      </div>
    )
  } else if (addMessage){
    return (
    <div className='add'>
        {addMessage}
      </div>

    ) 
  }else if (changeMessage){
    return (
    <div className='change'>
        {changeMessage}
      </div>

    ) 
  }else if (removeMessage){
    return (
    <div className='delete'>
        {removeMessage}
      </div>

    ) 
  }
  return null; 
  }
    
  const App = () => {
    const [persons, setPersons] = useState([])
    const [newName, setNewName] = useState('')
    const [newNumber, setNewNumber] = useState('')
    const [newSearch, setNewSearch] = useState('')
    const [deleteMessage, setDeleteMessage] = useState('')
    const [addMessage, setAddMessage] = useState('')
    const [changeMessage, setChangeMessage] = useState('')
    const [removeMessage, setRemoveMessage] = useState('')
    const hook = () => {
      PersonsService
      .getAll()
      .then(initialPersons => {
        setPersons(initialPersons)
    })

    }
    
  useEffect(hook, [])
    console.log('render', persons.length, 'notes')
    const handleNewname = (event) => {
      setNewName(event.target.value)
    }

    const handleNewNumber = (event) => {
      setNewNumber(event.target.value)
    }

    const handleSearch = (event) => {
      setNewSearch(event.target.value)
    }

    const existingPerson = persons.find((person) => person.name === newName)

    const add = (event) => {
      event.preventDefault()
      if(newName === '' || newNumber === ''){
        alert(newName ? `You cannot leave the number field blank.` : 'You cannot leave the name field blank.')
        return
      }
      if (existingPerson){
        if(existingPerson.number === newNumber){
          alert('This data has been previously saved')
          return
        } else {

        
        const Numbertochange = persons.find(p => p.id === existingPerson.id)
      
        const changedNumber = { ...Numbertochange, number: newNumber }
        if (window.confirm(`${existingPerson.name} is already added to phonebook with ${existingPerson.number} number, Do you want to replace it with the new number ${newNumber}?`)) {
          
            PersonsService
            .update(Numbertochange.id, changedNumber)  
            .then(returnedPerosn => {
              setPersons(persons.map(person => person.id === Numbertochange.id ? returnedPerosn : person))
          
            setChangeMessage(
              `The data for ${newName} has been changed`
            )
            setTimeout(() => {
              setChangeMessage('')
            }, 5000)
            }).catch(error => {
              setRemoveMessage(
                `Information of ${Numbertochange.name} has already been removed from server`
              )
              setPersons(persons.filter(p => p.id !== Numbertochange.id))
              setTimeout(() => {
                setRemoveMessage('')
              }, 5000)
            })

            
        } 
        return
  }
    
      }

      const nameObject = {
        name: newName, 
        number: newNumber,
        id: String(persons.length + 1),
      }
      PersonsService
      .create(nameObject)
      .then(returnedNote => {
      setPersons(persons.concat(returnedNote))
      setNewName('')
      setNewNumber('')
    
      

      })
      setAddMessage(
        `${newName} has been added`
      )
      setTimeout(() => {
        setAddMessage('')
      }, 5000)
      
    }

    const filteredPersons = persons.filter((person) =>
      person.name.toLowerCase().includes(newSearch.toLowerCase())
    )
    const deletePerson = (id) => {
      const persontodelete = persons.find(p => p.id === id)

      if (window.confirm(`Delete ${persontodelete.name} ?`)) {
        
          PersonsService
          .remove(persontodelete.id)  
          .then(() => {
            setPersons(persons.filter(p => p.id !== id))
          
          });
          setDeleteMessage(
            `${persontodelete.name} has been deleted`
          )
          setTimeout(() => {
            setDeleteMessage('')
          }, 5000)
      }
    }
    return (
      <div>
        <h2>Phonebook</h2>
        <Notification deleteMessage = {deleteMessage} addMessage= {addMessage} changeMessage = {changeMessage} removeMessage = {removeMessage}/>
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

        <Persons persons={filteredPersons} deletePerson={deletePerson} />


      </div>
    )
  }

  export default App
