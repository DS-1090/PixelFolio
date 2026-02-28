import { useMemo, useState } from "react";
import hobbiesImageUrl from "../model/assets/painting.png?url";

const PROJECTS = [
  {
    name: "EzyAid",
    stack: ["Flutter", "Django", "PySpark", "SQL"],
    href: "https://github.com/DS-1090/EzyAid",
    blurb:
      "Real-time, accessible welfare discovery platform with event-driven architecture.",
  },
  {
    name: "Indian Pattern Classifier",
    stack: ["TensorFlow", "Python"],
    href: "https://github.com/DS-1090/Indian_Pattern_Classifier",
    blurb:
      "Custom CNN for Pattern classification; leveraged ResNet, EfficientNet.",
  },
  {
    name: "Blaze Buddy",
    stack: ["Flutter", "Firebase"],
    href: "https://github.com/DS-1090/mini_project",
    blurb: "IoT fire alert system with real-time cloud notifications.",
  },
];
const TECH_STACK = [
  {
    name: "Java",
    lane: "Backend",
    detail: "Scalable, OOP-driven backend systems and services.",
  },
  {
    name: "Spring Boot",
    lane: "Backend",
    detail: "REST APIs, OAuth2 security, and microservice architecture.",
  },
  {
    name: "Django",
    lane: "Backend",
    detail: "Rapid API development with clean MVC structure.",
  },
  {
    name: "Flutter",
    lane: "Mobile",
    detail: "Cross-platform Android and iOS applications.",
  },
  {
    name: "TensorFlow",
    lane: "Machine Learning",
    detail: "Deep learning models for vision and classification.",
  },
];
const HOBBY_SPOTS = [
  {
    name: "Poetry & Creative Writing",
    note: "Turning my 12 am muses into rhythm and hidden letters.",
  },
  {
    name: "Indian Art & Craft",
    note: "Honouring the indian in me with colors, motifs and raagas.",
  },
  {
    name: "Nature Strolls & Gardening",
    note: "Tending to my green thumb and chasing winged angels in the backyard.",
  },
  {
    name: "Cultural Travel",
    note: "Backpacking through ancient lanes and living in their whispers.",
  },
  {
    name: "Badminton & Chess",
    note: "For the desk-bound mastermind in me.",
  },
];

const FAV_FOODS = [
  "Evening Chaat from My Neighbourhood",
  "Everyday Ghar ka Khana",
  "Steaming Dal with Telugu Tadka and ghee",
  "Biryani for the Yay, Meh and Sigh Days",
  "Brownie for when the rain pours down",
];

export default function UIOverlay({ activeSection, setActiveSection }) {
  const [activeTech, setActiveTech] = useState(TECH_STACK[0]);
  const [activeHobby, setActiveHobby] = useState(HOBBY_SPOTS[0]);

  const heading = useMemo(() => {
    if (activeSection === "projects") return "Builds and Experiments";
    if (activeSection === "about") return "Me, Myself and I";
    if (activeSection === "blogs") return "My Poetry Nook";
    if (activeSection === "coding") return "Tech Grid";
    if (activeSection === "hobbies") return "Hobbies and Passions";
    if (activeSection === "food") return "Favorite Flavours";
    return "";
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
          <p>
            Hey there, I'm Divya Sahithi, backend developer with roots in Java
            and Spring Boot, building systems to solve problems that bother me
            or spark my curiosity.
          </p>
          <p>
            When I'm not immersed in algorithms, you'll find me writing poetry,
            painting fragments of my day onto a memory canvas, or quietly
            planning my next checkmate.
          </p>
        </>
      )}

      {activeSection === "blogs" && (
        <>
          <p>The nook for my unsaid desires, longings and musings</p>
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
          <p>Recipes that stayed with me</p>
          <div className="food-grid">
            {FAV_FOODS.map((food) => (
              <span key={food} className="food-pill">
                {food}
              </span>
            ))}
          </div>
        </>
      )}
    </aside>
  );
}
