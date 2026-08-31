import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

function ProjectDetails() {

  const { projectId } = useParams();
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProject = async () => {
      try {
        setLoading(true);
        setError(null);
        const res = await fetch(`${API_URL}/projects/${projectId}`);
        if (res.status === 404) {
          setError("Project not found");
          setProject(null);
          return;
        }
        if (!res.ok) throw new Error("Failed to load project");
        const data = await res.json();
        setProject(data);
      } catch (err) {
        setError("Could not load project. Please make sure the server is running.");
      } finally {
        setLoading(false);
      }
    };

    fetchProject();
  }, [projectId]);

  if (loading) {
    return (
      <main className="project-details">
        <p>Loading...</p>
      </main>
    );
  }

  if (error || !project) {
    return (
      <main className="project-details">
        <h1>{error === "Project not found" ? "Project Not Found" : "Something Went Wrong"}</h1>
        <p>{error}</p>
        <Link to="/projects">Back to Projects</Link>
      </main>
    );
  }

  return (
    <main className="project-details">

      <h1>{project.title}</h1>

      <img
        src={project.image}
        alt={project.title}
      />

      <p>{project.description}</p>

      <h3>Technologies</h3>

      <div>
        {project.techStack.map((tech) => (
          <span key={tech}>{tech}</span>
        ))}
      </div>

      <br />

      <a href={project.github}>GitHub</a>

      <br />

      <a href={project.live}>Live Demo</a>

      <br /><br />

      <Link to="/projects">
        ← Back to Projects
      </Link>

    </main>
  );
}

export default ProjectDetails;