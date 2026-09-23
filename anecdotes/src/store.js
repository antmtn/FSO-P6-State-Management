import { create } from 'zustand'
import anecdoteService from './services/anecdotes'

const anecdotesAtStart = [
  'Placeholder'
]

const getId = () => (100000 * Math.random()).toFixed(0)

const asObject = anecdote => ({
  content: anecdote,
  id: getId(),
  votes: 0
})

const useAnecdoteStore = create((set) => ({
  anecdotes: anecdotesAtStart.map(asObject),
  filter: '',
  actions: {
    addAnecdote: async anecdote => {
      const newAnecdote = await anecdoteService.createNew(asObject(anecdote))
      set(
        state => ({
          anecdotes: state.anecdotes.concat(newAnecdote)
        })
      )
    }
    ,
    addVote: id => set(
      state => ({
        anecdotes: state.anecdotes.map(anecdote =>
          anecdote.id === id ? {...anecdote, votes: anecdote.votes +1 } : anecdote
        )
        .toSorted((a,b) => b.votes - a.votes)
      })
    ),
    setFilter: newFilter => set(
      () => ({
        filter: newFilter
      })
    ),
    initialize: async () => {
      const anecdotes = await anecdoteService.getAll()
      set(() => ({ anecdotes }))
    }
  }
}))

export const useAnecdotes = () => {
  const anecdotes = useAnecdoteStore((state) => state.anecdotes)
  const filter = useAnecdoteStore((state) => state.filter)

  console.log(filter)
  if (filter)
    return anecdotes.filter(anecdote => anecdote.content.toLowerCase().includes(filter.toLowerCase()))
  return anecdotes
}
export const useAnecdoteActions = () => useAnecdoteStore(state => state.actions)
