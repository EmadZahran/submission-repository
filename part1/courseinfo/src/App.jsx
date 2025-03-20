const Header = ({course}) => {
  return (
    
    <p>
    course: {course}
    </p>
  
  )
}
const Part = ({number, part, exercises }) => {

  return (
 
      <p>
        part{number}: {part}, number of exercises {exercises}
      </p>
  
  )
}

const Content = ({items}) => {

  return (
 
    <div>
    <Part number = {items[0].number} part = {items[0].part} exercises = {items[0].exercises}/>
    <Part number = {items[1].number} part = {items[1].part} exercises = {items[1].exercises}/>
    <Part number = {items[2].number} part = {items[2].part} exercises = {items[2].exercises}/>
    </div>
  
  )
}
const Total = ({exercises}) => {
  return (
   
    <p>
    Total number of exercises: {exercises}
    </p>
 
  )
}
const App = () => {


  const items = [
    { part: 'Fundamentals of React', exercises: 10, number: 1 },
    { part: 'Using props to pass data', exercises: 7, number: 2},
    { part: 'State of a component', exercises: 14, number: 3},
  ]
  const course = 'Half Stack application development'
  const exercises1 = 10
  const exercises2 = 7
  const exercises3 = 14



  return (
    <div>
      <Header course = {course}/>
      <Content items = {items}/>
      <Total exercises = {exercises1 + exercises2 + exercises3} />
    </div>
  )
}

export default App
