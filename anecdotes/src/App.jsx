import AnecdoteFilter from "./components/AnecdoteFilter"
import AnecdoteForm from "./components/AnecdoteForm"
import AnecdoteList from "./components/AnecdoteList"

const App = () => {

  return (
    <div>
      <AnecdoteFilter/>
      <h2>Anecdotes</h2>
      <AnecdoteList/>
      <AnecdoteForm/>
    </div>

  )
}

export default App
