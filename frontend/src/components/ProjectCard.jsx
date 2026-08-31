import { useState } from "react";
import { Link } from "react-router-dom";

function ProjectCard({
  id,
  title,
  description,
  techStack,
  image,
  github,
  live
}) {

  const [showDetails, setShowDetails] = useState(false);

  return (
    <div className="project-card">

      <img src={image} alt={title} />

      <div className="content">

        <h2>{title}</h2>

        <p>{description}</p>

        <h4>Tech Stack</h4>

        <div>
          {techStack.map((tech) => (
            <span key={tech}>{tech}</span>
          ))}
        </div>

        <button
          onClick={() => setShowDetails(!showDetails)}
        >
          {showDetails ? "Hide Details" : "View Details"}
        </button>

        {showDetails && (
          <p>
            This project demonstrates my practical experience
            with {techStack.join(", ")}.
          </p>
        )}

        <div className="buttons">

          <a href={github}>GitHub</a>

          <a href={live}>Live Demo</a>

          <Link to={`/projects/${id}`}>
            Details
          </Link>

        </div>

      </div>

    </div>
  );
}

export default ProjectCard;