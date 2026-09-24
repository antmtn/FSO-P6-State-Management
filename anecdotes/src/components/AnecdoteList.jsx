import { useAnecdoteActions, useAnecdotes, useNotificationActions } from "../store"

const AnecdoteList = () => {
  let anecdotes = useAnecdotes()
  const { addVote } = useAnecdoteActions()
  const { setNotification } = useNotificationActions()

  const vote = (id, content) => {
    console.log("vote", id)
    setNotification(`You voted '${content}'`)
    addVote(id)
  }

  return(
  <div>
    {anecdotes.map((anecdote) => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote.id, anecdote.content)}>vote</button>
          </div>
        </div>
      ))}
  </div>
  )
}

export default AnecdoteList