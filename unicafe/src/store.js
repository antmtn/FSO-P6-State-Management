import { create } from 'zustand'
import { useShallow } from 'zustand/react/shallow'

const useFeedbackStore = create(set => ({
  good:0,
  neutral:0,
  bad:0,
  total:0,
  actions: {
    addGood: () => set(state => ({ 
      good: state.good + 1,
      total: state.total + 1
    })),
    addNeutral: () => set(state => ({ 
      neutral: state.neutral + 1,
      total: state.total + 1
    })),
    addBad: () => set(state => ({ 
      bad: state.bad + 1 ,
      total: state.total + 1
    }))
  }
}))

export const useFeedback = () => useFeedbackStore(
  useShallow((state) => ({
    good: state.good,
    neutral: state.neutral,
    bad: state.bad,
    total: state.total
  })),
)

export const useFeedbackControls = () => useFeedbackStore( state => state.actions)