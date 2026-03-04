import { useEffect, useMemo, useState } from "react";
import { ASSET_URLS } from "../config/assets";
import {
  ABOUT_TEXT,
  ABOUT_TIMELINE,
  BLOG_TEXT,
  FAV_FOODS,
  HOBBY_SPOTS,
  PROJECTS,
  SECTION_HEADINGS,
  TECH_STACK,
} from "../data/portfolioContent";
import { trackEvent } from "../utils/analytics";

const GITHUB_USER = "DS-1090";

function ProjectModal({ project, onClose }) {
  if (!project) return null;
  return (
    <div
      className="overlay-modal-backdrop"
      onClick={onClose}
      role="presentation"
    >
      <section
        className="overlay-modal"
        onClick={(e) => e.stopPropagation()}
        aria-label={`${project.name} details`}
      >
        <header>
          <h3>{project.name}</h3>
        </header>
        <p>{project.detail}</p>
        <ul>
          {project.highlights.map((item) => (
            <li key={`${project.name}-${item}`}>{item}</li>
          ))}
        </ul>
        <a href={project.href} target="_blank" rel="noreferrer">
          Open Repository
        </a>
      </section>
    </div>
  );
}

export default function UIOverlay({ activeSection }) {
  const hobbiesImageUrl = ASSET_URLS.paintingImageUrl;
  const [activeTech, setActiveTech] = useState(TECH_STACK[0]);
  const [activeHobby, setActiveHobby] = useState(HOBBY_SPOTS[0]);
  const [focusProject, setFocusProject] = useState(null);
  const [githubStats, setGithubStats] = useState(null);
  const [statsError, setStatsError] = useState("");

  const heading = useMemo(
    () => SECTION_HEADINGS[activeSection] || "",
    [activeSection],
  );

  useEffect(() => {
    if (activeSection !== "projects") return;
    let mounted = true;
    const loadStats = async () => {
      try {
        setStatsError("");
        const [profileRes, reposRes] = await Promise.all([
          fetch(`https://api.github.com/users/${GITHUB_USER}`),
          fetch(
            `https://api.github.com/users/${GITHUB_USER}/repos?type=owner&sort=updated&per_page=30`,
          ),
        ]);
        if (!profileRes.ok || !reposRes.ok)
          throw new Error("GitHub API unavailable");
        const profile = await profileRes.json();
        const repos = await reposRes.json();
        const authoredRepos = repos.filter(
          (repo) =>
            repo?.owner?.login?.toLowerCase() === GITHUB_USER.toLowerCase() &&
            !repo.fork,
        );
        if (!mounted) return;
        setGithubStats({
          repos: authoredRepos.length,
          followers: profile.followers,
          following: profile.following,
          latest: authoredRepos.slice(0, 4).map((repo) => repo.name),
        });
      } catch {
        if (!mounted) return;
        setStatsError("GitHub stats unavailable right now.");
      }
    };
    loadStats();
    return () => {
      mounted = false;
    };
  }, [activeSection]);

  if (!activeSection || activeSection === "resume") return null;

  return (
    <>
      <aside className={`overlay-card overlay-card--${activeSection}`}>
        <header className="overlay-header">
          <h2>{heading}</h2>
        </header>

        <div className="overlay-content">
        {activeSection === "projects" && (
          <>
            <p>Click project cards for details or jump to the repository.</p>
            <div className="project-grid">
              {PROJECTS.map((project, idx) => (
                <article
                  key={project.name}
                  className="project-card"
                  style={{ animationDelay: `${idx * 60}ms` }}
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
                  <div className="project-actions">
                    <button
                      type="button"
                      onClick={() => {
                        setFocusProject(project);
                        trackEvent("project_modal_open", {
                          project: project.name,
                        });
                      }}
                    >
                      Deep Dive
                    </button>
                    <a href={project.href} target="_blank" rel="noreferrer">
                      GitHub
                    </a>
                  </div>
                </article>
              ))}
            </div>
            <section className="github-stats">
              <h3>GitHub Snapshot</h3>
              {githubStats ? (
                <>
                  <p>
                    {githubStats.repos} repos • {githubStats.followers}{" "}
                    followers • {githubStats.following} following
                  </p>
                  <div className="stack-row">
                    {githubStats.latest.map((repo) => (
                      <span key={repo} className="stack-chip">
                        {repo}
                      </span>
                    ))}
                  </div>
                </>
              ) : (
                <p>{statsError || "Loading live stats..."}</p>
              )}
            </section>
          </>
        )}

        {activeSection === "about" && (
          <>
            <p>{ABOUT_TEXT[0]}</p>
            <p>{ABOUT_TEXT[1]}</p>
            <section className="timeline">
              {ABOUT_TIMELINE.map((item) => (
                <article
                  key={`${item.year}-${item.title}`}
                  className="timeline-item"
                >
                  <span>{item.year}</span>
                  <h3>{item.title}</h3>
                  <p>{item.note}</p>
                </article>
              ))}
            </section>
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
            <p>Languages and frameworks I work with.</p>
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
            <p>When I am not lost in bytes.</p>
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
            <p className="food-intro">Recipes that stayed with me.</p>
            <div className="food-grid">
              {FAV_FOODS.map((food) => (
                <article key={food.name} className="food-card">
                  <h3>{food.name}</h3>
                </article>
              ))}
            </div>
          </>
        )}
        </div>
      </aside>

      <ProjectModal
        project={focusProject}
        onClose={() => setFocusProject(null)}
      />
    </>
  );
}
