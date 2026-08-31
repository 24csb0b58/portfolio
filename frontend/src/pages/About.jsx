function About() {

  return (
    <main className="about">

      <div className="about-content">

        <h1>About Me</h1>

        <p>
          Hello! I'm <span>Revati Gite</span>, a Computer Science
          student passionate about software development, problem
          solving, and creating responsive web applications.
        </p>

        <p>
          I enjoy learning new technologies and continuously improving
          my programming skills. My areas of interest include Web
          Development, Data Structures & Algorithms, and Artificial
          Intelligence.
        </p>

        <p>
          I love turning ideas into reality through code and always
          look forward to challenging projects that help me grow as
          a developer.
        </p>

        <div className="details">

          <div className="card">
            <h3>Education</h3>
            <p>B.Tech in Computer Science</p>
            <p>NIT Warangal</p>
          </div>

          <div className="card">
            <h3>Interests</h3>
            <p>Web Development</p>
            <p>Problem Solving</p>
          </div>

          <div className="card">
            <h3>Hobbies</h3>
            <p>Painting</p>
            <p>Reading Books</p>
          </div>

        </div>

      </div>

    </main>
  );
}

export default About;