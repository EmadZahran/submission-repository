import React from 'react';

const Header = ({ courses }) => (
  <h2>{courses}</h2>
);

const Part = ({ name, exercises }) => (
  <p>
    {name} {exercises}
  </p>
);

const Content = ({ parts }) => (
  <div>
    {parts.map(part => (
      <Part key={part.id} name={part.name} exercises={part.exercises} />
    ))}
  </div>
);
const Total = ({ parts }) => {
  const total = parts.reduce((sum, part) => sum + part.exercises, 0);
  return <p><strong>Total of {total} exercises </strong></p>;
};
const Courses = ({ courses }) => {
  if (Array.isArray(courses)) {
    return (
      <div>
        {courses.map(course => (
          <div key={course.id}>
            <Header courses={course.name} />
            <Content parts={course.parts} />
            <Total parts={course.parts} />
          </div>
        ))}
      </div>
    );
  } else {
    return (
      <div>
        <Header courses={courses.name} />
        <Content parts={courses.parts} />
        <Total parts={courses.parts} />
      </div>
    );
  }
};

export default Courses;
