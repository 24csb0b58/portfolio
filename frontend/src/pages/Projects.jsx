import { useEffect, useState } from "react";
import ProjectCard from "../components/ProjectCard";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

function Projects() {

  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        setLoading(true);
        setError(null);
        const res = await fetch(`${API_URL}/projects`);
        if (!res.ok) throw new Error("Failed to load projects");
        const data = await res.json();
        setProjects(data);
      } catch (err) {
        setError("Could not load projects. Please make sure the server is running.");
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  return (
    <main className="projects">

      <h1>My Projects</h1>

      <p className="subtitle">
        Some of the projects I have built while learning software development.
      </p>

      {loading && <p className="subtitle">Loading projects...</p>}
      {error && <p className="error">{error}</p>}

      {!loading && !error && (
        <div className="project-container">

          {projects.map((project) => (

            <ProjectCard
              key={project.id}
              id={project.id}
              title={project.title}
              description={project.description}
              techStack={project.techStack}
              image={project.image}
              github={project.github}
              live={project.live}
            />

          ))}

        </div>
      )}

    </main>
  );
}

export default Projects;