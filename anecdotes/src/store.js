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

const useAnecdoteStore = create((set, get) => ({
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
    },
    deleteAnecdote: async id => {
      const response = await anecdoteService.deleteAnecdote(id)
      set(
        state => ({
          anecdotes: state.anecdotes.filter(a => a.id !== response.id)
        })
      )
    }
    ,
    addVote: async id => {
      const anecdote = get().anecdotes.find(a => a.id === id)
      const updated = await anecdoteService.update(
        id, {...anecdote, votes: anecdote.votes + 1} 
      )
      set(
        state => ({
          anecdotes: state.anecdotes.map(anecdote =>
            anecdote.id === id ? updated : anecdote
          )
          .toSorted((a,b) => b.votes - a.votes)
        }) 
      )
    }
    ,
    setFilter: newFilter => set(
      () => ({
        filter: newFilter
      })
    ),
    initialize: async () => {
      let anecdotes = await anecdoteService.getAll()
      anecdotes = anecdotes.toSorted(
        (a,b) => b.votes - a.votes
      )
      set(() => ({ anecdotes }))
    }
  }
}))

const useNotificationStore = create((set) => ({
  notification: null,
  actions: {
    setNotification: newNotification => {
      set(() => ({ notification: newNotification }))
      setTimeout(() => {
        set(() => ({ notification: null }))
      },5000)
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
export const useNotificationActions = () => useNotificationStore(state => state.actions)
export const useNotification = () => useNotificationStore(state => state.notification)
