import { useState } from 'react'
const Button = (props) => (
  <button onClick={props.onClick}>
    {props.text}
  </button>
);
const Mostvote = (props) => {
  if (props.votes === 0) {
    return (
      <p>No votes yet</p>
    );
  }
  
  return (
    <div>
    <p>{props.anecdotes[props.votes.indexOf(Math.max(...props.votes))]}</p>
    <p>Has {Math.max(...props.votes)} votes</p>
  </div>
  );
};
const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    'The only way to go fast, is to go well.'
  ]
  
  const [selected, setSelected] = useState(0)
  const [votes, setVotes] = useState(Array(anecdotes.length).fill(0))
 
  const handleVote = () => {
    const copy = [...votes]
    copy[selected] += 1
    setVotes(copy)
  }
  const handleNext = () => {
    const randomanecdote= Math.floor(Math.random() * anecdotes.length)
    setSelected(randomanecdote)
  }

  
  
  return (
    <div>
      <h2>Anecdote of the day</h2>
      <p>{anecdotes[selected]}</p>
      <p>has {votes[selected]} votes</p>
      <Button onClick={handleVote} text="vote" />
      <Button onClick={handleNext} text="next anecdote" />
            <h2>Anecdote with most votes</h2>
      <Mostvote votes = {votes}  anecdotes = {anecdotes}/>
    </div>
  )
}

export default App
