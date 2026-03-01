import { useMemo, useState } from "react";
import hobbiesImageUrl from "../model/assets/painting.png?url";
import {
  ABOUT_TEXT,
  BLOG_TEXT,
  FAV_FOODS,
  HOBBY_SPOTS,
  PROJECTS,
  SECTION_HEADINGS,
  TECH_STACK,
} from "../data/portfolioContent";

export default function UIOverlay({ activeSection, setActiveSection }) {
  const [activeTech, setActiveTech] = useState(TECH_STACK[0]);
  const [activeHobby, setActiveHobby] = useState(HOBBY_SPOTS[0]);

  const heading = useMemo(() => {
    return SECTION_HEADINGS[activeSection] || "";
  }, [activeSection]);

  if (!activeSection || activeSection === "resume") return null;

  return (
    <aside className="overlay-card">
      <header className="overlay-header">
        <h2>{heading}</h2>
        <button
          className="overlay-close"
          onClick={() => setActiveSection(null)}
          type="button"
        >
          Close
        </button>
      </header>

      {activeSection === "projects" && (
        <>
          <p>Click any card to jump to GitHub.</p>
          <div className="project-grid">
            {PROJECTS.map((project) => (
              <a
                key={project.name}
                className="project-card"
                href={project.href}
                target="_blank"
                rel="noreferrer"
              >
                <h3>{project.name}</h3>
                <p>{project.blurb}</p>
                <div className="stack-row">
                  {project.stack.map((item) => (
                    <span
                      key={`${project.name}-${item}`}
                      className="stack-chip"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </a>
            ))}
          </div>
        </>
      )}

      {activeSection === "about" && (
        <>
          <p>{ABOUT_TEXT[0]}</p>
          <p>{ABOUT_TEXT[1]}</p>
        </>
      )}

      {activeSection === "blogs" && (
        <>
          <p>{BLOG_TEXT}</p>
          <a
            className="hero-link"
            href="https://substack.com/@divyasahithi"
            target="_blank"
            rel="noreferrer"
          >
            Open Substack
          </a>
        </>
      )}

      {activeSection === "coding" && (
        <>
          <p>Languages and Frameworks I work with</p>
          <div className="tech-grid">
            {TECH_STACK.map((item) => (
              <button
                key={item.name}
                type="button"
                className={`tech-card ${activeTech.name === item.name ? "active" : ""}`}
                onMouseEnter={() => setActiveTech(item)}
                onFocus={() => setActiveTech(item)}
              >
                <strong>{item.name}</strong>
                <span>{item.lane}</span>
              </button>
            ))}
          </div>
          <div className="insight-panel">
            <h3>{activeTech.name}</h3>
            <p>{activeTech.detail}</p>
          </div>
        </>
      )}

      {activeSection === "hobbies" && (
        <>
          <p>When I'm not lost in bytes</p>
          <div className="hobby-row">
            {HOBBY_SPOTS.map((item) => (
              <button
                key={item.name}
                type="button"
                className={`hobby-chip ${activeHobby.name === item.name ? "active" : ""}`}
                onClick={() => setActiveHobby(item)}
              >
                {item.name}
              </button>
            ))}
          </div>
          <p className="hobby-note">{activeHobby.note}</p>
          <img
            className="hobbies-preview"
            src={hobbiesImageUrl}
            alt="Hobbies artwork"
          />
        </>
      )}

      {activeSection === "food" && (
        <>
          <p className="food-intro">Recipes that stayed with me</p>
          <div className="food-grid">
            {FAV_FOODS.map((food) => (
              <article key={food.name} className="food-card">
                <h3>{food.name}</h3>
              </article>
            ))}
          </div>
        </>
      )}
    </aside>
  );
}
