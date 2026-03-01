import { useState } from "react";
import { Canvas } from "@react-three/fiber";
import Scene from "./components/Scene";
import UIOverlay from "./components/UIOverlay";

const SECTION_HINTS = {
  resume: "Monitor: Resume",
  blogs: "Keyboard: Blog",
  projects: "Mouse: Projects",
  about: "Computer Body: About Me",
  hobbies: "Painting: Hobbies",
  coding: "Cable: Tech Stack",
  food: "Coffee: Favorite Flavours",
};

export default function App() {
  const [activeSection, setActiveSection] = useState(null);
  const [hoveredSection, setHoveredSection] = useState(null);
  const [dpr, setDpr] = useState(() => {
    if (typeof window === "undefined") return 1.25;
    return Math.min(window.devicePixelRatio || 1, 1.5);
  });

  return (
    <div
      className={`app-shell ${hoveredSection === "resume" ? "monitor-hovered" : ""}`}
    >
      <Canvas
        camera={{ position: [0, 4, 11], fov: 42 }}
        dpr={dpr}
        gl={{ powerPreference: "high-performance", antialias: true }}
        onPointerMissed={() => {
          setActiveSection(null);
          setHoveredSection(null);
        }}
      >
        <Scene
          activeSection={activeSection}
          hoveredSection={hoveredSection}
          setActiveSection={setActiveSection}
          setHoveredSection={setHoveredSection}
          setDpr={setDpr}
        />
      </Canvas>

      {hoveredSection === "resume" && <div className="monitor-hover-glow" />}
      {hoveredSection && !activeSection && (
        <div className="section-hover-hint">
          {SECTION_HINTS[hoveredSection]}
        </div>
      )}
      <UIOverlay
        activeSection={activeSection}
        setActiveSection={setActiveSection}
      />
    </div>
  );
}
