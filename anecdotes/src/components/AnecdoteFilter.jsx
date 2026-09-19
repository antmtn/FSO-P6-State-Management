import { useAnecdoteActions } from "../store"

const AnecdoteFilter = () => {
  const { setFilter } = useAnecdoteActions()

  const handleFilter = e => {
    setFilter(e.target.value)
  }

  return (
    <div>
      <label>
        filter
        <input onChange={handleFilter}></input>
      </label>
    </div>
  )
}

export default AnecdoteFilter