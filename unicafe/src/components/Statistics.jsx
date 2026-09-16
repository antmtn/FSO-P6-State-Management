import { useFeedback } from "../store"

const Statistics = () => {
  const { good, neutral, bad, total } = useFeedback()
  const average = (good - bad)/total
  const positive = (good/total) * 100
  
  return (
    <div>
      <h2>statistics</h2>
      <table>
        <tbody>
          <tr><td>good</td><td>{good}</td></tr>
          <tr><td>neutral</td><td>{neutral}</td></tr>
          <tr><td>bad</td><td>{bad}</td></tr>
          <tr><td>all</td><td>{total}</td></tr>
          <tr><td>average</td><td>{average.toFixed(2)}</td></tr>
          <tr><td>positive</td><td>{positive.toFixed(2)} %</td></tr>
        </tbody>
      </table>
    </div>
  )
}

export default Statistics
