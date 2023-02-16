// Komponentti tulostaa kurssinimet ja pisteet kurssilta.
const Course = ({ kurssi }) => {
  // kurssinimet ja pisteet
  const kurssiNimet = kurssi.parts.map((element) => (
    <li key={element.id}>
      {element.name} {element.exercises}
    </li>
  ));

  const total = kurssi.parts.reduce((sum, order) => {
    return sum + order.exercises;
  }, 0);

  return (
    <div>
      <h1>{kurssi.name}</h1>
      {kurssiNimet}
      <h2>Total of {total} exercises</h2>
    </div>
  );
};

export default Course;
