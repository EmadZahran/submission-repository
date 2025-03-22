import Phonebook  from '../components/Phonebook '

const Persons = ({ persons }) => {
  return (
    <div>
      {persons.map((person) => 
        <Phonebook  key={person.id} name={person.name} number={person.number}/>
      )}
    </div>
  )
}

export default Persons
