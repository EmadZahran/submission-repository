import Phonebook  from './Phonebook'
const Persons = ({ persons, deletePerson  }) => {
  return (
    <div>
      {persons.map((person) => (
        <div key={person.id} style={{ display: 'flex', alignItems: 'center', marginBottom: '8px' }}>
        <Phonebook  key={person.id} name={person.name} number={person.number}/>
        <button onClick={() => deletePerson(person.id)}>Delete</button>
        </div>
)

      )}
    </div>
  )
}

export default Persons
