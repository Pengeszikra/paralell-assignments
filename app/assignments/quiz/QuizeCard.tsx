export const QuizeCard = ({category, question, answers = []}) => {
  return (
    <section className="card">
      <h1>{category}</h1>
      <p>{question}</p>
      {answers.map((answer, key) => <button key={key}>{answer}</button>)}
    </section>
  )
}