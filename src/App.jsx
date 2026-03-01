import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Canvas } from "@react-three/fiber";
import Scene from "./components/Scene";
import UIOverlay from "./components/UIOverlay";
import CommandPalette from "./components/CommandPalette";
import { SECTION_QUICK_ACTIONS, THEMES } from "./data/portfolioContent";
import { trackEvent } from "./utils/analytics";

const SECTION_HINTS = {
  resume: "Monitor: Resume",
  blogs: "Keyboard: Blog",
  projects: "Mouse: Projects",
  about: "Computer Body: About Me",
  hobbies: "Painting: Hobbies",
  coding: "Cable: Tech Stack",
  food: "Coffee: Favorite Flavours",
};

function playUiSound(audioRef) {
  try {
    const Ctx = window.AudioContext || window.webkitAudioContext;
    if (!Ctx) return;
    if (!audioRef.current) audioRef.current = new Ctx();
    const ctx = audioRef.current;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = "triangle";
    osc.frequency.setValueAtTime(520, ctx.currentTime);
    gain.gain.setValueAtTime(0.0001, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.035, ctx.currentTime + 0.01);
    gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.12);
    osc.connect(gain).connect(ctx.destination);
    osc.start();
    osc.stop(ctx.currentTime + 0.14);
  } catch (e) {
    console.warn("Failed to play UI sound:", e);
  }
}

export default function App() {
  const [activeSection, setActiveSectionState] = useState(null);
  const [hoveredSection, setHoveredSection] = useState(null);
  const [dpr, setDpr] = useState(() => {
    if (typeof window === "undefined") return 1.25;
    return Math.min(window.devicePixelRatio || 1, 1.5);
  });
  const [theme, setTheme] = useState("studio");
  const [soundEnabled, setSoundEnabled] = useState(false);
  const [paletteOpen, setPaletteOpen] = useState(false);
  const audioRef = useRef(null);

  const handleSetActiveSection = useCallback(
    (section) => {
      setActiveSectionState(section);
      if (!section) return;
      trackEvent("section_open", { section });
      if (soundEnabled) playUiSound(audioRef);
    },
    [soundEnabled],
  );

  useEffect(() => {
    trackEvent("theme_change", { theme });
  }, [theme]);

  useEffect(() => {
    const onKeyDown = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setPaletteOpen((prev) => !prev);
      }
      if (e.key === "Escape") {
        setPaletteOpen(false);
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  const mobileActions = useMemo(
    () => SECTION_QUICK_ACTIONS.filter((item) => item.id !== "resume"),
    [],
  );

  return (
    <div
      className={`app-shell theme-${theme} ${hoveredSection === "resume" ? "monitor-hovered" : ""}`}
    >
      <Canvas
        camera={{ position: [0, 4, 11], fov: 42 }}
        dpr={dpr}
        gl={{ powerPreference: "high-performance", antialias: true }}
        onPointerMissed={() => {
          handleSetActiveSection(null);
          setHoveredSection(null);
        }}
      >
        <Scene
          activeSection={activeSection}
          hoveredSection={hoveredSection}
          setActiveSection={handleSetActiveSection}
          setHoveredSection={setHoveredSection}
          setDpr={setDpr}
          theme={theme}
        />
      </Canvas>

      <div className="app-controls">
        <button
          type="button"
          className="control-pill"
          onClick={() => setPaletteOpen(true)}
        >
          Cmd/Ctrl + K
        </button>
        <div className="theme-row">
          {THEMES.map((item) => (
            <button
              key={item.id}
              type="button"
              className={`theme-switch ${theme === item.id ? "active" : ""}`}
              onClick={() => setTheme(item.id)}
            >
              {item.label}
            </button>
          ))}
        </div>
        <button
          type="button"
          className={`control-pill ${soundEnabled ? "active" : ""}`}
          onClick={() => setSoundEnabled((prev) => !prev)}
        >
          {soundEnabled ? "Sound: On" : "Sound: Off"}
        </button>
      </div>

      {hoveredSection === "resume" && <div className="monitor-hover-glow" />}
      {hoveredSection && !activeSection && (
        <div className="section-hover-hint">
          {SECTION_HINTS[hoveredSection]}
        </div>
      )}

      <UIOverlay
        activeSection={activeSection}
        setActiveSection={handleSetActiveSection}
      />

      <nav className="mobile-nav" aria-label="Section navigation">
        {mobileActions.map((item) => (
          <button
            key={item.id}
            type="button"
            className={activeSection === item.id ? "active" : ""}
            onClick={() => handleSetActiveSection(item.id)}
          >
            {item.label}
          </button>
        ))}
      </nav>

      <CommandPalette
        open={paletteOpen}
        onClose={() => setPaletteOpen(false)}
        actions={SECTION_QUICK_ACTIONS}
        themes={THEMES}
        onSelectAction={handleSetActiveSection}
        onSelectTheme={setTheme}
      />
    </div>
  );
}
