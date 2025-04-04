const Filter = ({ onSearch, searchValue }) => {
    return (
      <div>
        Filter shown with <input onChange={onSearch} value={searchValue} type='search'/>
      </div>
    )
  }
  
  export default Filter
  
