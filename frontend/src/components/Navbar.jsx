import { NavLink } from "react-router-dom";

function Navbar({ theme, setTheme }) {

  return (
    <header>
      <nav>

        <div className="logo">
          Portfolio
        </div>

        <ul>

          <li>
            <NavLink to="/home">Home</NavLink>
          </li>

          <li>
            <NavLink to="/about">About</NavLink>
          </li>

          <li>
            <NavLink to="/skills">Skills</NavLink>
          </li>

          <li>
            <NavLink to="/projects">Projects</NavLink>
          </li>

          <li>
            <NavLink to="/contact">Contact</NavLink>
          </li>

          <li>
            <button
              className="theme-btn"
              onClick={() =>
                setTheme(theme === "light" ? "dark" : "light")
              }
            >
              {theme === "light" ? "🌙" : "☀️"}
            </button>
          </li>

        </ul>

      </nav>
    </header>
  );
}

export default Navbar;