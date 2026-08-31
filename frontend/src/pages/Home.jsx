import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function Home() {

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <div className="loading">
        <h2>Loading Portfolio...</h2>
      </div>
    );
  }

  return (
    <main className="hero">

      <div className="hero-text">

        <h3>Hello, I'm</h3>

        <h1>Revati Gite</h1>

        <h2>Aspiring Software Developer</h2>

        <p>
          Passionate about Web Development, DSA and Problem Solving.
          I love building beautiful and responsive websites while
          continuously learning new technologies.
        </p>

        <div className="buttons">

          <Link to="/projects" className="btn">
            View Projects
          </Link>

          <Link to="/contact" className="btn2">
            Contact Me
          </Link>

        </div>

      </div>

    </main>
  );
}

export default Home;