import { useAnecdoteActions, useNotificationActions } from "../store"

const AnecdoteForm = () => {
  const { addAnecdote } = useAnecdoteActions()
  const { setNotification } = useNotificationActions()
  
  const handleNewAnecdote = (e) => {
    e.preventDefault()
    const content = e.target.anecdote.value
    addAnecdote(content)
    e.target.reset()
    setNotification(`You added '${content}'`)
  }

  return(
  <div>
    <h2>create new</h2>
    <form onSubmit={handleNewAnecdote}>
      <div>
        <input data-testid="new" name='anecdote'/>
      </div>
      <button type='submit'>create</button>
    </form>
  </div>
  )
}

export default AnecdoteForm