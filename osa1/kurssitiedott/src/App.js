const App = () => {
  const course = {
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10
      },
      {
        name: 'Using props to pass data',
        exercises: 7
      },
      {
        name: 'State of a component',
        exercises: 14
      }
    ]
  }


  let nimet = []
  let pisteet = []
  let summa = 0
  course.parts.forEach(value => {
    nimet.push(value["name"])
    pisteet.push(value["exercises"])
    summa += value["exercises"]
  })

  return (
    <>
      <Header otsikko={course.name}/>
      <Content nimet={nimet} pisteet={pisteet} />
      <Total summa={summa}/>
    </>
  )
}


const Content = (props) => {
  return (
    <div>
      <p><Part part={props.nimet[0]} points={props.pisteet[0]}/></p>
      <p><Part part={props.nimet[1]} points={props.pisteet[1]}/></p>
      <p><Part part={props.nimet[2]} points={props.pisteet[2]}/></p>
    </div>
  )
}

const Part = (props) => {
  return (
    <div>
      {props.part} {props.points}
    </div>
  )
}

const Header = (props) => {
  return(
  <div>
    <p>
      <h1>{props.otsikko}</h1>
    </p>
  </div>
  )
}

const Total = (props) => {
  return(
    <div>
      <p>Number of exercises {props.summa}</p>
    </div>
  )
}



export default App