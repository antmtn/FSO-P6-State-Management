import { useAnecdoteActions, useAnecdotes } from "../store"

const AnecdoteList = () => {
  let anecdotes = useAnecdotes()
  const { addVote } = useAnecdoteActions()

  const vote = (id) => {
    console.log("vote", id)
    addVote(id)
  }
  return(
  <div>
    {anecdotes.map((anecdote) => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote.id)}>vote</button>
          </div>
        </div>
      ))}
  </div>
  )
}

export default AnecdoteList