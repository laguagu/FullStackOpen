import { useState } from 'react'

const Button = (props) => {
  const {teksti,klikkaus} = props
  return(
  <button onClick={klikkaus}>
    {teksti}
  </button>
  )
}

const Display = ({teksti,eniten,voittaja}) => {
  return (
    <div>
      <h1>{teksti}</h1>
      {eniten > 0 && <p>{voittaja}</p>}
    </div>
  )
}

const StatisticLine = (props) => {
  return(
    <table>
      <tbody>
        <tr>
          <td>{props.text} {props.value} {props.merkki}</td>
        </tr>
      </tbody>
     </table>
  )
}


const Statistics = (props) => {
  const {good,neutral,bad,all,avg,positive} = props
  if (all >= 1) {
    return (
      <div>
        <StatisticLine text="Good" value ={good} />
        <StatisticLine text="Neutral" value ={neutral} />
        <StatisticLine text="Bad" value ={bad} />
        <StatisticLine text="All" value ={all} />
        <StatisticLine text="Avarage" value ={avg} />
        <StatisticLine text="Positive" value ={positive} merkki={"%"} />
      </div>
    )
  } else {
    return (
      <div>
        <p>No feedback given</p>
      </div>
    )
  }
}

const Anecdotes = (props) => {
  const {click,vote,teksti,numero} = props
  return(
  <div>
    <p>{teksti}</p>
    <p>Has {numero} votes</p>
    <button onClick={click}> Anacdotes </button>
    <button onClick={vote}>Vote</button>
  </div>
  )
}
const App = () => {
  // tallenna napit omaan tilaansa
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const [valittu, asetaValittu] = useState(1)
  const [numero, setNumero] = useState(new Uint8Array(10))

 
 
  const all = good + bad + neutral
  const keskiArvo = (good - bad) / all
  const positive = good / all * 100
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when dianosing patients.'
  ]
  const eniten = numero.indexOf(Math.max(...numero))
  const suosituinSana = anecdotes[eniten]
  const randomAnacdote = () => {
    const random = () => {
      // Generoi randomin numeron väliltä 1-7
      let numero = Math.floor(Math.random()*anecdotes.length)
      asetaValittu(numero)
    }
    return random
  }

  const pisteet = (numero) => {
    const laske = () => {
      let copy = [...numero]
      copy[valittu]++
      setNumero(copy)
    }
    return laske
  }

  const klikki = (arvo) => {
    const testi = () => {
      setGood(arvo + 1)
    }
    return testi
  }


  return (
    <div>
      <Display teksti={"Give feedback"} />
      <Button teksti={"Good"} klikkaus={klikki(good)}/>
      <Button teksti={"Neutral"} klikkaus={() => setNeutral(neutral+1)}/>
      <Button teksti={"Bad"} klikkaus={() => setBad(bad+1)}  />
      <Display teksti={"Statistics"} />
      <Statistics good={good} neutral={neutral} bad={bad} all={all} avg={keskiArvo} 
      positive={positive}/>
      <Display teksti={"Anecdotes"} />
      <Anecdotes teksti={anecdotes[valittu]} click={randomAnacdote()} vote={(pisteet(numero))}
      numero={numero[valittu]}/>
      <Display teksti={"Anecdote with most votes"} eniten={eniten} voittaja={suosituinSana} />
    </div>
  )
}

export default App