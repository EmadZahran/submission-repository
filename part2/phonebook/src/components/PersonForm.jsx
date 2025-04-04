const PersonForm = ({ onNameChange, onNumberChange, newName, newNumber, onSubmit }) => {
    return (
      <form onSubmit={onSubmit}>
        <div>
          name: <input onChange={onNameChange} value={newName}/>
        </div>
        <div>
          Number: <input onChange={onNumberChange} value={newNumber} type='number'/>
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
    )
  }
  
  export default PersonForm
  
