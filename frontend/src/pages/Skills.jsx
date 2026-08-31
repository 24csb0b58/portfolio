const skills = [
  {
    title: "Programming",
    items: ["C", "C++", "Java", "Python"]
  },
  {
    title: "Web Development",
    items: ["HTML5", "CSS3", "JavaScript", "Responsive Design"]
  },
  {
    title: "Database",
    items: ["MySQL", "SQL"]
  },
  {
    title: "Tools",
    items: ["Git", "GitHub", "VS Code", "Canva"]
  },
  {
    title: "Core Subjects",
    items: ["Data Structures", "Algorithms", "OOP", "DBMS"]
  },
  {
    title: "Soft Skills",
    items: ["Problem Solving", "Communication", "Teamwork", "Quick Learner"]
  }
];

function Skills() {

  return (
    <main className="skills">

      <h1>My Skills</h1>

      <p className="subtitle">
        Technologies and tools I use to build modern applications.
      </p>

      <div className="skills-container">

        {skills.map((skill) => (

          <div className="skill-card" key={skill.title}>

            <h2>{skill.title}</h2>

            <ul>

              {skill.items.map((item) => (
                <li key={item}>{item}</li>
              ))}

            </ul>

          </div>

        ))}

      </div>

    </main>
  );
}

export default Skills;