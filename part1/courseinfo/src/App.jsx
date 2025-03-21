const Header = (props) => {
  return (
    <p>
      course: {props.course}
    </p>
  );
};

const Part = (props) => {
  return (
    <div>
      Part {props.number}: {props.part}, number of exercises: {props.exercises}
    </div>
  );
};

const Content = (props) => {
  return (
    <div>
      {props.parts.map((part, num) => (
        <Part number={num + 1} part={part.name} exercises={part.exercises} />
      ))}
    </div>
  );
};

const Total = (props) => {
  return (
    <p>
      Total number of exercises: {props.total}
    </p>
  );
};

const App = () => {
  const course = 'Half Stack application development';
  const parts = [
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
  ];

  let total = 0;
  parts.forEach(part => {
    total += part.exercises;
  });

  return (
    <div>
      <Header course={course} />
      <Content parts={parts} />
      <Total total={total} />
    </div>
  );
};

export default App;
