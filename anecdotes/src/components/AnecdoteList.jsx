import { useAnecdoteActions, useAnecdotes, useNotificationActions } from "../store"

const AnecdoteList = () => {
  let anecdotes = useAnecdotes()
  const { addVote, deleteAnecdote } = useAnecdoteActions()
  const { setNotification } = useNotificationActions()

  const vote = (id, content) => {
    console.log("vote", id)
    setNotification(`You voted '${content}'`)
    addVote(id)
  }

  const handleDelete = (id, content) => {
    setNotification(`You deleted '${content}'`)
    deleteAnecdote(id)
  }

  return(
  <div>
    {anecdotes.map((anecdote) => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote.id, anecdote.content)}>vote</button>
            {anecdote.votes == 0 && 
            <button onClick={() => handleDelete(anecdote.id, anecdote.content)}>delete</button>
            }
          </div>
        </div>
      ))}
  </div>
  )
}

export default AnecdoteList